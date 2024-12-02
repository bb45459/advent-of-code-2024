const dayArg = Deno.args[0];

const filePath = `./src/day${dayArg}/day.${dayArg}.ts`;

const command = new Deno.Command("deno", {
  args: [
    "run",
    "-A",
    filePath,
  ],
});

const result = await command.output();

const textDecoder = new TextDecoder();
console.log(textDecoder.decode(result.stdout));
console.error(textDecoder.decode(result.stderr));
