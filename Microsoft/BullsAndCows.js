/**
 * You are playing the Bulls and Cows game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

The number of "bulls", which are digits in the guess that are in the correct position.
The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.
Given the secret number secret and your friend's guess guess, return the hint for your friend's guess.

The hint should be formatted as "xAyB", where x is the number of bulls and y is the number of cows. Note that both secret and guess may contain duplicate digits.

 

Example 1:

Input: secret = "1807", guess = "7810"
Output: "1A3B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1807"
  |
"7810"
Example 2:

Input: secret = "1123", guess = "0111"
Output: "1A1B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1123"        "1123"
  |      or     |
"0111"        "0111"
Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.
 
 */

// Approach 1 : arrays
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    let bull = 0;
    let cow = 0;

    const seCount = [0,0,0,0,0,0,0,0,0,0];
    const guCount = [0,0,0,0,0,0,0,0,0,0];

    const len = secret.length;
    for(let i = 0; i < len; i++){
        if(secret[i] === guess[i]){
            bull++;
        } else {
            seCount[Number(secret[i])]++;
            guCount[Number(guess[i])]++;
        }
    }
    for(let i = 0; i < 10; i++){
        cow += Math.min(seCount[i],guCount[i]);
    }
    return `${bull}A${cow}B`;
};



// Approach 2 : using Hashmap
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  let bulls = 0,
    cows = 0;
  let secretMap = new Map(),
    guessMap = new Map();

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    } else {
      secretMap.set(secret[i], (secretMap.get(secret[i]) || 0) + 1);
      guessMap.set(guess[i], (guessMap.get(guess[i]) || 0) + 1);
    }
  }

  for (let key of guessMap.keys()) {
    if (secretMap.has(key)) {
      cows += Math.min(secretMap.get(key), guessMap.get(key));
    }
  }

  return `${bulls}A${cows}B`;
};

// Approach 3:
function getHint(secret, guess) {
  let cows = 0;
  let bulls = 0;
  const occurrences = Array(10).fill(0);

  for (let i = 0; i < secret.length; i++) {
    const guessNumber = parseInt(guess[i]);
    const secretNumber = parseInt(secret[i]);

    if (secretNumber === guessNumber) {
      bulls++;
      continue;
    }

    if (occurrences[secretNumber] < 0) {
      cows++;
    }

    if (occurrences[guessNumber] > 0) {
      cows++;
    }

    occurrences[secretNumber]++;
    occurrences[guessNumber]--;
  }

  return `${bulls}A${cows}B`;
}
