/**
 * You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.

One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.

Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).

Note: You cannot rotate an envelope.

 

Example 1:

Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
Example 2:

Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
 

Constraints:

1 <= envelopes.length <= 105
envelopes[i].length == 2
1 <= wi, hi <= 105
 */

// Approach 1:
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  // Check if the envelopes array is empty
  if (envelopes.length === 0) {
    return 0;
  }
  // Sort the envelopes based on width in increasing order
  envelopes.sort((a, b) => a[0] - b[0]);
  console.log(envelopes);
  // Create an array to store the longest increasing subsequence ending at each index
  const dp = new Array(envelopes.length).fill(1);

  // Iterate over each envelope
  for (let i = 1; i < envelopes.length; i++) {
    // Iterate over previous envelopes to find the longest increasing subsequence
    for (let j = 0; j < i; j++) {
      // Check if the current envelope can be nested inside the previous envelope
      if (envelopes[i][1] > envelopes[j][1]) {
        // Update the longest increasing subsequence ending at the current index
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  console.log(dp);

  // Find the maximum value in the dp array, which represents the overall maximum number of nested envelopes
  const maxNestedEnvelopes = Math.max(...dp);

  return maxNestedEnvelopes;
};

// console.logs
// after sorting arr : [ [ 2, 3 ], [ 5, 4 ], [ 6, 4 ], [ 6, 7 ] ]
// dp arrray after updating: [ 1, 2, 2, 3 ]

// Approach 2 :
/**
 * 
 Approach
        - Sort the envelopes based on their widths in ascending order.

        - If two envelopes have the same width, sort them by height in descending order.
This sorting step ensures that you can only place a smaller envelope inside a larger one.

        - Initialize a list lis to represent the Longest Increasing Subsequence (LIS) of heights. The first element of lis will be the height of the first envelope.

        - Iterate through the sorted envelopes starting from the second envelope.

        - For each envelope, extract its height.
If the height is greater than the last element in lis, simply add it to lis as this is a new larger envelope that can be added to the sequence.

        - If the height is less than or equal to the last element in lis, use binary search to find the correct position to replace an element in lis with the current height.

        - Continue this process for all envelopes.

        - The length of lis after the iteration represents the maximum number of envelopes that can be nested.

        - Return the length of lis as the result.

Complexity
Time Complexity (TC): The time complexity is O(n log n), where n is the number of envelopes.

Space Complexity (SC): The space complexity is O(n) for storing the LIS lis, where n is the number of envelopes         - .
 */
var maxEnvelopes = function(envelopes) {
    // Sort envelopes by width in ascending order. If widths are equal, sort by height in descending order.
    envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

    const lis = [envelopes[0][1]]; // Initialize LIS with the first height.

    for (let i = 1; i < envelopes.length; i++) {
        const height = envelopes[i][1];

        if (height > lis[lis.length - 1]) {
            lis.push(height);
        } else {
            // Find the correct position to update LIS.
            let left = 0;
            let right = lis.length - 1;
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (lis[mid] < height) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            lis[left] = height;
        }
    }

    return lis.length;
};