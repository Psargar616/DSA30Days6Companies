/**
 * 2400. Number of Ways to Reach a Position After Exactly k Steps
 * You are given two positive integers startPos and endPos. Initially, you are standing at position startPos on an infinite number line. With one step, you can move either one position to the left, or one position to the right.

Given a positive integer k, return the number of different ways to reach the position endPos starting from startPos, such that you perform exactly k steps. Since the answer may be very large, return it modulo 109 + 7.

Two ways are considered different if the order of the steps made is not exactly the same.

Note that the number line includes negative integers.

 

Example 1:

Input: startPos = 1, endPos = 2, k = 3
Output: 3
Explanation: We can reach position 2 from 1 in exactly 3 steps in three ways:
- 1 -> 2 -> 3 -> 2.
- 1 -> 2 -> 1 -> 2.
- 1 -> 0 -> 1 -> 2.
It can be proven that no other way is possible, so we return 3.
Example 2:

Input: startPos = 2, endPos = 5, k = 10
Output: 0
Explanation: It is impossible to reach position 5 from position 2 in exactly 10 steps.
 

Constraints:

1 <= startPos, endPos, k <= 1000

 */

const MOD = 1e9 + 7;
const getKey = (i, j) => `${i},${j}`;

const solve = (start, target, k, dp) => {
  if (k < 0) return 0;
  if (start === target && k === 0) return 1;
  if (dp.has(getKey(start, k))) return dp.get(getKey(start, k));

//   move left and right
  const ans =
    ((solve(start + 1, target, k - 1, dp) % MOD) +
      (solve(start - 1, target, k - 1, dp) % MOD)) %
    MOD;
  dp.set(getKey(start, k), ans);
  return ans;
};

var numberOfWays = function (startPos, endPos, k) {
  const dp = new Map();
  return solve(startPos, endPos, k, dp, k);
};


/**
 * @param {number} startPos
 * @param {number} endPos
 * @param {number} k
 * @return {number}
 */

// const mod= 1e9+7;
// const getKey = (i,j) =>`${i},${j}`;
// var numberOfWays = function(startPos, endPos, k) {
//    const dp = new Map();
//    return solve(startPos, endPos, k, dp);
// };

// const solve = (start, tar, k, dp) =>{
//    if(k<0) return 0;

//    if(start ===tar && k===0) return 1;

//    if(dp.has(getKey(start, k))) return dp.get(getKey(start,k));

//    const ans = (solve(start+1, tar, k-1,dp)%mod + solve(start-1, tar, k-1, dp)%mod)%mod;
//    dp.set(getKey(start,k), ans);
//    return ans;
// }