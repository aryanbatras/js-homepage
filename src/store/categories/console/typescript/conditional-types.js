export const conditionalTypes = {
  title: "Conditional Types",
  description: "Create conditional types that select types based on conditions",
  code_examples: [
    {
      example: "Example 1:",
      code: "type NonNullable<T> = T extends null | undefined ? never : T;",
    },
  ],
  hints: [
    {
      hint: "Hint: Use extends keyword for type conditions",
    },
    {
      hint: "Think about union types and never type",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Basic Conditional Types",
      code: "type NonNullable<T> = T extends null | undefined ? never : T;\n\ntype IsString<T> = T extends string ? true : false;\n\ntype ArrayElement<T> = T extends (infer U)[] ? U : never;",
    },
  ],
  files: [
    {
      name: "conditionalTypes.ts",
      code: "type NonNullable<T> = T extends null | undefined ? never : T;\n\ntype IsString<T> = T extends string ? true : false;\n\ntype ArrayElement<T> = T extends (infer U)[] ? U : never;"
    }
  ],
  tests: [
    {
      test: "Test 1: Conditional types",
      code: "type Test1 = NonNullable<string | null>;\ntype Test2 = IsString<'hello'>;\ntype Test3 = ArrayElement<string[]>;\nconsole.log('NonNullable result:', 'should be string');\nconsole.log('IsString result:', 'should be true');\nconsole.log('ArrayElement result:', 'should be string');"
    }
  ],
};
