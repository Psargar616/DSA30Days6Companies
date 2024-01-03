/**
 * You are given a 0-indexed array of strings nums, where each string is of equal length and consists of only digits.

You are also given a 0-indexed 2D integer array queries where queries[i] = [ki, trimi]. For each queries[i], you need to:

Trim each number in nums to its rightmost trimi digits.
Determine the index of the kith smallest trimmed number in nums. If two trimmed numbers are equal, the number with the lower index is considered to be smaller.
Reset each number in nums to its original length.
Return an array answer of the same length as queries, where answer[i] is the answer to the ith query.

Note:

To trim to the rightmost x digits means to keep removing the leftmost digit, until only x digits remain.
Strings in nums may contain leading zeros.
 

Example 1:

Input: nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]]
Output: [2,2,1,0]
Explanation:
1. After trimming to the last digit, nums = ["2","3","1","4"]. The smallest number is 1 at index 2.
2. Trimmed to the last 3 digits, nums is unchanged. The 2nd smallest number is 251 at index 2.
3. Trimmed to the last 2 digits, nums = ["02","73","51","14"]. The 4th smallest number is 73.
4. Trimmed to the last 2 digits, the smallest number is 2 at index 0.
   Note that the trimmed number "02" is evaluated as 2.
Example 2:

Input: nums = ["24","37","96","04"], queries = [[2,1],[2,2]]
Output: [3,0]
Explanation:
1. Trimmed to the last digit, nums = ["4","7","6","4"]. The 2nd smallest number is 4 at index 3.
   There are two occurrences of 4, but the one at index 0 is considered smaller than the one at index 3.
2. Trimmed to the last 2 digits, nums is unchanged. The 2nd smallest number is 24.
 

Constraints:

1 <= nums.length <= 100
1 <= nums[i].length <= 100
nums[i] consists of only digits.
All nums[i].length are equal.
1 <= queries.length <= 100
queries[i].length == 2
1 <= ki <= nums.length
1 <= trimi <= nums[i].length
 */

// Soln 1

/**
 * @param {string[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var smallestTrimmedNumbers = function (nums, queries) {
  const answer = [];
  console.log("nums", nums);
  console.log("queries", queries);
  for (const query of queries) {
    const k = query[0]; // kth smallest
    const trim = query[1]; // rightmost trim
    // console.log("k:", k, "trim:", trim);

    // Step 1: Trim each number to its rightmost trim digits
    const trimmedNums = nums.map((num) => num.slice(-trim));
    // console.log(trimmedNums);

    // Step 2: Create an array of indices from 0 to nums.length - 1
    const indices = Array.from({ length: nums.length }, (_, index) => index);
    // console.log(indices);

    // Step 3: Sort the indices based on the trimmed numbers
    indices.sort((a, b) => {
      if (trimmedNums[a] !== trimmedNums[b]) {
        return trimmedNums[a].localeCompare(trimmedNums[b]);
      }
      return a - b; // If trimmed numbers are equal, use original index for comparison
    });
    // console.log(indices);

    // Step 4: Find the index of the kth smallest trimmed number
    const resultIndex = indices[k - 1];
    // console.log("k", k, "resultIndex", resultIndex);

    // Step 5: Push the answer for the current query to the result array
    answer.push(resultIndex);
    // console.log(answer);
  }

  return answer;
};

// Dry Run:
/**
 * 
nums [ '102', '473', '251', '814' ]
queries [ [ 1, 1 ], [ 2, 3 ], [ 4, 2 ], [ 1, 2 ] ]
k: 1 trim: 1
[ '2', '3', '1', '4' ] => trimmedNums
[ 0, 1, 2, 3 ] => idices
[ 2, 0, 1, 3 ] => sorted indices based on trimmedNums
k 1 resultIndex 2
[ 2 ] => result
k: 2 trim: 3
[ '102', '473', '251', '814' ]  => trimmedNums
[ 0, 1, 2, 3 ] => idices
[ 0, 2, 1, 3 ]  => sorted indices based on trimmedNums
k 2 resultIndex 2
[ 2, 2 ]
k: 4 trim: 2
[ '02', '73', '51', '14' ]
[ 0, 1, 2, 3 ]
[ 0, 3, 2, 1 ]
k 4 resultIndex 1
[ 2, 2, 1 ]
k: 1 trim: 2
[ '02', '73', '51', '14' ]
[ 0, 1, 2, 3 ]
[ 0, 3, 2, 1 ]
k 1 resultIndex 0
[ 2, 2, 1, 0 ]
 */

// dry run 2
/**
nums [ '24', '37', '96', '04' ]
queries [ [ 2, 1 ], [ 2, 2 ] ]
k: 2 trim: 1
[ '4', '7', '6', '4' ]
[ 0, 1, 2, 3 ]
[ 0, 3, 2, 1 ]
k 2 resultIndex 3
[ 3 ]
k: 2 trim: 2
[ '24', '37', '96', '04' ]
[ 0, 1, 2, 3 ]
[ 3, 0, 1, 2 ]
k 2 resultIndex 0
[ 3, 0 ]
 */