function parseInput() {
  const input = Deno.readTextFileSync("src/day4/input.txt");

  const parsed = input.split("\n").map((row) => row.split(""));

  return parsed;
}

function part1() {
  const input = parseInput();

  const ans = input.reduce((acc, row, i, matrix) => {
    const finds = row.reduce((findAcc, letter, j, currRow) => {
      const right = checkXmas(
        letter,
        currRow[j + 1],
        currRow[j + 2],
        currRow[j + 3],
      );
      const left = checkXmas(
        letter,
        currRow[j - 1],
        currRow[j - 2],
        currRow[j - 3],
      );
      const up = checkXmas(
        letter,
        matrix[i - 1]?.[j],
        matrix[i - 2]?.[j],
        matrix[i - 3]?.[j],
      );
      const down = checkXmas(
        letter,
        matrix[i + 1]?.[j],
        matrix[i + 2]?.[j],
        matrix[i + 3]?.[j],
      );
      const diagUpLeft = checkXmas(
        letter,
        matrix[i - 1]?.[j - 1],
        matrix[i - 2]?.[j - 2],
        matrix[i - 3]?.[j - 3],
      );
      const diagUpRight = checkXmas(
        letter,
        matrix[i - 1]?.[j + 1],
        matrix[i - 2]?.[j + 2],
        matrix[i - 3]?.[j + 3],
      );
      const diagDownLeft = checkXmas(
        letter,
        matrix[i + 1]?.[j - 1],
        matrix[i + 2]?.[j - 2],
        matrix[i + 3]?.[j - 3],
      );
      const diagDownRight = checkXmas(
        letter,
        matrix[i + 1]?.[j + 1],
        matrix[i + 2]?.[j + 2],
        matrix[i + 3]?.[j + 3],
      );

      const findCount = right + left + up + down + diagUpLeft + diagUpRight +
        diagDownLeft + diagDownRight;

      return findAcc + findCount;
    }, 0);

    return acc + finds;
  }, 0);

  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  const ans = input.reduce((acc, row, i, matrix) => {
    const finds = row.reduce((findAcc, letter, j) => {
      const check = checkXDashmas(
        letter,
        matrix[i]?.[j + 2],
        matrix[i + 1]?.[j + 1],
        matrix[i + 2]?.[j + 2],
        matrix[i + 2]?.[j],
      );

      const findCount = check;

      return findAcc + findCount;
    }, 0);

    return acc + finds;
  }, 0);

  console.log(ans);

  return 0;
}

part1();
part2();

function checkXmas(
  el1: string,
  el2?: string,
  el3?: string,
  el4?: string,
) {
  if (el1 === "X" && el2 === "M" && el3 === "A" && el4 === "S") {
    return 1;
  } else {
    return 0;
  }
}

function checkXDashmas(
  el1: string,
  el2?: string,
  el3?: string,
  el4?: string,
  el5?: string,
) {
  const border = [el1, el2, el4, el5].join("");
  if (["MMSS", "SMMS", "SSMM", "MSSM"].includes(border) && el3 === "A") {
    return 1;
  } else {
    return 0;
  }
}
