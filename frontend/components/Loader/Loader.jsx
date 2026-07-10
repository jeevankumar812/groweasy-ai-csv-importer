import "./Loader.css";

export default function Loader() {
  return (
    <section className="loader-section">

      <div className="loader-card">

        <div className="loader-spinner"></div>

        <h2>🤖 AI is Processing Your CSV</h2>

        <p>
          Please wait while our AI analyzes your CSV,
          extracts CRM fields, validates records,
          and prepares the final import.
        </p>

        <div className="loader-steps">

          <div className="loader-step">
            <span>📄</span>
            <p>Reading CSV</p>
          </div>

          <div className="loader-step">
            <span>🧠</span>
            <p>Analyzing Data</p>
          </div>

          <div className="loader-step">
            <span>⚡</span>
            <p>Generating CRM Records</p>
          </div>

          <div className="loader-step">
            <span>✅</span>
            <p>Saving to Database</p>
          </div>

        </div>

      </div>

    </section>
  );
}