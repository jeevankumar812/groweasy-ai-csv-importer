const allowedStatus = [
    "GOOD_LEAD_FOLLOW_UP",
    "DID_NOT_CONNECT",
    "BAD_LEAD",
    "SALE_DONE",
];

const allowedSources = [
    "leads_on_demand",
    "meridian_tower",
    "eden_park",
    "varah_swamy",
    "sarjapur_plots",
];

const validateRecord = (record) => {

    if (
        (!record.email || record.email.trim() === "") &&
        (!record.mobile_without_country_code ||
            record.mobile_without_country_code.trim() === "")
    ) {
        return false;
    }

    if (!allowedStatus.includes(record.crm_status)) {
        record.crm_status = "";
    }

    if (!allowedSources.includes(record.data_source)) {
        record.data_source = "";
    }

    return true;
};

module.exports = validateRecord;