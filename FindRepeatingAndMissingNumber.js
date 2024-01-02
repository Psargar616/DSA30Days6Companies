/**
 * Given an unsorted array Arr of size N of positive integers. One number 'A' from set {1, 2,....,N} is missing and one number 'B' occurs twice in array. Find these two numbers.

Example 1:

Input:
N = 2
Arr[] = {2, 2}
Output: 2 1
Explanation: Repeating number is 2 and 
smallest positive missing number is 1.
Example 2:

Input:
N = 3
Arr[] = {1, 3, 3}
Output: 3 2
Explanation: Repeating number is 3 and 
smallest positive missing number is 2.
 */

// Approach 1

//Function to find two repeating element in an array of size n.
findTwoElement(arr, n);
{
  //your code here
  let hashArr = new Array(n + 1).fill(0);
  let repeating = -1,
    missing = -1;
  for (let i = 0; i < n; i++) {
    hashArr[arr[i]]++;
  }

  for (let i = 1; i <= n; i++) {
    if (hashArr[i] == 2) {
      repeating = i;
    } else if (hashArr[i] == 0) {
      missing = i;
    }

    if (repeating != -1 && missing != -1) {
      break;
    }
  }

  return [repeating, missing];
}
