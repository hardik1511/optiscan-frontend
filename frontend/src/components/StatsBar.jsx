import React from 'react';

export default function StatsBar() {
    return (
        <footer style={{
            padding: '2rem 4rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-sans)',
            marginTop: 'auto'
        }}>
            <div>
                © 2026 OptiScan Fine Arts Condition Reports
            </div>

            <div style={{ display: 'flex', gap: '3rem', letterSpacing: '0.5px' }}>
                <span>SCANS CATALOGED: 142</span>
                <span>ISSUES LOGGED: 23</span>
                <span>SYSTEM PRECISION: 98.1%</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }}></div>
                <span>Server Connected</span>
            </div>
        </footer>
    );
}
