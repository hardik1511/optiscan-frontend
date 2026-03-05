import React, { useState } from 'react';
import DetectionUI from './components/DetectionUI';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
    const [activeTab, setActiveTab] = useState('analyzer'); // 'analyzer' or 'analytics'

    return (
        <div className="app-container">
            <header className="header">
                <h1>OptiScan: AI Defect Detection</h1>
                <div className="nav-tabs">
                    <button
                        className={`nav-btn ${activeTab === 'analyzer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analyzer')}
                    >
                        Real-Time Analyzer
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analytics')}
                    >
                        Historical Analytics
                    </button>
                </div>
            </header>

            <main className="main-content">
                {activeTab === 'analyzer' ? (
                    <DetectionUI />
                ) : (
                    <AnalyticsDashboard />
                )}
            </main>
        </div>
    );
}

export default App;
