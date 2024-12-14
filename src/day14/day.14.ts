function parseInput() {
  const input = Deno.readTextFileSync("src/day14/input.txt");

  const parsed = input.split("\n").filter((el) => !!el);

  return parsed;
}

function part1() {
  const input = parseInput();

  const width = 101;
  const height = 103;

  let robots = input.map((el) => {
    const pos = el.split(" ")[0].slice(2).split(",").map(Number);
    const velo = el.split(" ")[1].slice(2).split(",").map(Number);

    return { pos, velo };
  });

  for (let i = 0; i < 100; i++) {
    robots = robots.map((robot) => {
      const newX = (robot.pos[0] + robot.velo[0]) % width;
      const newY = (robot.pos[1] + robot.velo[1]) % height;

      return {
        pos: [newX < 0 ? newX + width : newX, newY < 0 ? newY + height : newY],
        velo: robot.velo,
      };
    });
    console.log(robots);
  }

  const quadrantCounts = robots.reduce((acc, curr) => {
    if (curr.pos[0] < 50 && curr.pos[1] < 51) {
      return {
        ...acc,
        ul: acc.ul + 1,
      };
    }
    if (curr.pos[0] > 50 && curr.pos[1] < 51) {
      return {
        ...acc,
        ur: acc.ur + 1,
      };
    }
    if (curr.pos[0] < 50 && curr.pos[1] > 51) {
      return {
        ...acc,
        bl: acc.bl + 1,
      };
    }
    if (curr.pos[0] > 50 && curr.pos[1] > 51) {
      return {
        ...acc,
        br: acc.br + 1,
      };
    }
    return acc;
  }, {
    ul: 0,
    ur: 0,
    bl: 0,
    br: 0,
  });

  const ans = quadrantCounts.ul * quadrantCounts.ur * quadrantCounts.bl *
    quadrantCounts.br;

  console.log(ans);

  displayPattern(robots);
  return 0;
}

function part2() {
  const input = parseInput();

  return 0;
}

part1();
// part2();

function displayPattern(robots: { pos: number[]; velo: number[] }[]) {
  const grid = Array.from(
    { length: 103 },
    () => Array.from({ length: 101 }, () => "."),
  );

  // console.log(grid);

  robots.forEach((robot) => {
    grid[robot.pos[0]][robot.pos[1]] = "X";
  });

  console.log(grid.map((el) => el.join("")).join("\n"));
}
