const mongoose = require("mongoose");

const importSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },

        totalRows: {
            type: Number,
            default: 0,
        },

        totalImported: {
            type: Number,
            default: 0,
        },

        totalSkipped: {
            type: Number,
            default: 0,
        },

        importedLeads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lead",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Import", importSchema);