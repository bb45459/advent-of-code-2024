function parseInput() {
  const input = Deno.readTextFileSync("src/day2/input.txt");

  const parsed = input.split("\n").filter((el) => !!el);

  return parsed;
}

function part1() {
  const input = parseInput();

  const safeCount = input.reduce((acc, curr) => {
    const row = curr.split(" ").map(Number);

    let isSafe = false;

    isSafe = testIfSafe(row);

    return isSafe ? acc + 1 : acc;
  }, 0);

  console.log(safeCount);

  return 0;
}

function part2() {
  const input = parseInput();

  let unsafe = 0;
  let filtersafe = 0;
  let safe = 0;
  const safeCount = input.reduce((acc, curr) => {
    const row = curr.split(" ").map(Number);

    let isSafe = false;
    let filteredSafe = false;

    isSafe = testIfSafe(row);

    if (!isSafe) {
      row.forEach((_el, i) => {
        const filteredRow = row.filter((_, j) => i !== j);
        const test = testIfSafe(filteredRow);
        if (test) {
          filteredSafe = true;
        }
      });
    }

    if (filteredSafe) {
      filtersafe++;
    }
    if (isSafe) {
      safe++;
    }
    if (!isSafe && !filteredSafe) {
      unsafe++;
    }

    return isSafe || filteredSafe ? acc + 1 : acc;
  }, 0);

  console.log(safeCount, safe, filtersafe, unsafe);
}

part1();
part2();

function testIfSafe(arr: number[]) {
  let isSafe = true;
  let mode = "";
  arr.forEach((el, i) => {
    const prev = arr[i - 1];
    if (prev) {
      if (mode === "") {
        if (el > prev) {
          mode = "increasing";
        } else if (el < prev) {
          mode = "decreasing";
        }
      } else {
        if (mode === "increasing" && el < prev) {
          isSafe = false;
        } else if (mode === "decreasing" && el > prev) {
          isSafe = false;
        }
      }

      if (Math.abs(el - prev) > 3 || el - prev === 0) {
        isSafe = false;
      }
    }
  });
  return isSafe;
}
