export const urlShortenerDesign = {
  title: "URL Shortener Design",
  description: "Design a URL shortener service like bit.ly",
  code_examples: [
    {
      example: "Example 1:",
      code: "const shortUrl = urlShortener.shorten('https://example.com/very-long-url');",
    },
  ],
  hints: [
    {
      hint: "Hint: Use base62 encoding for compact URLs",
    },
    {
      hint: "Hint: Consider database schema and caching",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Hash-based Shortening",
      code: "class URLShortener {\n  constructor() {\n    this.urlMap = new Map();\n    this.counter = 1000;\n  }\n  \n  shorten(longUrl) {\n    const id = this.counter++;\n    const shortCode = this.encodeBase62(id);\n    this.urlMap.set(shortCode, longUrl);\n    return `https://short.ly/${shortCode}`;\n  }\n  \n  expand(shortUrl) {\n    const shortCode = shortUrl.split('/').pop();\n    return this.urlMap.get(shortCode);\n  }\n  \n  encodeBase62(num) {\n    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\n    let result = '';\n    while (num > 0) {\n      result = chars[num % 62] + result;\n      num = Math.floor(num / 62);\n    }\n    return result || '0';\n  }\n}",
    },
  ],
  files: [
    {
      name: "urlShortener.js",
      code: "class URLShortener {\n  constructor() {\n    this.urlMap = new Map();\n    this.counter = 1000;\n  }\n  \n  shorten(longUrl) {\n    const id = this.counter++;\n    const shortCode = this.encodeBase62(id);\n    this.urlMap.set(shortCode, longUrl);\n    return `https://short.ly/${shortCode}`;\n  }\n  \n  expand(shortUrl) {\n    const shortCode = shortUrl.split('/').pop();\n    return this.urlMap.get(shortCode);\n  }\n  \n  encodeBase62(num) {\n    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\n    let result = '';\n    while (num > 0) {\n      result = chars[num % 62] + result;\n      num = Math.floor(num / 62);\n    }\n    return result || '0';\n  }\n}"
    }
  ],
  tests: [
    {
      test: "Test 1: Basic shortening",
      code: "const shortener = new URLShortener();\nconst short = shortener.shorten('https://example.com/very-long-url');\nconsole.log('Short URL:', short);\nconsole.log('Expanded:', shortener.expand(short));"
    }
  ],
};
