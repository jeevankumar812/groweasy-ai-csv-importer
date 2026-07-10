const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        created_at: {
            type: Date,
        },

        name: {
            type: String,
            default: "",
        },

        email: {
            type: String,
            default: "",
        },

        country_code: {
            type: String,
            default: "",
        },

        mobile_without_country_code: {
            type: String,
            default: "",
        },

        company: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        state: {
            type: String,
            default: "",
        },

        country: {
            type: String,
            default: "",
        },

        lead_owner: {
            type: String,
            default: "",
        },

        crm_status: {
            type: String,
            enum: [
                "",
                "GOOD_LEAD_FOLLOW_UP",
                "DID_NOT_CONNECT",
                "BAD_LEAD",
                "SALE_DONE",
            ],
            default: "",
        },

        crm_note: {
            type: String,
            default: "",
        },

        data_source: {
            type: String,
            enum: [
                "",
                "leads_on_demand",
                "meridian_tower",
                "eden_park",
                "varah_swamy",
                "sarjapur_plots",
            ],
            default: "",
        },

        possession_time: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lead", leadSchema);