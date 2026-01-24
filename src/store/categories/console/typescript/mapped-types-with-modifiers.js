export const mappedTypesWithModifiers = {
  title: "Mapped Types with Modifiers",
  description: "Create mapped types with readonly and optional modifiers",
  code_examples: [
    {
      example: "Example 1:",
      code: "type ReadonlyUser = Readonly<User>;\ntype OptionalUser = Partial<User>;",
    },
  ],
  hints: [
    {
      hint: "Hint: Use + and - modifiers for readonly and optional",
    },
    {
      hint: "Think about combining multiple modifiers",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Modifier Mapping",
      code: "type Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\ntype Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype ReadonlyPartial<T> = {\n  readonly [P in keyof T]?: T[P];\n};",
    },
  ],
  files: [
    {
      name: "mappedTypes.ts",
      code: "type Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\ntype Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\ntype Required<T> = {\n  [P in keyof T]-?: T[P];\n};\n\ntype ReadonlyPartial<T> = {\n  readonly [P in keyof T]?: T[P];\n};"
    }
  ],
  tests: [
    {
      test: "Test 1: Mapped types",
      code: "interface User {\n  name: string;\n  age: number;\n}\ntype ReadonlyUser = Readonly<User>;\ntype OptionalUser = Partial<User>;\nconst readonlyUser: ReadonlyUser = { name: 'John', age: 30 };\nconst optionalUser: OptionalUser = { name: 'Jane' };\nconsole.log('Readonly user:', readonlyUser);\nconsole.log('Optional user:', optionalUser);"
    }
  ],
};
