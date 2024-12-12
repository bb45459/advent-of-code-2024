function parseInput() {
  const input = Deno.readTextFileSync("src/day12/input.txt");

  const parsed = input.split("\n").filter((el) => !!el).map((el) =>
    el.split("")
  );

  return parsed;
}

function part1() {
  const input = parseInput();

  const visited = new Set<string>();

  // start at 0,0
  // get the val
  // check all 4 directions
  // for matches do the same check
  // adding up the perimeters and counting the instances

  let regionDone = false;
  let i = 0;
  let j = 0;
  let regionVal = input[0][0];
  while (!regionDone) {
  }

  return 0;
}

function part2() {
  const input = parseInput();

  return 0;
}

part1();
// part2();

function checkBorders(
  val,
  row,
  col,
  grid,
  visited: Set<string>,
  area,
  perimeter,
) {
  // borders 1 then perimeter adds 3
  // borders 2 then perimeter adds 2
  // borders 3 then perimeter adds 1
  // borders 4 then perimeter adds 0
  const up = grid[row - 1]?.[col] === val;
  const down = grid[row + 1]?.[col] === val;
  const left = grid[row]?.[col - 1] === val;
  const right = grid[row]?.[col + 1] === val;

  visited.add(`${row},${col}`);

  area++;
  perimeter +
    (4 - ((up ? 1 : 0) + (down ? 1 : 0) + (left ? 1 : 0) + (right ? 1 : 0)));

  if (
    up && !visited.has(`${row - 1},${col}`) &&
    down && !visited.has(`${row + 1},${col}`) &&
    left && !visited.has(`${row},${col + 1}`) &&
    right && !visited.has(`${row},${col - 1}`)
  ) {
  }
}
