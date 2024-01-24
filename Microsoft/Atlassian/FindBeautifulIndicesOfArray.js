/**
 *  Find Beautiful Indices in the Given Array I
Solved
Medium
Topics
Companies
Hint
You are given a 0-indexed string s, a string a, a string b, and an integer k.

An index i is beautiful if:

0 <= i <= s.length - a.length
s[i..(i + a.length - 1)] == a
There exists an index j such that:
0 <= j <= s.length - b.length
s[j..(j + b.length - 1)] == b
|j - i| <= k
Return the array that contains beautiful indices in sorted order from smallest to largest.

 

Example 1:

Input: s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15
Output: [16,33]
Explanation: There are 2 beautiful indices: [16,33].
- The index 16 is beautiful as s[16..17] == "my" and there exists an index 4 with s[4..11] == "squirrel" and |16 - 4| <= 15.
- The index 33 is beautiful as s[33..34] == "my" and there exists an index 18 with s[18..25] == "squirrel" and |33 - 18| <= 15.
Thus we return [16,33] as the result.
Example 2:

Input: s = "abcd", a = "a", b = "a", k = 4
Output: [0]
Explanation: There is 1 beautiful index: [0].
- The index 0 is beautiful as s[0..0] == "a" and there exists an index 0 with s[0..0] == "a" and |0 - 0| <= 4.
Thus we return [0] as the result.
 */

// Approach 1
/**
 * @param {string} s
 * @param {string} a
 * @param {string} b
 * @param {number} k
 * @return {number[]}
 */
var beautifulIndices = function (s, a, b, k) {
  let aOcc = [];
  let bOcc = [];
  let res = new Set();
  // find all indexes of a
  for (let i = 0; i <= s.length - a.length; i++) {
    if (s.substring(i, i + a.length) === a) {
      aOcc.push(i);
    }
  }
  // find all indexes of b
  for (let i = 0; i <= s.length - b.length; i++) {
    if (s.substring(i, i + b.length) === b) {
      bOcc.push(i);
    }
  }
  // check for conditions
  for (let i = 0; i < aOcc.length; i++) {
    for (let j = 0; j < bOcc.length; j++) {
      if (Math.abs(aOcc[i] - bOcc[j]) <= k) {
        res.add(aOcc[i]);
      }
    }
  }
  return Array.from(res).sort((a, b) => a - b);
};

// Approach 2
/**
 * @param {string} s
 * @param {string} a
 * @param {string} b
 * @param {number} k
 * @return {number[]}
 */

// Solution: KMP Algorithm & Two Pointers

// Use a modified KMP algorithm to find all matches of `a` in `s`, and the same for `b`.
// Use two pointers to find the number of indices from a and b that are at most k distance apart.
// Anchor the pointer i going through indices from a.
// Move up the pointer j (for indices in b) while greater than k distance before i.

// n = length of s, m = length of a and b
// Time Complexity: O(n + m)
// Space Complexity: O(m)
var beautifulIndices = function (s, a, b, k) {
  let aIndices = kmp(s, a),
    bIndices = kmp(s, b);
  let n = s.length,
    ans = [];
  for (let i = 0, j = 0; i < aIndices.length && j < bIndices.length; i++) {
    while (j < bIndices.length && aIndices[i] - bIndices[j] > k) j++;
    if (j < bIndices.length && Math.abs(bIndices[j] - aIndices[i]) <= k)
      ans.push(aIndices[i]);
  }
  return ans;
};

function kmp(str, substr) {
  let lps = getLPS(substr);
  let n = str.length,
    m = substr.length;
  let i = 0,
    j = 0;
  let matches = [];
  while (j < n) {
    if (str[j] === substr[i]) {
      i++, j++;
      if (i === m) matches.push(j - m);
    } else if (i > 0) {
      i = lps[i - 1]; // rollback
    } else j++; // i is 0, so we move j forward
  }
  return matches;
}

function getLPS(str) {
  let n = str.length,
    lps = Array(n).fill(0);
  let i = 0,
    j = 1;
  while (j < n) {
    if (str[i] === str[j]) {
      lps[j++] = ++i;
    } else if (i > 0) {
      i = lps[i - 1];
    } else j++;
  }
  return lps;
}

//   Approach 3
var beautifulIndices = function (s, a, b, k) {
  const res = []; // Initialize an array to store result indices

  for (let i = 0; i < s.length; i++) {
    // Check if substring starting at index 'i' matches string 'a'
    if (s[i] === a[0] && s.substring(i, i + a.length) === a) {
      // Iterate within the range of 'k' to find 'b' after 'a'
      for (
        let j = Math.max(0, i - k);
        j <= Math.min(s.length - b.length, i + k);
        j++
      ) {
        // Check if substring starting at index 'j' matches string 'b'
        if (s[j] === b[0] && s.substring(j, j + b.length) === b) {
          res.push(i); // Add index 'i' to result array
          break; // Break the inner loop after finding the first occurrence of 'b'
        }
      }
    }
  }
};
