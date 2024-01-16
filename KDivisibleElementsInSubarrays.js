/**
 * Given an integer array nums and two integers k and p, return the number of distinct subarrays, which have at most k elements that are divisible by p.

Two arrays nums1 and nums2 are said to be distinct if:

They are of different lengths, or
There exists at least one index i where nums1[i] != nums2[i].
A subarray is defined as a non-empty contiguous sequence of elements in an array.

 

Example 1:

Input: nums = [2,3,3,2,2], k = 2, p = 2
Output: 11
Explanation:
The elements at indices 0, 3, and 4 are divisible by p = 2.
The 11 distinct subarrays which have at most k = 2 elements divisible by 2 are:
[2], [2,3], [2,3,3], [2,3,3,2], [3], [3,3], [3,3,2], [3,3,2,2], [3,2], [3,2,2], and [2,2].
Note that the subarrays [2] and [3] occur more than once in nums, but they should each be counted only once.
The subarray [2,3,3,2,2] should not be counted because it has 3 elements that are divisible by 2.
Example 2:

Input: nums = [1,2,3,4], k = 4, p = 1
Output: 10
Explanation:
All element of nums are divisible by p = 1.
Also, every subarray of nums will have at most 4 elements that are divisible by 1.
Since all subarrays are distinct, the total number of subarrays satisfying all the constraints is 10.
 
 */

// Approach 1:

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} p
 * @return {number}
 */
var countDistinct = function (nums, k, p) {
  let set = new Set();
  let subArrCount = 0;
  for (let i = 0; i < nums.length; i++) {
    let count = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] % p == 0) {
        count++;
        if (count > k) {
          break;
        }
      }

      let substr = nums.slice(i, j + 1).join(",");
      if (!set.has(substr)) {
        set.add(substr);
        subArrCount++;
      }
    }
  }
  console.log(set);
  return subArrCount;
};

// Approach 2 - recursion

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} p
 * @return {number}
 */
var countDistinct = function (nums, k, p) {
  let ans = new Set();
  let temp = [];
  let hash = {};
  function solve(nums, k, p, ind, cnt, str) {
    if (
      cnt > k ||
      (temp.length >= 2 && temp[temp.length - 2] + 1 != temp[temp.length - 1])
    ) {
      return;
    }

    if (str.length > 0 && cnt <= k) {
      ans.add(str);
    }

    for (let i = ind; i < nums.length; i++) {
      temp.push(i);
      solve(
        nums,
        k,
        p,
        i + 1,
        nums[i] % p == 0 ? cnt + 1 : cnt,
        str + "~" + nums[i]
      );
      temp.pop();
    }
  }

  solve(nums, k, p, 0, 0, "");
  return [...ans].length;
};
