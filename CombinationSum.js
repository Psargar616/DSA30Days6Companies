


// using Backtracking

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  result = [];
  // backtracking approach
  function dfs(index, current, total) {
    // base case 
    if (total < 0 || current.length > k) return;
    // when total becomes 0 and array storing possible subarray i.e. current.length == k => add to result
    if (total === 0 && current.length === k) {
      result.push([...current]);
    }
    

    for (let i = index; i <= 9; i++) {
      current.push(i);
      // call dfs with updated i and total   
      dfs(i + 1, current, total - i);
      
      current.pop();
    }
  }

  dfs(1, [], n);

  return result;
};
