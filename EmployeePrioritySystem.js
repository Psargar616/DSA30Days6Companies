/**
 * @param {string[][]} access_times
 * @return {string[]}
 */

const calcMinutes = (s, t) => {
  let [hoursS, minutesS] = s.split(":").map(Number);
  let [hoursT, minutesT] = t.split(":").map(Number);
  // convert hours and minutes into date on same day
  let dateS = new Date(2023, 1, 1, hoursS, minutesS, 0);
  let dateT = new Date(2023, 1, 1, hoursT, minutesT, 0);

  // calculate time in seconds based on date
  let seconds = Math.abs(dateS.getTime() - dateT.getTime()) / 1000;
  let minutes = seconds / 60;
  return minutes;
};

var findHighAccessEmployees = function (access_times) {
  
  let map = new Map();
  let result = [];
  // use map to store employess as keys and their access times in array as values
  for (const [emp, acct] of access_times) {
    if (!map.has(emp)) {
      map.set(emp, []);
    }
    // convert time in hr and min before adding to array
    map.get(emp).push(acct.slice(0, 2) + ":" + acct.slice(2));
  }
  // sort map based on access time
  for (const [, acct] of map) acct.sort();

  // for each employee calc time in window of three
  for (const [emp, acct] of map) {
    for (let i = 0; i + 2 < acct.length; i++) {
      let minutesDifference = calcMinutes(acct[i], acct[i + 2]);
      if (minutesDifference < 60) {
        result.push(emp);
        break;
      }
    }
  }

  return result;
};
