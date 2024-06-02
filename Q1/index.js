function maxSubArray(nums) {
  // Initialize maxCurrent and maxGlobal with the first element of the array
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];

  // Loop through the array starting from the second element
  for (let i = 1; i < nums.length; i++) {
    // Update maxCurrent to be the maximum of the current element or the sum of maxCurrent and the current element
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);

    // Update maxGlobal if maxCurrent is greater than maxGlobal
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
    }
  }

  // Return the maximum sum of the contiguous subarray found
  return maxGlobal;
}

// Example usage:
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6 (subarray [4, -1, 2, 1] has the largest sum)

// Additional dynamic inputs:
console.log(maxSubArray([1, 2, 3, 4, 5])); // Output: 15 (subarray [1, 2, 3, 4, 5] has the largest sum)
console.log(maxSubArray([-1, -2, -3, -4])); // Output: -1 (subarray [-1] has the largest sum)
console.log(maxSubArray([1, -1, 2, -2, 3, -3, 4, -4])); // Output: 4 (subarray [4] has the largest sum)
console.log(maxSubArray([5, -3, 5, -3, 5, -3, 5])); // Output: 12 (subarray [5, -3, 5, -3, 5, -3, 5] has the largest sum)
