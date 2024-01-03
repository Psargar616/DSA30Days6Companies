/**
 * @param {number} divisor1
 * @param {number} divisor2
 * @param {number} uniqueCnt1
 * @param {number} uniqueCnt2
 * @return {number}
 */

// Approach 1 => using Binary Search
const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (x, y) => (x * y) / gcd(x, y);

var minimizeSet = function (divisor1, divisor2, uniqueCnt1, uniqueCnt2) {
  // Initialize low and high pointers
  let low = 0;
  let high = Number.MAX_VALUE;
  let ans = Number.MAX_VALUE;
  let lcmofd1d2 = lcm(divisor1, divisor2);

  while (low <= high) {
    // find mid val
    let mid = low + Math.floor((high - low) / 2);
    // find numbers not divisible by divisor1
    let notd1 = mid - Math.floor(mid / divisor1);
    // find numbers not divisible by divisor2
    let notd2 = mid - Math.floor(mid / divisor2);
    // find numbers not divisible by divisor1 & divisor2 using their lcn
    let notboth = mid - Math.floor(mid / lcmofd1d2);

    
    if (
      notd1 >= uniqueCnt1 &&
      notd2 >= uniqueCnt2 &&
      notboth >= uniqueCnt1 + uniqueCnt2
    ) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
};
