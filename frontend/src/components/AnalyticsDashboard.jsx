import React, { useState, useEffect } from 'react';
import { Activity, Archive, Clock, AlertTriangle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AnalyticsDashboard() {
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsRes, historyRes] = await Promise.all([
                    fetch(`${API_BASE}/analytics`),
                    fetch(`${API_BASE}/history?limit=10`)
                ]);

                const statsData = await statsRes.json();
                const historyData = await historyRes.json();

                setStats(statsData);
                setHistory(historyData);
            } catch (err) {
                console.error("Error fetching analytics:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="glass-panel" style={{ minHeight: '60vh', position: 'relative' }}>
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Loading Analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="analytics-container">
            <h2 className="title">System Performance Overview</h2>

            <div className="analytics-grid">
                <div className="glass-panel metric-card">
                    <Archive className="icon" size={24} />
                    <span className="metric-title">Total Processed</span>
                    <span className="metric-value">{stats?.total_processed_images || 0}</span>
                </div>

                <div className="glass-panel metric-card purple">
                    <AlertTriangle className="icon" size={24} />
                    <span className="metric-title">Total Defects Found</span>
                    <span className="metric-value">{stats?.total_defects_found || 0}</span>
                </div>

                <div className="glass-panel metric-card green">
                    <Clock className="icon" size={24} />
                    <span className="metric-title">Avg Processing Time</span>
                    <span className="metric-value">{(stats?.average_processing_time_sec || 0).toFixed(2)}s</span>
                </div>

                <div className="glass-panel metric-card">
                    <Activity className="icon" size={24} />
                    <span className="metric-title">Avg Defects / Image</span>
                    <span className="metric-value">{(stats?.average_defects_per_image || 0).toFixed(1)}</span>
                </div>
            </div>

            <div className="glass-panel">
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Recent Execution History</h3>
                {history.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Filename</th>
                                    <th>Defects Found</th>
                                    <th>Processing Time</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((record) => (
                                    <tr key={record.id}>
                                        <td>{record.filename}</td>
                                        <td>{record.defect_count}</td>
                                        <td>{record.processing_time.toFixed(2)}s</td>
                                        <td>{new Date(record.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No historical records found yet. Run some detections to see them here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
