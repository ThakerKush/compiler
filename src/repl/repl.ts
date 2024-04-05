import * as readline from "readline";
import { Lexer } from "../lexer/lexer";
import { Token, EOF, ILLEGAL } from "../lexer/token";

const PROMPT = ">>";

export function start(
  input: NodeJS.ReadableStream,
  output: NodeJS.WritableStream
) {
  const rl = readline.createInterface({
    input,
    output,
  });
  rl.on("line", (input) => {
    console.log(`Received: ${input}`);

    const lexer = new Lexer(input);
    let token = lexer.nextToken();
    console.log(token);
    while (token.Type !== EOF && token.Type !== ILLEGAL) {
      token = lexer.nextToken();
      console.log(token);
    }

    rl.prompt();
  });

  rl.setPrompt(PROMPT);
  rl.prompt();
}
