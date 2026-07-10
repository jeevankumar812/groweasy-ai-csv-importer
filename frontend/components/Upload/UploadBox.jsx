"use client";

import { useRef, useState } from "react";
import "./UploadBox.css";

export default function UploadBox({
  file,
  setFile,
  onUpload,
  loading,
}) {
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
      } else {
        alert("Please drop a valid CSV file.");
      }
    }
  };

  return (
    <section className="upload-section">
      <div
        className={`upload-box ${isDragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          hidden
          onChange={handleChange}
        />

        <div className="upload-icon-wrapper">
          <div className="upload-icon">☁️</div>
          <div className="pulse-ring"></div>
        </div>

        <h2>Upload CSV File</h2>
        <p>
          Drag & Drop your CSV here
          <br />
          <span>or click to browse your system</span>
        </p>
      </div>

      {file && (
        <div className="selected-file-card">
          <div className="file-icon">📄</div>
          <div className="file-info">
            <h4>Ready for Import</h4>
            <p className="file-name">{file.name}</p>
            <span className="file-size">
              {(file.size / 1024).toFixed(2)} KB
            </span>
          </div>
          <div className="success-badge">✓</div>
        </div>
      )}

      <button
        className={`upload-btn ${loading ? "btn-loading" : ""}`}
        disabled={!file || loading}
        onClick={onUpload}
      >
        {loading ? (
          <span className="loader-container">
            <span className="spinner"></span>
            Processing File...
          </span>
        ) : (
          <>
            <span>Launch AI Importer</span>
            <span className="btn-arrow">→</span>
          </>
        )}
      </button>

      {/* Modern interactive scroll reminder gesture block */}
      {file && !loading && (
        <div className="scroll-gesture-hint" onClick={() => window.scrollBy({ top: 350, behavior: 'smooth' })}>
          <span className="mouse-wheel-icon">
            <span className="wheel-dot"></span>
          </span>
          <p>Scroll down to preview parsed matrix sheets</p>
        </div>
      )}
    </section>
  );
}