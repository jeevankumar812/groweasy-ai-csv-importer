import "./ResultTable.css";

export default function ResultTable({ records }) {
  if (!records || records.length === 0) return null;

  const columns = [
    "created_at",
    "name",
    "email",
    "country_code",
    "mobile_without_country_code",
    "company",
    "city",
    "state",
    "country",
    "lead_owner",
    "crm_status",
    "crm_note",
    "data_source",
    "possession_time",
    "description",
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "GOOD_LEAD_FOLLOW_UP":
        return "status-good";
      case "DID_NOT_CONNECT":
        return "status-warning";
      case "BAD_LEAD":
        return "status-bad";
      case "SALE_DONE":
        return "status-success";
      default:
        return "status-default";
    }
  };

  const formatHeader = (text) => {
    return text.replaceAll("_", " ").toUpperCase();
  };

  return (
    <section className="result-section">
      <div className="result-header">
        <div className="header-meta">
          <div className="result-icon">🤖</div>
          <div>
            <h2>AI Extracted CRM Records</h2>
            <p>Successfully processed and structural-mapped CRM lead entity streams.</p>
          </div>
        </div>
        <span className="result-count">
          <span className="count-pulse"></span>
          {records.length} Imported
        </span>
      </div>

      <div className="result-table-card">
        <div className="result-table-wrapper">
          <table className="result-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>
                    <span className="th-text">{formatHeader(column)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  {columns.map((column) => {
                    const value = record[column];
                    const isEmpty = value === undefined || value === null || String(value).trim() === "";

                    if (column === "crm_status") {
                      return (
                        <td key={column}>
                          <span className={`status-badge ${getStatusClass(value)}`}>
                            {isEmpty ? "UNASSIGNED" : String(value).replaceAll("_", " ")}
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td key={column} title={!isEmpty ? String(value) : "No data available"}>
                        {isEmpty ? (
                          <span className="cell-placeholder">-</span>
                        ) : (
                          String(value)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}