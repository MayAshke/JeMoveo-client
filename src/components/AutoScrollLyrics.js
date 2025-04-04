import React, { useRef, useEffect, useState } from 'react';

const AutoScrollLyrics = ({ song, role }) => {
  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);
  const direction = isHebrew(song?.[0]?.[0]?.lyrics || "") ? 'rtl' : 'ltr';

  useEffect(() => {
    const interval = setInterval(() => {
      if (isScrolling && containerRef.current) {
        containerRef.current.scrollBy({ top: 1, behavior: 'smooth' });
      }
    }, 90);

    return () => clearInterval(interval);
  }, [isScrolling]);

  return (
    <div>
      <div
        dir={direction}
        ref={containerRef}
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '2px solid #ccc',
          padding: '20px',
          marginTop: '10px',
        }}
      >
        {song.map((line, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            {line.map((word, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 'auto',
                  marginBottom: '20px',
                  position: 'relative',
                  marginLeft: '10px',
                }}
              >
                {role === 'player' && word.chords && (
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'red',
                      position: 'absolute',
                      top: '-20px',
                    }}
                  >
                    {word.chords}
                  </span>
                )}
                <span>{word.lyrics}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={() => setIsScrolling(!isScrolling)}>
        {isScrolling ? '⏸ stop scrolling' : '▶️ start scrolling'}
      </button>
    </div>
  );
};

export default AutoScrollLyrics;
