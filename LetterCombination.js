/**
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.


 

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 

Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].
 */

// soln 1

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits == null || digits.length === 0) {
    return [];
  }
  let result = [];
  let output = "",
    index = 0;
  const phone_map = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];

  function solve(digits, output, index, result, phone_map) {
    // base case
    if (index >= String(digits.length)) {
      result.push(output);
      return;
    }

    let number = Number(digits[index]);
    let value = String(phone_map[number]);

    for (let i = 0; i < value.length; i++) {
      output += value[i];
      solve(digits, output, index + 1, result, phone_map);
      output = output.slice(0, -1);
    }
  }

  solve(digits, output, index, result, phone_map);

  return result;
};

// Soln 2 => https://www.youtube.com/watch?v=aywmj2hancw

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits == null || digits.length === 0) {
    return [];
  }
  const result = [];
  //All values in phone buttons
  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const dfs = (i, digits, slate) => {
    if (i === digits.length) {
      result.push(slate.join(""));
      return;
    }

    let chars = mapping[digits[i]];
    console.log(chars);

    for (let char of chars) {
      slate.push(char);
      console.log(slate);
      dfs(i + 1, digits, slate);
      slate.pop();
    }
  };

  dfs(0, digits, []);

  return result;
};
