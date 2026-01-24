export const bestTimeToBuyAndSellStock = {
  title: "Best Time to Buy and Sell Stock",
  description: "Given an array prices where prices[i] is the price of a given stock on the ith day, find the maximum profit you can achieve.",
  code_examples: [
    {
      example: "Example 1:",
      code: "Input: prices = [7,1,5,3,6,4]\nOutput: 5",
    },
    {
      example: "Example 2:",
      code: "Input: prices = [7,6,4,3,1]\nOutput: 0",
    },
  ],
  hints: [
    {
      hint: "Hint: Track the minimum price seen so far",
    },
    {
      hint: "Hint: Calculate profit at each step and keep track of maximum",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Single Pass",
      code: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  \n  for (const price of prices) {\n    if (price < minPrice) {\n      minPrice = price;\n    } else if (price - minPrice > maxProfit) {\n      maxProfit = price - minPrice;\n    }\n  }\n  \n  return maxProfit;\n}",
    },
  ],
  files: [
    {
      name: "maxProfit.js",
      code: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  \n  for (const price of prices) {\n    if (price < minPrice) {\n      minPrice = price;\n    } else if (price - minPrice > maxProfit) {\n      maxProfit = price - minPrice;\n    }\n  }\n  \n  return maxProfit;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Profit possible",
      code: "console.log('Test 1 - Input: [7,1,5,3,6,4]');\nconsole.log('Expected: 5');\nconsole.log('Actual:', maxProfit([7,1,5,3,6,4]));"
    },
    {
      test: "Test 2: No profit",
      code: "console.log('Test 2 - Input: [7,6,4,3,1]');\nconsole.log('Expected: 0');\nconsole.log('Actual:', maxProfit([7,6,4,3,1]));"
    },
    {
      test: "Test 3: Single day",
      code: "console.log('Test 3 - Input: [5]');\nconsole.log('Expected: 0');\nconsole.log('Actual:', maxProfit([5]));"
    }
  ],
};
