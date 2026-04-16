import React, { useState, useEffect } from 'react';
import { Activity, Clock, FilePlus, AlertTriangle, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function HistoryTimeline() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch(`${API_BASE}/history?limit=10`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (err) {
            console.error("Failed to fetch history timeline", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="data-mono" style={{ color: 'var(--accent-teal)' }}>[FETCHING_TIMELINE...]</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} /> RECENT_ACTIVITY_LOG
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                {/* Timeline vertical line */}
                <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '11px', width: '2px', background: 'var(--glass-border)', zIndex: 0 }}></div>

                {history.length === 0 ? (
                    <div className="data-mono" style={{ paddingLeft: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>NO_LOGS_FOUND</div>
                ) : (
                    history.map((record) => {
                        const isClean = record.defect_count === 0;
                        const date = new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (
                            <div key={record.id} style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1, alignItems: 'center' }}>
                                <div style={{
                                    width: '24px', height: '24px', borderRadius: '50%',
                                    background: 'var(--bg-color)', border: `2px solid ${isClean ? 'var(--success)' : 'var(--critical)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    {isClean ? <CheckCircle2 size={14} color="var(--success)" /> : <AlertTriangle size={14} color="var(--critical)" />}
                                </div>

                                <div className="glass-panel" style={{ padding: '0.8rem 1rem', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{record.filename}</span>
                                        <span className="data-mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                            [T_EXEC:{record.processing_time.toFixed(2)}s]
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            background: isClean ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: isClean ? 'var(--success)' : 'var(--critical)',
                                            padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold'
                                        }}>
                                            {isClean ? 'PASS' : `FAIL (${record.defect_count})`}
                                        </div>
                                        <span className="data-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>{date}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
