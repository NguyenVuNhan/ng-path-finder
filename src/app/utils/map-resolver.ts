export function getNeighbors(x: number, y: number, w: number, h: number) {
  const neighbors: number[][] = [];

  // for (let e of [ [-1, -1], [0, -1], [1, -1]
  //               , [-1, 0], [1, 0]
  //               , [-1, 1], [0, 1], [1, 1]]) {
  for (const e of [[0, -1], [-1, 0], [1, 0], [0, 1]]) {
    const tmpX = x + e[0];
    const tmpY = y + e[1];

    if (tmpX >= 0 && tmpY >= 0 && tmpX < w && tmpY < h) {
      neighbors.push([tmpX, tmpY]);
    }
  }

  return neighbors;
}

export function heuristic(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
