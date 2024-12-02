import "@std/dotenv/load";

const session = Deno.env.get("SESSION");
const day = Deno.args[0];

if (!day) {
    throw new Error("No day provided");
}
if (!session) {
    throw new Error("No session");
}

const res = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
    headers: {
        cookie: `session=${session}`,
    },
});

const text = await res.text();

await Deno.writeTextFile(`src/day${day}/input.txt`, text);
