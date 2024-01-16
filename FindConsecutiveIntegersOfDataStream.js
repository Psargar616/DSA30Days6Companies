/**
 * 
 For a stream of integers, implement a data structure that checks if the last k integers parsed in the stream are equal to value.

Implement the DataStream class:

DataStream(int value, int k) Initializes the object with an empty integer stream and the two integers value and k.
boolean consec(int num) Adds num to the stream of integers. Returns true if the last k integers are equal to value, and false otherwise. If there are less than k integers, the condition does not hold true, so returns false.
 

Example 1:

Input
["DataStream", "consec", "consec", "consec", "consec"]
[[4, 3], [4], [4], [4], [3]]
Output
[null, false, false, true, false]

Explanation
DataStream dataStream = new DataStream(4, 3); //value = 4, k = 3 
dataStream.consec(4); // Only 1 integer is parsed, so returns False. 
dataStream.consec(4); // Only 2 integers are parsed.
                      // Since 2 is less than k, returns False. 
dataStream.consec(4); // The 3 integers parsed are all equal to value, so returns True. 
dataStream.consec(3); // The last k integers parsed in the stream are [4,4,3].
                      // Since 3 is not equal to value, it returns False.
 
 */

/**
 * @param {number} value
 * @param {number} k
 */
var DataStream = function (value, k) {
  this.k = k;
  this.val = value;

  this.length = 0; // Total number of elements in data stream
  this.count = 0; // Last elements which are equal to value
};

/**
 * @param {number} num
 * @return {boolean}
 */
DataStream.prototype.consec = function (num) {
  this.length++;

  if (num === this.val) {
    this.count++;
  } else {
    this.count = 0;
  }

  if (this.length < this.k) {
    return false;
  }

  if (this.count >= this.k) {
    return true;
  }
  return false;
};

/**
 * Your DataStream object will be instantiated and called as such:
 * var obj = new DataStream(value, k)
 * var param_1 = obj.consec(num)
 */

// Approach 2 - Using queue

/**
 * @param {number} value
 * @param {number} k
 */
var DataStream = function (value, k) {
  this.queue = []; // Initializating  an empty queue.
  this.value = value; // Initializating value.
  this.k = k; // Initializating k.
};

/**
 * @param {number} num
 * @return {boolean}
 */
DataStream.prototype.consec = function (num) {
  this.queue.push(num); // Adding elements in the queue.
  if (this.queue.length < this.k) return false; // if number of element queue is less then k, then return false.
//   window size of k 
  let i = this.queue.length - this.k; // By this we will get from which index we would like to check for value.
  while (i < this.queue.length) {
    // Loop for traversing the queue.
    if (this.queue[i] !== this.value) return false; // if queue element is not equal to value, then in that case return false.}
    i++; // Updating the iterator.
  
  return true; // If k elements are matching the value then its a true.
};

/**
 * Your DataStream object will be instantiated and called as such:
 * var obj = new DataStream(value, k)
 * var param_1 = obj.consec(num)
*/}
