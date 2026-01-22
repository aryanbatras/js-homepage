export function findLanguage(fileName) {
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "jsx":
      return "javascript";
    case "tsx":
      return "typescript";
    default:
      return "javascript";
  }
}

export function findLanguageContent(fileName) {
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "html":
      return "<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n\n</body>\n</html>";
    case "css":
      return "body {\n  background-color: lightblue;\n}\n\nh1 {\n  color: white;\n  text-align: center;\n}\n\np {\n  font-family: verdana;\n  font-size: 20px;\n}";
    case "json":
      return '{\n  "name": "John Doe",\n  "age": 30,\n  "city": "New York"\n}';
    case "md":
      return "# Notes\n\n";
    case "js":
      return "console.log('Hello World');";
    case "ts":
      return "console.log('Hello World');";
    case "jsx":
      return "console.log('Hello World');";
    case "tsx":
      return "console.log('Hello World');";
    default:
      return "console.log('Hello World');";
  }
}
