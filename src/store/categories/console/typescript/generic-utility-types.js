export const genericUtilityTypes = {
  title: "Generic Utility Types",
  description: "Implement TypeScript utility types like Partial, Required, and Pick",
  code_examples: [
    {
      example: "Example 1:",
      code: "type PartialUser = Partial<User>;\ntype UserEmail = Pick<User, 'email'>;",
    },
  ],
  hints: [
    {
      hint: "Hint: Use mapped types and keyof operator",
    },
    {
      hint: "Think about how to transform property types",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Mapped Types",
      code: "type Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype Pick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};",
    },
  ],
  files: [
    {
      name: "utilityTypes.ts",
      code: "type Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype Pick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};"
    }
  ],
  tests: [
    {
      test: "Test 1: Partial type",
      code: "interface User {\n  name: string;\n  age: number;\n  email: string;\n}\ntype PartialUser = Partial<User>;\nconst user: PartialUser = { name: 'John' };\nconsole.log('Partial user:', user);"
    }
  ],
};
