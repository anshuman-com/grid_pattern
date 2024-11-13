import React, { useState, useEffect } from 'react';

// Define letter patterns with smaller grid for reduced text size
const letterPatterns = {
    G: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0],
        [1, 0, 0, 1, 1],
        [0, 1, 1, 1, 0],
    ],
    A: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
    ],
    M: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
    ],
    E: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
    ],
};

const PixelatedTextGrid = () => {
    const rows = 20; // Reduced rows for smaller grid
    const cols = 30; // Reduced columns for smaller grid
    const [grid, setGrid] = useState(Array.from({ length: rows }, () => Array(cols).fill(0)));
    const text = 'GAME';
    const [position, setPosition] = useState(0); // Track horizontal position of the text
    const [textColor, setTextColor] = useState('red'); // Track text color
    const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta'];

    useEffect(() => {
        const updateGrid = () => {
            const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
            let colOffset = position;

            text.split('').forEach((char) => {
                const pattern = letterPatterns[char];
                if (pattern) {
                    for (let r = 0; r < pattern.length; r++) {
                        for (let c = 0; c < pattern[r].length; c++) {
                            const row = r + 5; // Adjusted to fit the smaller grid
                            const col = (c + colOffset + cols) % cols;
                            if (row < rows && pattern[r][c] === 1) {
                                newGrid[row][col] = 1;
                            }
                        }
                    }
                    colOffset += pattern[0].length + 2; // Added more space between letters
                }
            });

            setGrid(newGrid);
        };

        updateGrid(); // Initial grid rendering

        const interval = setInterval(() => {
            setPosition((prev) => (prev + 1) % cols); // Slower text movement (reduced speed)
        }, 500); // Speed of text movement (increased interval to 500ms)

        return () => clearInterval(interval);
    }, [cols, rows, text, position]);

    useEffect(() => {
        // Change text color every 2 seconds
        const colorInterval = setInterval(() => {
            setTextColor(colors[Math.floor(Math.random() * colors.length)]);
        }, 2000);

        return () => clearInterval(colorInterval);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"> {/* Page background */}
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 20px)`, // Reduced cell size
                    gridTemplateRows: `repeat(${rows}, 20px)`, // Reduced cell size
                    backgroundColor: 'black', // Black background for the grid
                    borderRadius: '10px', // Optional: round the edges of the grid
                }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                width: '20px', // Smaller cell size
                                height: '20px', // Smaller cell size
                                backgroundColor: cell ? textColor : 'transparent',
                                border: '1px solid #111',
                                boxShadow: cell ? '0 0 5px 2px rgba(255, 0, 0, 0.5)' : 'none',
                                transition: 'background-color 0.3s, box-shadow 0.3s',
                            }}
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PixelatedTextGrid;
