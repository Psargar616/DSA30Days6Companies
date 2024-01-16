/**
 * Given an integer array nums, return the length of the longest strictly increasing 
subsequence
.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 
 */

// Approach 1:
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const memo = new Array(nums.length).fill(1);
  let res = 1;

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] <= nums[j]) continue;
      memo[i] = Math.max(memo[j] + 1, memo[i]);
      res = Math.max(memo[i], res);
    }
  }

  return res;
};

// Approach 2: DP + memoization

var lengthOfLIS = function (nums) {
  const n = nums.length;
  const dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));
  return f(0, -1, nums, n, dp);
};

function f(index, prevInd, nums, n, dp) {
  // base case
  if (index === n) return 0;
  // if dp has answer then return
  if (dp[index][prevInd + 1] !== -1) return dp[index][prevInd + 1];
  // not include currindex case
  let len = 0 + f(index + 1, prevInd, nums, n, dp);
  if (prevInd === -1 || nums[index] > nums[prevInd]) {
    // include currindex case
    len = Math.max(len, 1 + f(index + 1, index, nums, n, dp));
  }
  // storing res in dp
  dp[index][prevInd + 1] = len;
  return len;
}

// Approach 3
//recursion+memo
var lengthOfLIS = function (nums) {
  function picknotpick(index, prev) {
    if (index == nums.length) {
      return 0;
    }
    if (dp[index][prev + 1] !== -1) {
      return dp[index][prev + 1];
    }
    //so length does not increase and we move to next index keeping previous as same
    let notpick = 0 + picknotpick(index + 1, prev);
    let pick = 0;
    if (prev == -1 || nums[index] > nums[prev]) {
      //so length does  increase and we move to next index keeping previous as new index
      pick = 1 + picknotpick(index + 1, index);
    }
    return (dp[index][prev + 1] = Math.max(pick, notpick)); //prev+1 else it will be -1
  }
  let n = nums.length;
  let dp = new Array(n).fill().map(() => Array(n + 1).fill(-1));
  return picknotpick(0, -1);
};
