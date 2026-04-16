import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const isClickable = e.target.closest('a, button, input[type="file"], .defect-item, .clickable');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: isHovering ? '40px' : '20px',
                height: isHovering ? '40px' : '20px',
                border: '1.5px solid var(--accent-red)',
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: `translate(${position.x - (isHovering ? 20 : 10)}px, ${position.y - (isHovering ? 20 : 10)}px)`,
                transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out',
                zIndex: 99999,
                mixBlendMode: 'multiply',
                backgroundColor: isHovering ? 'rgba(192, 57, 43, 0.1)' : 'transparent',
            }}
        />
    );
};

export default CustomCursor;
