import "./Stats.css";

export default function Stats({
  totalImported,
  totalSkipped,
  totalRows,
}) {
  return (
    <section className="stats-section">

      <div className="stats-header">
        <h2>📊 Import Summary</h2>
        <p>Overview of the AI import process.</p>
      </div>

      <div className="stats-grid">

        <div className="stat-card total">

          <div className="stat-icon">
            📄
          </div>

          <div>
            <h3>Total Rows</h3>
            <h1>{totalRows}</h1>
          </div>

        </div>

        <div className="stat-card imported">

          <div className="stat-icon">
            ✅
          </div>

          <div>
            <h3>Imported</h3>
            <h1>{totalImported}</h1>
          </div>

        </div>

        <div className="stat-card skipped">

          <div className="stat-icon">
            ⚠️
          </div>

          <div>
            <h3>Skipped</h3>
            <h1>{totalSkipped}</h1>
          </div>

        </div>

      </div>

    </section>
  );
}