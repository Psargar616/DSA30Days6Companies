/**
 * Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

In one move, you can increment or decrement an element of the array by 1.

Test cases are designed so that the answer will fit in a 32-bit integer.

 

Example 1:

Input: nums = [1,2,3]
Output: 2
Explanation:
Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
Example 2:

Input: nums = [1,10,2,9]
Output: 16
 

Constraints:

n == nums.length
1 <= nums.length <= 105
-109 <= nums[i] <= 109
 */

// Approach 1
var minMoves2 = function (nums) {
  // sort array
  nums.sort((a, b) => a - b);
  //   find median
  let total_moves = 0,
    mid = Math.floor(nums.length / 2);
  // make all elements in array equal to median and add required number to total_moves
  for (let i = 0; i < nums.length; i++) {
    total_moves += Math.abs(nums[i] - nums[mid]);
  }
  return total_moves;
};

// Approach 2
var minMoves2 = function (nums) {
  // Sort the array low to high
  nums.sort(function (a, b) {
    return a - b;
  });
  let i = 0;
  let j = nums.length - 1;
  let res = 0;
  /**
   * Sum up the difference between the next highest and lowest numbers. Regardless of what number we wish to move towards, the number of moves is the same.
   */
  while (i < j) {
    res += nums[j] - nums[i];
    i++;
    j--;
  }
  return res;
};
