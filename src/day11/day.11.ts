function parseInput() {
  const input = Deno.readTextFileSync("src/day11/input.txt");

  const parsed = input.split("\n").filter((el) => !!el);

  return parsed;
}

function part1() {
  const input = parseInput()[0];

  let nums = input.split(" ").map(Number);

  for (let i = 0; i < 25; i++) {
    console.log(nums);
    const newNums = nums.map((num) => applyFirstRule(num)).flat();

    nums = newNums;
  }

  console.log(nums.length);

  return 0;
}

function part2() {
  const input = parseInput()[0];

  let nums = input.split(" ").map(Number);

  const lookup = new Map<number, number[]>();

  for (let i = 0; i < 75; i++) {
    const newNums = nums.map((num) => {
      if (lookup.get(num)) {
        return lookup.get(num) ?? [];
      }
      const newNum = applyFirstRule(num);

      lookup.set(num, newNum);
      return newNum;
    }).flat();

    nums = newNums;
  }

  console.log(nums);
  console.log(nums.length);

  return 0;
}

part1();
part2();

function applyFirstRule(num: number) {
  // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
  // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
  // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

  if (num === 0) {
    return [1];
  }
  if (num.toString().length % 2 === 0) {
    return [
      num.toString().slice(0, num.toString().length / 2),
      num.toString().slice(num.toString().length / 2),
    ].map(Number);
  }
  return [num * 2024];
}
