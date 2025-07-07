import React, { useEffect } from 'react';

export const StyleList = () => {
    useEffect(() => {
        // Add the keyframe animation to the document
        const style = document.createElement('style');
        style.textContent = `
            @keyframes moveDot {
                0%, 100% {
                    top: 10%;
                    right: 10%;
                }
                25% {
                    top: 10%;
                    right: calc(100% - 35px);
                }
                50% {
                    top: calc(100% - 30px);
                    right: calc(100% - 35px);
                }
                75% {
                    top: calc(100% - 30px);
                    right: 10%;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
            <div
                style={{
                    width: '300px',
                    height: '250px',
                    borderRadius: '10px',
                    padding: '1px',
                    background: 'radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d)',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        width: '5px',
                        aspectRatio: '1',
                        position: 'absolute',
                        backgroundColor: '#fff',
                        boxShadow: '0 0 10px #ffffff',
                        borderRadius: '100px',
                        zIndex: 2,
                        right: '10%',
                        top: '10%',
                        animation: 'moveDot 6s linear infinite'
                    }}
                />
                <div
                    style={{
                        zIndex: 1,
                        width: '100%',
                        height: '100%',
                        borderRadius: '9px',
                        border: 'solid 1px #202222',
                        backgroundSize: '20px 20px',
                        background: 'radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        flexDirection: 'column',
                        color: '#fff'
                    }}
                >
                    <div
                        style={{
                            width: '220px',
                            height: '45px',
                            borderRadius: '100px',
                            position: 'absolute',
                            backgroundColor: '#c7c7c7',
                            opacity: 0.4,
                            boxShadow: '0 0 50px #fff',
                            filter: 'blur(10px)',
                            transformOrigin: '10%',
                            top: '0%',
                            left: 0,
                            transform: 'rotate(40deg)'
                        }}
                    />
                    <div
                        style={{
                            fontWeight: 'bolder',
                            fontSize: '4rem',
                            background: 'linear-gradient(45deg, #000000 4%, #fff, #000)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent'
                        }}
                    >
                        750k
                    </div>
                    <div>Views</div>
                    <div
                        style={{
                            width: '100%',
                            height: '1px',
                            position: 'absolute',
                            top: '10%',
                            background: 'linear-gradient(90deg, #888888 30%, #1d1f1f 70%)'
                        }}
                    />
                    <div
                        style={{
                            left: '10%',
                            width: '1px',
                            height: '100%',
                            position: 'absolute',
                            background: 'linear-gradient(180deg, #747474 30%, #222424 70%)'
                        }}
                    />
                    <div
                        style={{
                            width: '100%',
                            height: '1px',
                            position: 'absolute',
                            backgroundColor: '#2c2c2c',
                            bottom: '10%'
                        }}
                    />
                    <div
                        style={{
                            right: '10%',
                            width: '1px',
                            height: '100%',
                            position: 'absolute',
                            backgroundColor: '#2c2c2c'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
