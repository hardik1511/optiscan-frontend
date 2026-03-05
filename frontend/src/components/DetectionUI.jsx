import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Crosshair, AlertOctagon } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CURES = {
    1: "General structural review recommended.",
    2: "Apply structural epoxy or crack filler.",
    3: "Use abrasive polishing or mild solvent wipe.",
    4: "Apply industrial solvent and power wash.",
    5: "Assess for structural integrity; may require panel replacement.",
    "Defect": "General structural review recommended.",
    "Crack": "Apply structural epoxy or crack filler.",
    "Scratch": "Use abrasive polishing or mild solvent wipe.",
    "Stain": "Apply industrial solvent and power wash.",
    "Dent": "Assess for structural integrity; may require panel replacement."
};

const LABEL_MAP = {
    1: "Defect", 2: "Crack", 3: "Scratch", 4: "Stain", 5: "Dent"
};

export default function DetectionUI() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confThreshold, setConfThreshold] = useState(0.5);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);

    // Handle Image Upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setResult(null);
        }
    };

    const handlePredict = async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch(`${API_BASE}/predict`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data);

            // Load image object for canvas redrawing
            const img = new Image();
            img.src = data.preview_base64;
            img.onload = () => {
                imageRef.current = img;
                drawCanvas(data.instances, null);
            };

        } catch (err) {
            console.error(err);
            alert("Error predicting image. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    // Draw interactive Canvas
    const drawCanvas = (instancesToDraw, hoverIdx) => {
        const canvas = canvasRef.current;
        if (!canvas || !imageRef.current) return;

        const ctx = canvas.getContext('2d');
        const img = imageRef.current;

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw base image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Filter instances by score threshold
        const filtered = instancesToDraw.filter(inst => inst.score >= confThreshold);

        // Highlight hovered box if exists
        if (hoverIdx !== null && filtered[hoverIdx]) {
            const inst = filtered[hoverIdx];
            const [x1, y1, x2, y2] = inst.box;

            ctx.save();
            ctx.strokeStyle = '#00ffcc';
            ctx.lineWidth = 4;
            ctx.shadowColor = '#00ffcc';
            ctx.shadowBlur = 15;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

            ctx.fillStyle = 'rgba(0, 255, 204, 0.2)';
            ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        }

        // Re-draw labels strongly over everything
        filtered.forEach((inst, idx) => {
            if (idx === hoverIdx) {
                ctx.fillStyle = '#00ffcc';
                ctx.font = 'bold 24px Arial';
                const labelName = LABEL_MAP[inst.label] || "Defect";
                ctx.fillText(`${labelName} (${inst.score.toFixed(2)})`, inst.box[0], Math.max(inst.box[1] - 10, 20));
            }
        });

        ctx.restore();
    };

    // Redraw when threshold or hover changes
    useEffect(() => {
        if (result && result.instances) {
            drawCanvas(result.instances, hoveredIndex);
        }
    }, [confThreshold, hoveredIndex, result]);

    // Handle canvas mousemove for glowing effect
    const handleCanvasMouseMove = (e) => {
        if (!result || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Scale coordinates to internal canvas array sizes
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const filtered = result.instances.filter(inst => inst.score >= confThreshold);

        let foundIdx = null;
        for (let i = 0; i < filtered.length; i++) {
            const [x1, y1, x2, y2] = filtered[i].box;
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                foundIdx = i;
                break;
            }
        }

        if (foundIdx !== hoveredIndex) {
            setHoveredIndex(foundIdx);
        }
    };

    const handleCanvasMouseLeave = () => {
        setHoveredIndex(null);
    };

    const exportCSV = () => {
        if (!result) return;
        const filtered = result.instances.filter(inst => inst.score >= confThreshold);
        let csv = "Type,Score,Box_X1,Box_Y1,Box_X2,Box_Y2\\n";
        filtered.forEach(inst => {
            const name = LABEL_MAP[inst.label] || "Defect";
            const [x1, y1, x2, y2] = inst.box;
            csv += `${name},${inst.score.toFixed(3)},${x1},${y1},${x2},${y2}\\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `defects_${result.filename}.csv`;
        a.click();
    };

    const exportPNG = () => {
        if (!canvasRef.current) return;
        const url = canvasRef.current.toDataURL("image/png");
        const a = document.createElement('a');
        a.href = url;
        a.download = `annotated_${result.filename}.png`;
        a.click();
    };

    const filteredInstances = result ? result.instances.filter(i => i.score >= confThreshold) : [];

    return (
        <div>
            <div className="controls-bar glass-panel">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                        type="file"
                        className="file-input"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <button className="btn-secondary" onClick={() => fileInputRef.current.click()}>
                        <Upload size={18} /> Select Image
                    </button>

                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        {selectedFile ? selectedFile.name : "No file selected"}
                    </span>

                    <button
                        className="btn-primary"
                        onClick={handlePredict}
                        disabled={!selectedFile || loading}
                    >
                        {loading ? <RefreshCw className="spin" size={18} /> : <Crosshair size={18} />}
                        Analyze
                    </button>
                </div>

                {result && (
                    <div className="slider-group">
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Confidence ({confThreshold.toFixed(2)}):
                        </span>
                        <input
                            type="range"
                            min="0" max="1" step="0.05"
                            value={confThreshold}
                            onChange={(e) => setConfThreshold(parseFloat(e.target.value))}
                        />
                    </div>
                )}
            </div>

            <div className="detection-layout">
                <div className="glass-panel" style={{ padding: '0.5rem', position: 'relative' }}>
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Running ML Model Inference...</p>
                        </div>
                    )}

                    <div className="canvas-container">
                        {!result && !loading && (
                            <div className="upload-placeholder">
                                <AlertOctagon size={64} />
                                <h3>Upload an image to detect defects</h3>
                            </div>
                        )}
                        {result && (
                            <canvas
                                ref={canvasRef}
                                onMouseMove={handleCanvasMouseMove}
                                onMouseLeave={handleCanvasMouseLeave}
                            />
                        )}
                    </div>

                    {result && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', padding: '0 1rem 1rem 0' }}>
                            <button className="btn-secondary" onClick={exportCSV}><Download size={16} /> CSV</button>
                            <button className="btn-secondary" onClick={exportPNG}><Download size={16} /> Canvas Image</button>
                        </div>
                    )}
                </div>

                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
                    <h3 className="title">Detected Issues ({filteredInstances.length})</h3>

                    <div className="defect-list">
                        {filteredInstances.map((inst, i) => {
                            const labelName = LABEL_MAP[inst.label] || "Defect";
                            const area = Math.abs((inst.box[2] - inst.box[0]) * (inst.box[3] - inst.box[1]));

                            return (
                                <div
                                    key={i}
                                    className={`defect-item ${hoveredIndex === i ? 'active' : ''}`}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className="defect-item-header">
                                        <span className="defect-type">{labelName}</span>
                                        <span className="defect-score">{(inst.score * 100).toFixed(1)}%</span>
                                    </div>
                                    <span className="defect-area">Area: {Math.round(area).toLocaleString()} px²</span>
                                    <div className="defect-cure">
                                        <strong>Suggested Action:</strong> {CURES[inst.label] || CURES[labelName]}
                                    </div>
                                </div>
                            );
                        })}

                        {result && filteredInstances.length === 0 && (
                            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                                <Activity size={32} style={{ margin: '0 auto 1rem', color: '#8ce196' }} />
                                <p>No defects found above {confThreshold * 100}%. Component looks clean.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
