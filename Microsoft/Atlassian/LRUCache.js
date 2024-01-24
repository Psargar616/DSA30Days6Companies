/**
 * 146. LRU Cache
Solved
Medium
Topics
Companies
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

 

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 */

// Approach 1
class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      // this.cache.keys().next().value returns first item's key
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}

// Approach 2

/**
 * Doubly Linked List Node
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map(); // Hash map for quick access
  this.head = new Node(); // Dummy head node
  this.tail = new Node(); // Dummy tail node
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    const node = this.cache.get(key);
    this.moveToHead(node);
    return node.value;
  }
  return -1; // Key not found
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    const node = this.cache.get(key);
    node.value = value;
    this.moveToHead(node);
  } else {
    const newNode = new Node(key, value);
    this.cache.set(key, newNode);
    this.addToHead(newNode);

    if (this.cache.size > this.capacity) {
      const tailKey = this.removeTail();
      this.cache.delete(tailKey);
    }
  }
};

/**
 * Move a node to the head of the doubly linked list
 * @param {Node} node
 */
LRUCache.prototype.moveToHead = function (node) {
  this.removeNode(node);
  this.addToHead(node);
};

/**
 * Add a node to the head of the doubly linked list
 * @param {Node} node
 */
LRUCache.prototype.addToHead = function (node) {
  node.next = this.head.next;
  node.prev = this.head;
  this.head.next.prev = node;
  this.head.next = node;
};

/**
 * Remove a node from the doubly linked list
 * @param {Node} node
 */
LRUCache.prototype.removeNode = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
};

/**
 * Remove the tail node from the doubly linked list and return its key
 * @return {number}
 */
LRUCache.prototype.removeTail = function () {
  const tailNode = this.tail.prev;
  this.removeNode(tailNode);
  return tailNode.key;
};

// Example usage:
var obj = new LRUCache(2);
obj.put(1, 1);
obj.put(2, 2);
console.log(obj.get(1)); // Output: 1
obj.put(3, 3); // evicts key 2
console.log(obj.get(2)); // Output: -1 (not found)
obj.put(4, 4); // evicts key 1
console.log(obj.get(1)); // Output: -1 (not found)
console.log(obj.get(3)); // Output: 3
console.log(obj.get(4)); // Output: 4
