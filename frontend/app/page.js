"use client";

import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import UploadBox from "../components/Upload/UploadBox";
import PreviewTable from "../components/Preview/PreviewTable";
import ResultTable from "../components/Result/ResultTable";
import Loader from "../components/Loader/Loader";
import Stats from "../components/Stats/Stats";

import api from "../services/api";
import { API } from "../utils/constants";
import './page.css';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [rows, setRows] = useState([]);
  const [records, setRecords] = useState([]);
  const [isImported, setIsImported] = useState(false);
  const [stats, setStats] = useState({
    totalRows: 0,
    totalImported: 0,
    totalSkipped: 0,
  });
  const [loading, setLoading] = useState(false);

  // Phase 1: Upload local file to backend to receive structured previews
  const uploadCSV = async () => {
    try {
      if (!file) {
        alert("Please select a CSV file.");
        return;
      }

      setLoading(true);
      setIsImported(false); 
      setRecords([]);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(API.upload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPreview(response.data.preview);
      setRows(response.data.rows);
      setStats({
        totalRows: response.data.totalRows,
        totalImported: 0,
        totalSkipped: 0,
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to upload CSV.");
    } finally {
      setLoading(false);
    }
  };

  // Phase 2: Confirm and fire off the pipeline to process using Gemini
  const confirmImport = async () => {
    try {
      if (!rows.length) {
        alert("Please upload a CSV first.");
        return;
      }

      setLoading(true);

      const response = await api.post(API.import, {
        fileName: file?.name || "sample.csv",
        rows,
      });

      setRecords(response.data.imported);
      setStats({
        totalRows: rows.length,
        totalImported: response.data.totalImported,
        totalSkipped: response.data.totalSkipped,
      });
      setIsImported(true); 
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Import failed.");
    } finally {
      setLoading(false);
    }
  };

  // Clear states to start a fresh processing stream
  const handleReset = () => {
    setFile(null);
    setPreview([]);
    setRows([]);
    setRecords([]);
    setIsImported(false);
    setStats({ totalRows: 0, totalImported: 0, totalSkipped: 0 });
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        {/* State A: File Upload and Verification Pipeline */}
        {!isImported && (
          <>
            <div className="view-header">
              <h2>AI Lead Import Engine</h2>
              <p>Upload a standard data matrix spreadsheet to parse entities using structured LLM schemas.</p>
            </div>

            <UploadBox
              file={file}
              setFile={setFile}
              onUpload={uploadCSV}
              loading={loading}
            />

            <PreviewTable preview={preview} />

            {preview.length > 0 && !loading && (
              <div className="confirm-section">
                <button
                  className="confirm-btn"
                  onClick={confirmImport}
                  disabled={loading}
                >
                  Confirm & Initialize AI Processing
                </button>
              </div>
            )}
          </>
        )}

        {/* State B: Automated AI Analysis Output View */}
        {isImported && (
          <div className="results-container">
            <div className="results-header">
              <div>
                <h2>Import Pipeline Completed</h2>
                <p>AI agent has processed structural mapping matrices successfully.</p>
              </div>
              <button className="reset-btn" onClick={handleReset}>
                ← Upload Another File
              </button>
            </div>

            <Stats
              totalRows={stats.totalRows}
              totalImported={stats.totalImported}
              totalSkipped={stats.totalSkipped}
            />

            <div className="results-card">
              <div className="card-title">
                <h3>Structured CRM Lead Output</h3>
              </div>
              <ResultTable records={records} />
            </div>
          </div>
        )}
      </main>

      {/* Full screen backdrop blur loading protection layer */}
      {loading && (
        <div className="global-loader-overlay">
          <Loader />
        </div>
      )}
    </div>
  );
}