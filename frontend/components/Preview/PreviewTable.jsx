import "./PreviewTable.css";

export default function PreviewTable({ preview }) {
  if (!preview || preview.length === 0) return null;

  const columns = Object.keys(preview[0]);

  return (
    <section className="preview-section">
      <div className="preview-header">
        <div className="header-meta">
          <div className="preview-icon">📋</div>
          <div>
            <h2>CSV Data Preview</h2>
            <p>Review and verify parsed columns before triggering AI automation pipelines.</p>
          </div>
        </div>
        <span className="preview-badge">
          <span className="badge-dot"></span>
          Showing top {preview.length} rows
        </span>
      </div>

      <div className="table-outer-card">
        <div className="table-wrapper">
          <table className="preview-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>
                    <div className="th-content">
                      {column}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column];
                    const isEmpty = value === undefined || value === null || String(value).trim() === "";
                    
                    return (
                      <td key={column} title={!isEmpty ? String(value) : "Empty field"}>
                        {isEmpty ? (
                          <span className="empty-cell-tag">null</span>
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