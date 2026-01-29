export const xssPrevention = {
  title: "XSS Prevention",
  description: "Create functions to prevent Cross-Site Scripting attacks",
  code_examples: [
    {
      example: "Example 1:",
      code: "const safeHTML = escapeHTML('<script>alert(\"xss\")</script>');",
    },
  ],
  hints: [
    {
      hint: "Hint: Escape HTML special characters",
    },
    {
      hint: "Hint: Use textContent instead of innerHTML when possible",
    },
  ],
  solution: [
    {
      approach: "Approach 1: HTML Escaping",
      code: "function escapeHTML(str) {\n  const div = document.createElement('div');\n  div.textContent = str;\n  return div.innerHTML;\n}\n\nfunction sanitizeInput(input) {\n  return input\n    .replace(/[<>]/g, '')\n    .replace(/javascript:/gi, '')\n    .replace(/on\\w+=/gi, '');\n}\n\nfunction createSafeElement(tag, content) {\n  const safeElement = document.createElement(tag);\n  if (content) {\n    safeElement.textContent = content;\n  }\n  return safeElement;\n}",
    },
  ],
  files: [
    {
      name: "security.js",
      code: "function escapeHTML(str) {\n  const div = document.createElement('div');\n  div.textContent = str;\n  return div.innerHTML;\n}\n\nfunction sanitizeInput(input) {\n  return input\n    .replace(/[<>]/g, '')\n    .replace(/javascript:/gi, '')\n    .replace(/on\\w+=/gi, '');\n}\n\nfunction createSafeElement(tag, content) {\n  const safeElement = document.createElement(tag);\n  if (content) {\n    safeElement.textContent = content;\n  }\n  return safeElement;\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: HTML escaping",
      code: "const malicious = '<script>alert(\"xss\")</script>';\nconsole.log('Escaped:', escapeHTML(malicious));\nconsole.log('Sanitized:', sanitizeInput(malicious));"
    }
  ],
};
