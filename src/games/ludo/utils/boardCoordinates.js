export function generatePerimeterPath() {
  const path = [];
  
  // Start near Red Base, move right towards center
  for(let x=1; x<=5; x++) path.push({x, y:6});
  // Move up towards Green Base
  for(let y=5; y>=0; y--) path.push({x:6, y});
  // Across the top
  path.push({x:7, y:0});
  // Down from top (Green Start)
  for(let y=0; y<=5; y++) path.push({x:8, y});
  // Right towards edge
  for(let x=9; x<=14; x++) path.push({x, y:6});
  // Down the right edge
  path.push({x:14, y:7});
  // Left from right edge (Yellow Start)
  for(let x=14; x>=9; x--) path.push({x, y:8});
  // Down towards bottom
  for(let y=9; y<=14; y++) path.push({x:8, y});
  // Across the bottom
  path.push({x:7, y:14});
  // Up from bottom (Blue Start)
  for(let y=14; y>=9; y--) path.push({x:6, y});
  // Left towards left edge
  for(let x=5; x>=0; x--) path.push({x, y:8});
  // Up the left edge to complete loop
  path.push({x:0, y:7});
  path.push({x:0, y:6}); // Index 51 is {0,6}
  // Wait, Red start is index 0: {1,6}. So index 51 is {0,6}. This gives exactly 52 cells.

  return path;
}

export function generateHomeStretch() {
  return {
    0: [ {x:1, y:7}, {x:2, y:7}, {x:3, y:7}, {x:4, y:7}, {x:5, y:7} ], // Red
    1: [ {x:7, y:1}, {x:7, y:2}, {x:7, y:3}, {x:7, y:4}, {x:7, y:5} ], // Green
    2: [ {x:13, y:7}, {x:12, y:7}, {x:11, y:7}, {x:10, y:7}, {x:9, y:7} ], // Yellow
    3: [ {x:7, y:13}, {x:7, y:12}, {x:7, y:11}, {x:7, y:10}, {x:7, y:9} ], // Blue
  };
}

export function generateBasePositions() {
  return {
    0: [ {x:2, y:2}, {x:3, y:2}, {x:2, y:3}, {x:3, y:3} ], // Red
    1: [ {x:11, y:2}, {x:12, y:2}, {x:11, y:3}, {x:12, y:3} ], // Green
    2: [ {x:11, y:11}, {x:12, y:11}, {x:11, y:12}, {x:12, y:12} ], // Yellow
    3: [ {x:2, y:11}, {x:3, y:11}, {x:2, y:12}, {x:3, y:12} ] // Blue
  };
}
