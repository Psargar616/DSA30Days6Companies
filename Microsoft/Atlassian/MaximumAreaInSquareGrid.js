/**
 * There is a grid with n + 2 horizontal bars and m + 2 vertical bars, and initially containing 1 x 1 unit cells.

The bars are 1-indexed.

You are given the two integers, n and m.

You are also given two integer arrays: hBars and vBars.

hBars contains distinct horizontal bars in the range [2, n + 1].
vBars contains distinct vertical bars in the range [2, m + 1].
You are allowed to remove bars that satisfy any of the following conditions:

If it is a horizontal bar, it must correspond to a value in hBars.
If it is a vertical bar, it must correspond to a value in vBars.
Return an integer denoting the maximum area of a square-shaped hole in the grid after removing some bars (possibly none).

 

Example 1:



Input: n = 2, m = 1, hBars = [2,3], vBars = [2]
Output: 4
Explanation: The left image shows the initial grid formed by the bars.
The horizontal bars are in the range [1,4], and the vertical bars are in the range [1,3].
It is allowed to remove horizontal bars [2,3] and the vertical bar [2].
One way to get the maximum square-shaped hole is by removing horizontal bar 2 and vertical bar 2.
The resulting grid is shown on the right.
The hole has an area of 4.
It can be shown that it is not possible to get a square hole with an area more than 4.
Hence, the answer is 4.
Example 2:



Input: n = 1, m = 1, hBars = [2], vBars = [2]
Output: 4
Explanation: The left image shows the initial grid formed by the bars.
The horizontal bars are in the range [1,3], and the vertical bars are in the range [1,3].
It is allowed to remove the horizontal bar [2] and the vertical bar [2].
To get the maximum square-shaped hole, we remove horizontal bar 2 and vertical bar 2.
The resulting grid is shown on the right.
The hole has an area of 4.
Hence, the answer is 4, and it is the maximum possible.
Example 3:



Input: n = 2, m = 3, hBars = [2,3], vBars = [2,3,4]
Output: 9
Explanation: The left image shows the initial grid formed by the bars.
The horizontal bars are in the range [1,4], and the vertical bars are in the range [1,5].
It is allowed to remove horizontal bars [2,3] and vertical bars [2,3,4].
One way to get the maximum square-shaped hole is by removing horizontal bars 2 and 3, and vertical bars 3 and 4.
The resulting grid is shown on the right.
The hole has an area of 9.
It can be shown that it is not possible to get a square hole with an area more than 9.
Hence, the answer is 9.
 
 */

// Approach 1
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} hBars
 * @param {number[]} vBars
 * @return {number}
 */
var maximizeSquareHoleArea = function (n, m, hBars, vBars) {
  // sort hbars and vbars
  hBars.sort((a, b) => a - b);
  vBars.sort((a, b) => a - b);

  // find max consecutive horizontal bar
  let maxContHorizontalBars = 1;
  let currContHorizontalBars = 1;

  for (let i = 0; i < hBars.length - 1; i++) {
    if (hBars[i] + 1 === hBars[i + 1]) {
      currContHorizontalBars++;
    } else {
      currContHorizontalBars = 1;
    }
    maxContHorizontalBars = Math.max(
      maxContHorizontalBars,
      currContHorizontalBars
    );
  }

  // find max consecutive vertical bar
  let maxContVerticalBars = 1;
  let currContVerticalBars = 1;

  for (let i = 0; i < vBars.length - 1; i++) {
    if (vBars[i] + 1 === vBars[i + 1]) {
      currContVerticalBars++;
    } else {
      currContVerticalBars = 1;
    }
    maxContVerticalBars = Math.max(maxContVerticalBars, currContVerticalBars);
  }

  // add +1 to min of consecutive bars as the gap of 1 will be created when we remove a bar

  let squareSide = Math.min(maxContVerticalBars, maxContHorizontalBars) + 1;
  return squareSide * squareSide;
};

// Approach 2
var maximizeSquareHoleArea = function (n, m, hBars, vBars) {
  hBars.sort((a, b) => a - b);
  vBars.sort((a, b) => a - b);
  function getMaxContinuationLength(someBars) {
    let len = 1;
    let maxLen = 1;
    for (let i = 0; i < someBars.length; i++) {
      if (someBars[i] - 1 === someBars[i - 1]) {
        len++;
        maxLen = Math.max(maxLen, len);
      } else {
        len = 1;
      }
    }
    return maxLen + 1;
  }
  let r =
    Math.min(
      getMaxContinuationLength(hBars),
      getMaxContinuationLength(vBars)
    ) || 0;
  return r * r;
};
