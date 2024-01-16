/**
 * You are given an integer matrix isWater of size m x n that represents a map of land and water cells.

If isWater[i][j] == 0, cell (i, j) is a land cell.
If isWater[i][j] == 1, cell (i, j) is a water cell.
You must assign each cell a height in a way that follows these rules:

The height of each cell must be non-negative.
If the cell is a water cell, its height must be 0.
Any two adjacent cells must have an absolute height difference of at most 1. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).
Find an assignment of heights such that the maximum height in the matrix is maximized.

Return an integer matrix height of size m x n where height[i][j] is cell (i, j)'s height. If there are multiple solutions, return any of them.

 

Example 1:



Input: isWater = [[0,1],[0,0]]
Output: [[1,0],[2,1]]
Explanation: The image shows the assigned heights of each cell.
The blue cell is the water cell, and the green cells are the land cells.
Example 2:



Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
Output: [[1,1,0],[0,1,1],[1,2,2]]
Explanation: A height of 2 is the maximum possible height of any assignment.
Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.
 

Constraints:

m == isWater.length
n == isWater[i].length
1 <= m, n <= 1000
isWater[i][j] is 0 or 1.
There is at least one water cell.
 */

// Soln 1 => https://www.youtube.com/watch?v=DCt7Gh-fyOA
/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function (isWater) {
  const m = isWater.length;
  const n = isWater[0].length;
//   declaring matrix and filling it with -1
  const answer = Array(m)
    .fill("")
    .map((_) => Array(n).fill(-1));
    // direction array right, left, up, down
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let queue = [];

//   traverse matrix and put 0 where there is 1 in isWater matrix and add its position to queue
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (isWater[row][col]) {
        queue.push([row, col]);
        answer[row][col] = 0;
      }
    }
  }

  console.log("answer before : ",answer)
  console.log("q : " , queue)

  while (queue.length) {
    // for storing adj element index
    let next = [];
    for (let [r, c] of queue) {
      for (let [adjr, adjc] of dir) {
        console.log("r:",r," c:",c, " adjr : ",adjr, "  adjc: ", adjc)
        adjr += r;
        adjc += c;
        if (
          adjr < 0 ||
          adjc < 0 ||
          adjr >= m ||
          adjc >= n ||
          answer[adjr][adjc] !== -1
        ) {
          continue;
        }

        answer[adjr][adjc] = answer[r][c] + 1;
        console.log("updated answer", answer)
        next.push([adjr, adjc]);
      }
    }

    queue = next;
    console.log("updated queue", queue)

  }

  console.log(" answer", answer)
  return answer;
};

const isWater = [
    [0,1],
    [0,0]
];

const result = highestPeak(isWater);
console.log(result);

// soln 2 = (gives tle)


/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
// var highestPeak = function(isWater) {
//     const rows = isWater.length;
//     const cols = isWater[0].length;
    
//     // Initialize a result grid with -1 representing unvisited cells
//     const result = Array.from({ length: rows }, () => Array(cols).fill(-1));
    
//     // Initialize a queue for BFS
//     const queue = [];
    
//     // Enqueue all water cells with distance 0
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             if (isWater[i][j] === 1) {
//                 queue.push([i, j, 0]);
//                 result[i][j] = 0; // Set water cells distance to 0
//             }
//         }
//     }
    
//     // Define possible moves (up, down, left, right)
//     const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
//     // Perform BFS
//     while (queue.length > 0) {
//         const [x, y, distance] = queue.shift();
        
//         // Explore neighbors
//         for (const [dx, dy] of directions) {
//             const nx = x + dx;
//             const ny = y + dy;
            
//             // Check if the neighbor is within the grid and unvisited
//             if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && result[nx][ny] === -1) {
//                 result[nx][ny] = distance + 1;
//                 queue.push([nx, ny, distance + 1]);
//             }
//         }
//     }
    
//     return result;
// };

// Example usage:
// const isWater = [
//     [0,1],
//     [0,0]
// ];

// const result = highestPeak(isWater);
// console.log(result);


// Explanation:
// - The solution initializes a result grid with -1 representing unvisited cells and a queue for BFS.
// - Water cells are enqueued with distance 0 since they are at the starting point of the BFS.
// - BFS is performed to calculate the distance from water cells to other cells, updating the result grid accordingly.
// - The final result grid represents the distance of each cell to the nearest water cell, which effectively gives the elevation in the context of the problem.