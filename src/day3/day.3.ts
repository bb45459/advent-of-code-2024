function parseInput() {
  const input = Deno.readTextFileSync("src/day3/input.txt");

  const parsed = input;

  return parsed;
}

function part1() {
  const input = parseInput();

  const re = /mul\(\d\d?\d?,\d\d?\d?\)/g;

  const matches = input.match(re);

  const ans = matches?.reduce((acc, curr) => {
    const items = curr.match(/\d+/g)?.map(Number) ?? [];

    return acc + (items[0] * items[1]);
  }, 0);

  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  const re = /do\(\)|don\'t\(\)|mul\(\d\d?\d?,\d\d?\d?\)/g;

  const matches = input.match(re);

  let flag = true;

  const ans = matches?.reduce((acc, curr) => {
    if (curr === "do()") {
      flag = true;
    } else if (curr === "don't()") {
      flag = false;
    } else if (flag) {
      const items = curr.match(/\d+/g)?.map(Number) ?? [];

      return acc + (items[0] * items[1]);
    } else {
      return acc;
    }
    return acc;
  }, 0);

  console.log(ans);

  return 0;
}

part1();
part2();
