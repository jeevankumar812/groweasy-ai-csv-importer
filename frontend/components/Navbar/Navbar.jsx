import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Left: Brand & Logo */}
        <div className="navbar-left">
          <div className="logo-icon">
            {/* Replace /logo.png with your actual logo path, or keep the emoji */}
            <img src="/images.jpeg" alt="GrowEasy Logo" className="brand-logo" />
            
          </div>
          <div className="brand-details">
            <div className="brand-meta">
              <h1>GrowEasy AI</h1>
              <span className="badge">v2.0 Importer</span>
            </div>
            <p className="brand-tagline">
              Transform raw spreadsheets into structured CRM leads.
            </p>
          </div>
        </div>

        {/* Center: Main Navigation */}
        <nav className="navbar-center">
          <a href="#dashboard" className="nav-item active">Dashboard</a>
          <a href="#history" className="nav-item">Upload History</a>
          <a href="#mappings" className="nav-item">Data Mappings</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-item">
            API Docs
          </a>
        </nav>

        {/* Right: Actions, Status & Profile */}
        <div className="navbar-right">
          <div className="status-indicator" title="All systems operational">
            <span className="pulse-dot"></span>
            <span className="status-text">System Ready</span>
          </div>

          <div className="divider"></div>

          <button className="icon-btn notification-btn" aria-label="Notifications">
            🔔
            <span className="notification-badge">3</span>
          </button>

          <button className="icon-btn settings-btn" aria-label="Settings">
            ⚙️
          </button>

          <div className="user-profile">
            <div className="avatar">
              <span>JD</span>
            </div>
            <div className="user-info">
              <span className="user-name">K Jeevan Kumar</span>
              <span className="user-role">Admin</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}