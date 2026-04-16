import React, { useState, useEffect } from 'react';
import { User, Code, Zap, Cpu, Database, Image as ImageIcon, Box, Layers, AlignCenter, Scan, Disc, RotateCw, FlipHorizontal, Sun, Droplet } from 'lucide-react';
import DetectionUI from './components/DetectionUI';
import BackgroundEffects from './components/BackgroundEffects';
import CustomCursor from './components/CustomCursor';

const AnimatedArrow = ({ delay = 0, label = "", direction = "right", width = "50px" }) => (
    <div style={{ display: 'flex', flexDirection: direction === 'right' ? 'row' : 'row-reverse', alignItems: 'center', position: 'relative', width, margin: '0 0.5rem' }}>
        {label && <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', whiteSpace: 'nowrap', opacity: 0, animation: `fadeInArrow 0.2s forwards ${delay + 0.3}s` }}>{label}</span>}
        <div style={{ height: '2px', background: 'var(--ink)', width: '100%', transformOrigin: direction === 'right' ? 'left' : 'right', animation: `growRight 1s ease forwards ${delay}s`, transform: 'scaleX(0)' }} />
        <div style={{
            borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
            [direction === 'right' ? 'borderLeft' : 'borderRight']: '8px solid var(--ink)',
            opacity: 0, animation: `fadeInArrow 0.2s forwards ${delay + 0.8}s`
        }} />
    </div>
);

function App() {
    const defectCatalog = [
        { title: "Linear Cracks", desc: "Deep structural surface fractures", img: "1_cracks.png" },
        { title: "Surface Scratches", desc: "Shallow, elongated indentations", img: "2_scratches.png" },
        { title: "Chemical Stains", desc: "Discoloration/residue from exposure", img: "3_stains.png" },
        { title: "Impact Dents", desc: "Localized blunt force depressions", img: "4_dents.png" },
        { title: "Paint Flaking", desc: "Detachment of the pigment layer", img: "5_flaking.png" },
        { title: "Fabric Tears", desc: "Physical rips in canvas/textiles", img: "6_tears.png" },
        { title: "Biological Growth", desc: "Mold/mildew from humidity", img: "7_growth.png" },
        { title: "Metallic Corrosion", desc: "Rust and oxidation on metal", img: "8_corrosion.png" },
        { title: "Material Warping", desc: "Bending of wood/metal due to environments", img: "9_warping.png" },
        { title: "Edge Chipping", desc: "Fragmented material loss at borders", img: "10_chipping.png" },
        { title: "Surface Abrasions", desc: "Widespread friction-based surface wear", img: "11_abrasions.png" },
        { title: "Micro-pitting", desc: "Tiny crater-like surface degradations", img: "12_micro-pitting.png" },
    ];

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavLink = ({ label, href = "#" }) => (
        <a href={href}
            onClick={e => {
                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }
            }}
            className="clickable" style={{
                textDecoration: 'none', color: 'var(--ink)',
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                transition: 'color 0.2s ease', opacity: 0.8
            }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.8}>
            {label}
        </a>
    );

    return (
        <div className="app-container" style={{ position: 'relative', width: '100vw', overflowX: 'hidden' }}>
            <CustomCursor />
            <BackgroundEffects />

            {/* Blurred Glass Navigation */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                padding: '1.25rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: scrolled ? 'var(--bg-elevated)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--sand)' : '1px solid transparent',
                transition: 'all 0.3s ease'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{
                        margin: 0, fontSize: '1.5rem', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase'
                    }}>
                        OPTI<span style={{ color: 'var(--accent-red)' }}>SCAN</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <NavLink label="Architecture" href="#architecture" />
                    <NavLink label="Dataset" href="#dataset" />
                    <NavLink label="Catalog" href="#catalog" />
                    <NavLink label="About Project" href="#about" />
                    <div style={{
                        background: 'var(--accent-teal)', color: '#F5F0E8',
                        padding: '0.2rem 0.8rem', borderRadius: '999px',
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        textTransform: 'uppercase', letterSpacing: '0.05em'
                    }}>
                        B.E. Project
                    </div>
                </div>
            </nav>

            {/* Split Hero Section */}
            <section style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                padding: '8rem 4rem 4rem', gap: '4rem', maxWidth: '1600px', margin: '0 auto'
            }}>
                {/* Left: Editorial Copy */}
                <div className="fade-up stagger-1" style={{ flex: 1, paddingRight: '2rem' }}>
                    <div className="eyebrow" style={{ marginBottom: '2rem' }}>B.E. Final Year Project</div>
                    <h2 className="display-type" style={{ marginBottom: '2rem' }}>
                        Automated <span style={{ fontStyle: 'italic', fontWeight: 300 }}>defective exhibit</span> identification.
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-ui)', fontSize: '1.1rem', lineHeight: 1.6,
                        color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '80%'
                    }}>
                        An AI-based system designed to streamline the condition assessment process for gallery exhibits using deep learning.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
                        <button className="btn-primary clickable" onClick={() => document.querySelector('.file-input')?.click()}>Start Scan</button>
                        <a href="/Project_Report.pdf" target="_blank" rel="noreferrer" className="btn-secondary clickable" style={{ textDecoration: 'none' }}>View Report</a>
                    </div>

                    {/* Stats Row */}
                    <div style={{
                        display: 'flex', gap: '3rem', paddingTop: '2rem',
                        borderTop: '1px solid var(--sand)'
                    }}>
                        <div>
                            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>98%</div>
                            <div className="data-mono" style={{ color: 'var(--text-muted)' }}>Accuracy</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>12</div>
                            <div className="data-mono" style={{ color: 'var(--text-muted)' }}>Defect Types</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>0.3s</div>
                            <div className="data-mono" style={{ color: 'var(--text-muted)' }}>Latency</div>
                        </div>
                    </div>
                </div>

                {/* Right: The Placeholder / Scanner */}
                <div className="fade-up stagger-2" style={{ flex: 1, position: 'relative' }}>
                    <div style={{
                        background: 'var(--bg-parchment)', padding: '2rem',
                        border: '10px solid var(--umber)',
                        boxShadow: '15px 15px 0px rgba(107, 79, 58, 0.1), inset 0 0 100px rgba(0,0,0,0.03)',
                        minHeight: '600px', height: 'auto', display: 'flex', alignItems: 'stretch', justifyContent: 'center',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        {/* Faint Grid over parchment */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
                            backgroundImage: 'linear-gradient(var(--sand) 1px, transparent 1px), linear-gradient(90deg, var(--sand) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                        <DetectionUI embedded={true} />
                    </div>
                </div>
            </section>

            {/* Marquee Strip */}
            <div style={{
                borderTop: '1px solid var(--sand)', borderBottom: '1px solid var(--sand)',
                padding: '2rem 0', overflow: 'hidden', whiteSpace: 'nowrap',
                position: 'relative', background: 'var(--bg-base)'
            }}>
                <div style={{
                    display: 'inline-block',
                    animation: 'marquee 30s linear infinite',
                    fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.1em'
                }}>
                    B.E. FINAL YEAR PROJECT &nbsp;&nbsp;✦&nbsp;&nbsp; DEPT. OF INFORMATION TECHNOLOGY &nbsp;&nbsp;✦&nbsp;&nbsp; AI-BASED IDENTIFICATION &nbsp;&nbsp;✦&nbsp;&nbsp; MASK R-CNN &nbsp;&nbsp;✦&nbsp;&nbsp; B.E. FINAL YEAR PROJECT &nbsp;&nbsp;✦&nbsp;&nbsp; DEPT. OF INFORMATION TECHNOLOGY &nbsp;&nbsp;✦&nbsp;&nbsp; AI-BASED IDENTIFICATION
                </div>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                `}} />
            </div>

            {/* Architecture Section */}
            <section id="architecture" style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="eyebrow" style={{ marginBottom: '2rem' }}>Architecture</div>
                <h2 className="section-type" style={{ marginBottom: '4rem' }}>
                    System & Deep Learning Architecture.
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    {/* Slide 1 Layout - 3 Tiers */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: '1rem' }}>

                        {/* Presentation Tier */}
                        <div style={{ flex: 1, border: '1px solid var(--ink)', borderRadius: '8px', padding: '2rem 1rem', position: 'relative', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'absolute', top: '-10px', left: '20px', background: 'var(--bg-base)', padding: '0 10px', border: '1px solid var(--ink)', fontSize: '0.7rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>PRESENTATION TIER</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', marginTop: '1rem' }}>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <User size={32} strokeWidth={1} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.7rem' }}>USER /<br />CURATOR</div>
                                </div>
                                <AnimatedArrow width="80px" delay={0.5} label="Upload Image" direction="right" />
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <Code size={32} strokeWidth={1} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.7rem' }}>REACT.JS<br />FRONTEND</div>
                                </div>
                            </div>
                        </div>

                        {/* Arrows 1 to 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '120px' }}>
                            <AnimatedArrow width="100%" delay={1.5} label="POST /predict" direction="right" />
                            <div style={{ height: '30px' }} />
                            <AnimatedArrow width="100%" delay={3.5} label="JSON Results" direction="left" />
                        </div>

                        {/* Application Tier */}
                        <div style={{ flex: 1, border: '1px solid var(--ink)', borderRadius: '8px', padding: '2rem', position: 'relative', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ position: 'absolute', top: '-10px', left: '20px', background: 'var(--bg-base)', padding: '0 10px', border: '1px solid var(--ink)', fontSize: '0.7rem' }}>APPLICATION TIER</div>
                            <div style={{ background: 'var(--ink)', color: 'var(--bg-base)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                <Zap size={32} strokeWidth={1.5} />
                            </div>
                            <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>FASTAPI<br />BACKEND</div>
                        </div>

                        {/* Arrows 2 to 3 */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px' }}>
                            <AnimatedArrow width="100%" delay={2.0} direction="right" />
                            <div style={{ height: '30px' }} />
                            <AnimatedArrow width="100%" delay={3.0} direction="left" />
                        </div>

                        {/* Model Tier */}
                        <div style={{ flex: 1, border: '1px solid var(--ink)', borderRadius: '8px', padding: '2rem 1rem', position: 'relative', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'absolute', top: '-10px', left: '20px', background: 'var(--bg-base)', padding: '0 10px', border: '1px solid var(--ink)', fontSize: '0.7rem' }}>MODEL TIER</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', marginTop: '1rem' }}>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <Cpu size={32} strokeWidth={1} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.7rem' }}>MASK R-CNN<br />MODEL</div>
                                </div>
                                <AnimatedArrow width="50px" delay={2.5} direction="right" />
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <Database size={32} strokeWidth={1} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.7rem' }}>MODEL<br />WEIGHTS</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 Layout */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflowX: 'auto', paddingTop: '1rem', paddingBottom: '1rem' }}>
                        {/* Stage 1 */}
                        <div style={{ border: '1px solid var(--accent-teal)', borderRadius: '8px', padding: '2rem', position: 'relative', background: 'var(--bg-base)' }}>
                            <div style={{ position: 'absolute', top: '-1px', left: '20px', background: 'var(--bg-base)', padding: '0 10px', border: '1px solid var(--accent-teal)', fontSize: '0.7rem', color: 'var(--accent-teal)' }}>STAGE 1: FEATURE EXTRACTION AND REGION PROPOSALS</div>

                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                                <div style={{ background: '#b4dced', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '4px', textAlign: 'center', minWidth: '120px' }}>
                                    <ImageIcon size={20} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.8rem' }}>Input Image</div>
                                </div>
                                <AnimatedArrow width="100px" delay={4.0} label="Raw pixels" />

                                <div style={{ background: '#0a7a7a', color: 'white', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '4px', textAlign: 'center', minWidth: '120px' }}>
                                    <Layers size={20} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.8rem' }}>ResNet<br />Backbone</div>
                                </div>
                                <AnimatedArrow width="120px" delay={4.5} label="Multi scale feature maps" />

                                <div style={{ background: '#0a7a7a', color: 'white', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '4px', textAlign: 'center', minWidth: '130px' }}>
                                    <Scan size={20} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.8rem' }}>Feature Pyramid<br />Network</div>
                                </div>
                                <AnimatedArrow width="120px" delay={5.0} label="Fuses scales P2 to P6" />

                                <div style={{ background: '#c1d4ff', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '4px', textAlign: 'center', minWidth: '130px' }}>
                                    <Box size={20} style={{ marginBottom: '0.5rem' }} />
                                    <div style={{ fontSize: '0.8rem' }}>Region Proposal<br />Network</div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow between stages */}
                        <div style={{ paddingLeft: '4rem', display: 'flex', alignItems: 'center' }}>
                            <div style={{ borderLeft: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)', width: '20px', height: '30px', transform: 'translateY(-15px) scaleX(0)', transformOrigin: 'top left', animation: 'growRight 0.5s forwards 5.5s' }} />
                            <span style={{ fontSize: '0.7rem', margin: '0 1rem', whiteSpace: 'nowrap', opacity: 0, animation: `fadeInArrow 0.2s forwards 5.8s` }}>Approximately<br />2000 region proposals</span>
                            <AnimatedArrow direction="right" width="60px" delay={6.0} />
                        </div>

                        {/* Stage 2 */}
                        <div style={{ border: '1px solid #4a7cf6', borderRadius: '8px', padding: '2rem', position: 'relative', background: 'var(--bg-base)', display: 'flex', alignItems: 'center' }}>
                            <div style={{ position: 'absolute', top: '-1px', left: '20px', background: 'var(--bg-base)', padding: '0 10px', border: '1px solid #4a7cf6', fontSize: '0.7rem', color: '#4a7cf6' }}>STAGE 2: CLASSIFICATION; BOX REGRESSION AND MASK PREDICTION</div>

                            <div style={{ background: '#c1d4ff', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '4px', textAlign: 'center', minWidth: '120px', marginTop: '1rem', zIndex: 2 }}>
                                <AlignCenter size={20} style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontSize: '0.8rem' }}>RoIAlign</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: '1rem' }}>
                                {/* Top Path */}
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                                    <AnimatedArrow width="100px" delay={6.5} label="Bilinear init." />
                                    <div style={{ background: '#b2f2b2', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '4px', textAlign: 'center', minWidth: '120px' }}>
                                        <Box size={20} style={{ marginBottom: '0.5rem' }} />
                                        <div style={{ fontSize: '0.8rem' }}>Detection Head</div>
                                    </div>
                                    <AnimatedArrow width="150px" delay={7.0} label="Class, BBox, Score" />
                                    <div style={{ background: '#b2f2b2', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '30px', textAlign: 'center', minWidth: '160px' }}>
                                        <div style={{ fontSize: '0.8rem' }}>Bounding Box,<br />Label and Score</div>
                                    </div>
                                </div>
                                {/* Bottom Path */}
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '50px' }}>
                                    <AnimatedArrow width="180px" delay={6.8} label="Bilinear interpolation" />
                                    <div style={{ background: '#f6d5b0', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '4px', textAlign: 'center', minWidth: '120px' }}>
                                        <Disc size={20} style={{ marginBottom: '0.5rem' }} />
                                        <div style={{ fontSize: '0.8rem' }}>Mask Head</div>
                                    </div>
                                    <AnimatedArrow width="100px" delay={7.3} label="28x28 mask" />
                                    <div style={{ background: '#f6d5b0', border: '1px solid var(--ink)', padding: '1rem', borderRadius: '30px', textAlign: 'center', minWidth: '160px' }}>
                                        <div style={{ fontSize: '0.8rem' }}>Pixel Level<br />Binary Mask</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dataset Section (Redesigned) */}
            <section id="dataset" style={{ padding: '8rem 0', background: 'var(--ink)', color: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
                {/* Header Content */}
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: '2rem', color: 'var(--sand)' }}>Dataset Engineering</div>
                        <h2 className="section-type" style={{ color: 'var(--bg-base)', maxWidth: '600px' }}>
                            Fine-Tuning Specimen Data.
                        </h2>
                    </div>
                    <div style={{ textAlign: 'right', borderRight: '3px solid var(--accent-red)', paddingRight: '1.5rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6, marginBottom: '0.5rem', color: 'var(--sand)' }}>Target Source Entity</div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>The Heritage Museum Gallery</div>
                    </div>
                </div>

                {/* Marquee Image Gallery */}
                <div style={{ position: 'relative', padding: '2rem 0', marginBottom: '6rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap', animation: 'marqueeImages 40s linear infinite' }}>
                        {[
                            "100549316.jpg", "101455688.jpg", "103158569.jpg", "104394531.jpg",
                            "105108642.jpg", "105575561.jpg", "105630493.jpg", "106509399.jpg",
                            "106756591.jpg", "108843994.jpg", "109503173.jpg", "110025024.jpg",
                            "100549316.jpg", "101455688.jpg", "103158569.jpg", "104394531.jpg"
                        ].map((imgName, idx) => (
                            <div key={idx} style={{
                                display: 'inline-block', width: '350px', height: '240px', borderRadius: '4px', overflow: 'hidden',
                                border: '1px solid rgba(245, 240, 232, 0.2)', position: 'relative', flexShrink: 0
                            }}>
                                <img src={`/gallery/${imgName}`} alt={`Gallery Sample ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'all 0.3s ease', filter: 'grayscale(0.3)' }} onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.transform = 'scale(1.05)' }} onMouseOut={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.filter = 'grayscale(0.3)'; e.currentTarget.style.transform = 'scale(1)' }} />
                            </div>
                        ))}
                    </div>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes marqueeImages { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                    `}} />
                </div>

                {/* Grid of Augmentations & Challenges */}
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem' }}>

                    {/* Challenge Block */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>The Challenge</h3>
                        <p style={{ fontSize: '1rem', color: 'var(--sand)', lineHeight: 1.6, opacity: 0.8 }}>
                            Ground-truth labelling is extensively time-intensive. High-quality defect examples in pristine heritage environments are notoriously scarce, presenting a severe risk of model overfitting without sufficient image variety.
                        </p>
                        <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-red)', marginBottom: '1rem' }}>RESOLUTION</div>
                            <span style={{ fontSize: '1.1rem', color: 'var(--bg-base)', lineHeight: 1.5, display: 'block' }}>Augmented dataset synthesized to ~5× original size, significantly mitigating validation overfitting.</span>
                        </div>
                    </div>

                    {/* Interactive Augmentation Strategy Grid */}
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>Augmentation Pipeline</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {[
                                { icon: <RotateCw size={24} color="var(--accent-teal)" />, title: 'Random Rotation', desc: '±15° adjustments directly mimic tilted cameras and arbitrary mounting angles found in physical spaces.' },
                                { icon: <FlipHorizontal size={24} color="#7c3aed" />, title: 'Horizontal Flipping', desc: 'Symmetric dataset doubling to robustly simulate mirrored defect orientations geometry.' },
                                { icon: <Sun size={24} color="var(--warning)" />, title: 'Brightness Jitter', desc: 'Variadic contrast mapping models drastically shifting gallery or factory natural lighting conditions.' },
                                { icon: <Droplet size={24} color="#4a7cf6" />, title: 'Gaussian Blur', desc: 'σ=0.5–1.5 randomized sweeps ensure resilience against varying focal lengths and poor ambient optics.' },
                            ].map((aug, i) => (
                                <div key={i} className="clickable" style={{
                                    background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.3s ease'
                                }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                                    <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {aug.icon}
                                    </div>
                                    <div style={{ fontWeight: 400, fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.8rem' }}>{aug.title}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--sand)', opacity: 0.7, lineHeight: 1.5 }}>{aug.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Catalog Section */}
            <section id="catalog" style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid var(--sand)' }}>
                <div className="eyebrow" style={{ marginBottom: '2rem' }}>Catalog</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                    <h2 className="section-type">
                        The 12 Defect Classes.
                    </h2>
                    <div style={{ textAlign: 'right', maxWidth: '400px', color: 'var(--text-muted)' }}>
                        Comprehensive collection of structural, environmental, and mechanical anomalies identified within the dataset framework.
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                    {defectCatalog.map((defect, i) => (
                        <div key={i} className="clickable" style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', border: '1px solid var(--sand)', padding: '0.75rem', borderRadius: '4px', transition: 'all 0.3s ease' }}
                            onMouseOver={e => e.currentTarget.style.borderColor = 'var(--ink)'}
                            onMouseOut={e => e.currentTarget.style.borderColor = 'var(--sand)'}>
                            <img src={`/catalog/${defect.img}`} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '2px', filter: 'grayscale(0.1)' }} />
                            <div style={{ padding: '1.5rem 1rem 1rem' }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-red)', marginBottom: '0.5rem' }}>CLASS {String(i + 1).padStart(2, '0')}</div>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{defect.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{defect.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Project Motivation Band */}
            <section id="about" style={{ background: 'var(--umber)', color: 'var(--bg-base)', padding: '6rem 4rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '2rem', color: 'var(--sand)' }}>Project Motivation</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, lineHeight: 1.5 }}>
                        Manual inspection of exhibits in galleries is a labor-intensive and subjective process prone to human error. This system automates defect identification using deep learning, ensuring consistent, objective, and rapid assessment of artifact conditions.
                    </h2>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: 'var(--ink)', color: 'var(--sand)', padding: '6rem 4rem 3rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
                    <div>
                        <h1 style={{ color: 'var(--bg-base)', margin: '0 0 1rem 0', fontSize: '1.5rem', letterSpacing: '0.1em' }}>
                            OPTI<span style={{ color: 'var(--accent-red)' }}>SCAN</span>
                        </h1>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.6, maxWidth: '250px' }}>
                            B.E. Final Year Project: AI-Based Automated Defective Exhibit Identification System
                        </p>
                    </div>
                    {[
                        { title: 'Project Team', links: ['Hardik Jain', 'Chirag Jain', 'Jheel Jain'] },
                        { title: 'Mentorship', links: ['Guide: Mrs. Mary Margarat', 'Information Technology Dept.'] },
                        { title: 'Resources', links: ['Documentation', 'Research Paper', 'GitHub Repository'] }
                    ].map((col, i) => (
                        <div key={i}>
                            <h4 style={{ color: 'var(--bg-base)', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{col.title.toUpperCase()}</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {col.links.map(link => (
                                    <li key={link}>
                                        <div style={{ color: 'var(--sand)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.7 }}>
                                            {link}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div style={{ maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid rgba(217, 203, 191, 0.2)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.5 }}>
                    <div>&copy; 2026 B.E. Final Year Project. Dept of IT.</div>
                    <div>STATUS: DEVELOPMENT INTERFACE</div>
                </div>
            </footer>
        </div>
    );
}

export default App;
