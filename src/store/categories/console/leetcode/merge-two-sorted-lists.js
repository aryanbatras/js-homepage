export const mergeTwoSortedLists = {
  title: "Merge Two Sorted Lists",
  description: "Merge two sorted linked lists and return it as a sorted list.",
  code_examples: [
    {
      example: "Example 1:",
      code: "Input: l1 = [1,2,4], l2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
    },
  ],
  hints: [
    {
      hint: "Hint: Use a dummy node to simplify the merge process",
    },
    {
      hint: "Hint: Compare nodes from both lists iteratively",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Iterative Merge",
      code: "function mergeTwoLists(l1, l2) {\n  const dummy = new ListNode(0);\n  let current = dummy;\n  \n  while (l1 && l2) {\n    if (l1.val <= l2.val) {\n      current.next = l1;\n      l1 = l1.next;\n    } else {\n      current.next = l2;\n      l2 = l2.next;\n    }\n    current = current.next;\n  }\n  \n  current.next = l1 || l2;\n  return dummy.next;\n}",
    },
  ],
  files: [
    {
      name: "mergeLists.js",
      code: "function ListNode(val, next = null) {\n  this.val = val;\n  this.next = next;\n}\n\nfunction mergeTwoLists(l1, l2) {\n  const dummy = new ListNode(0);\n  let current = dummy;\n  \n  while (l1 && l2) {\n    if (l1.val <= l2.val) {\n      current.next = l1;\n      l1 = l1.next;\n    } else {\n      current.next = l2;\n      l2 = l2.next;\n    }\n    current = current.next;\n  }\n  \n  current.next = l1 || l2;\n  return dummy.next;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic merge",
      code: "const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));\nconst l2 = new ListNode(1, new ListNode(3, new ListNode(4)));\nconst result = mergeTwoLists(l1, l2);\nconsole.log('Merged list:', result);"
    }
  ],
};
