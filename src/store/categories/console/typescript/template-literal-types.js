export const templateLiteralTypes = {
  title: "Template Literal Types",
  description: "Create types using template literal strings",
  code_examples: [
    {
      example: "Example 1:",
      code: "type EventName = `on${Capitalize<string>}`;\ntype ClickEvent = EventName<'click'>; // 'onclick'",
    },
  ],
  hints: [
    {
      hint: "Hint: Use backticks for template literal types",
    },
    {
      hint: "Think about Uppercase and Lowercase intrinsic types",
    },
  ],
  solution: [
    {
      approach: "Approach 1: Template Literals",
      code: "type EventName<T extends string> = `on${Capitalize<T>}`;\n\ntype CssProperty<T extends string> = `--${T}`;\n\ntype HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\ntype ApiEndpoint<T extends string> = `/api/${T}`;",
    },
  ],
  files: [
    {
      name: "templateTypes.ts",
      code: "type EventName<T extends string> = `on${Capitalize<T>}`;\n\ntype CssProperty<T extends string> = `--${T}`;\n\ntype HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\ntype ApiEndpoint<T extends string> = `/api/${T}`;"
    }
  ],
  tests: [
    {
      test: "Test 1: Template literal types",
      code: "type ClickEvent = EventName<'click'>;\ntype PrimaryColor = CssProperty<'primary'>;\ntype UsersEndpoint = ApiEndpoint<'users'>;\nconsole.log('Click event type:', 'should be onclick');\nconsole.log('CSS property type:', 'should be --primary');\nconsole.log('API endpoint type:', 'should be /api/users');"
    }
  ],
};
