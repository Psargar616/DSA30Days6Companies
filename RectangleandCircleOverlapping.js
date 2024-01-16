/**
 * 1401. Circle and Rectangle Overlapping
Solved
Medium
Topics
Companies
Hint
You are given a circle represented as (radius, xCenter, yCenter) and an axis-aligned rectangle represented as (x1, y1, x2, y2), where (x1, y1) are the coordinates of the bottom-left corner, and (x2, y2) are the coordinates of the top-right corner of the rectangle.

Return true if the circle and rectangle are overlapped otherwise return false. In other words, check if there is any point (xi, yi) that belongs to the circle and the rectangle at the same time.

 

Example 1:


Input: radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1
Output: true
Explanation: Circle and rectangle share the point (1,0).
Example 2:

Input: radius = 1, xCenter = 1, yCenter = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1
Output: false
Example 3:


Input: radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1
Output: true
 
 */

/**
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {boolean}
 */
var checkOverlap = function (radius, xCenter, yCenter, x1, y1, x2, y2) {
  // nearest X and Y
  let xEdge = Math.max(x1, Math.min(x2, xCenter));
  let yEdge = Math.max(y1, Math.min(y2, yCenter));

  let xDistance = xCenter - xEdge;
  let yDistance = yCenter - yEdge;

  return xDistance ** 2 + yDistance ** 2 <= radius ** 2;
}

// Soln 2

var checkOverlap = function(radius, x_center, y_center, x1, y1, x2, y2) {
    let closestX = Math.max(x1, Math.min(x2, x_center));
    let closestY = Math.max(y1, Math.min(y2, y_center));
    
    let distX = x_center - closestX;
    let distY = y_center - closestY;
    
    return (distX ** 2) + (distY ** 2) <= radius ** 2;
};