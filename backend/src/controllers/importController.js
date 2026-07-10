const fs = require("fs");

const groq = require("../config/groq");

const parseCSV = require("../utils/csvParser");
const batchRecords = require("../utils/batchRecords");
const validateRecord = require("../utils/validator");

const prompt = require("../prompts/crmPrompt");

const Lead = require("../models/Lead");
const Import = require("../models/Import");

// =======================
// Upload CSV
// =======================

const uploadCSV = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "CSV file is required",
            });
        }

        const rows = await parseCSV(req.file.path);

        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(200).json({
            success: true,
            totalRows: rows.length,
            preview: rows.slice(0, 10),
            rows,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =======================
// Import CSV
// =======================

const importCSV = async (req, res) => {

    try {

        const { rows, fileName } = req.body;

        if (!rows || rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Rows are required",
            });
        }

        const batches = batchRecords(rows, 30);

        const imported = [];
        const skipped = [];

        for (const batch of batches) {

            const completion = await groq.chat.completions.create({

                model: "llama-3.3-70b-versatile",

                temperature: 0,

                response_format: {
                    type: "json_object",
                },

                messages: [
                    {
                        role: "system",
                        content: prompt,
                    },
                    {
                        role: "user",
                        content: `
Extract CRM records from the following CSV rows.

Return ONLY valid JSON.

CSV Records:

${JSON.stringify(batch)}
                        `,
                    },
                ],
            });

            const response =
                completion.choices[0].message.content;

            let aiData;

            try {

                aiData = JSON.parse(response);

            } catch (error) {

                console.error("Groq Response:");
                console.log(response);

                throw new Error("Groq returned invalid JSON.");

            }

            if (Array.isArray(aiData.records)) {

                for (const record of aiData.records) {

                    if (validateRecord(record)) {
                        imported.push(record);
                    } else {
                        skipped.push(record);
                    }

                }

            }

            if (Array.isArray(aiData.skipped)) {
                skipped.push(...aiData.skipped);
            }

        }

        const savedLeads = await Lead.insertMany(imported);

        await Import.create({

            fileName: fileName || "Unknown.csv",

            totalRows: rows.length,

            totalImported: savedLeads.length,

            totalSkipped: skipped.length,

            importedLeads: savedLeads.map(
                (lead) => lead._id
            ),

        });

        return res.status(200).json({

            success: true,

            totalImported: savedLeads.length,

            totalSkipped: skipped.length,

            imported: savedLeads,

            skipped,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {
    uploadCSV,
    importCSV,
};