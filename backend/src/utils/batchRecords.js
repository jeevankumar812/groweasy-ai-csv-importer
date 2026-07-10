const batchRecords = (records, batchSize = 50) => {

    const batches = [];

    for (let i = 0; i < records.length; i += batchSize) {
        batches.push(records.slice(i, i + batchSize));
    }

    return batches;
};

module.exports = batchRecords;