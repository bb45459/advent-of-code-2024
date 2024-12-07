function parseInput() {
  const input = Deno.readTextFileSync("src/day6/input.example.txt");

  const parsed = input.split("\n").filter((el) => !!el).map((row) =>
    row.split("")
  );

  return parsed;
}

function part1() {
  const input = parseInput();

  const initialRow = input.findIndex((row, i) =>
    row.findIndex((el, j) => el === "^") > -1
  );
  const initialCol = input[initialRow].findIndex((el) => el === "^");

  let rowPosition = initialRow;
  let colPosition = initialCol;
  let rowDirection = -1;
  let colDirection = 0;
  const traveled = new Set<string>();

  let rightTurns = 0;
  let firstRightCol = -1;
  let firstRightRow = -1;

  const obstacles = new Set<string>();

  while (
    rowPosition >= 0 && rowPosition < input.length && colPosition >= 0 &&
    colPosition < input[0].length
  ) {
    traveled.add(`${rowPosition},${colPosition}`);

    let nextRowPosition = rowDirection + rowPosition;
    let nextColPosition = colDirection + colPosition;

    if (input[nextRowPosition]?.[nextColPosition] === "#") {
      // turn right
      if (rowDirection === -1 && colDirection === 0) { // up -> right
        rowDirection = 0;
        colDirection = 1;
        if (rightTurns === 0) {
          firstRightRow = rowDirection + rowPosition;
          firstRightCol = colPosition;
        } else if (rightTurns === 2) {
          // obstacles.add(`${rowPosition},${firstRightCol - 1}`); // going left
          obstacles.add(`${rowPosition},${firstRightCol + 1}`); // going right
        }
      } else if (rowDirection === 0 && colDirection === -1) { // left -> up
        rowDirection = -1;
        colDirection = 0;
        if (rightTurns === 0) {
          firstRightRow = rowPosition;
          firstRightCol = colDirection + colPosition;
        } else if (rightTurns === 2) {
          // obstacles.add(`${firstRightRow + 1},${colPosition}`); // going down
          obstacles.add(`${firstRightRow - 1},${colPosition}`); // going up
        }
      } else if (rowDirection === 0 && colDirection === 1) { // right -> down
        rowDirection = 1;
        colDirection = 0;
        if (rightTurns === 0) {
          firstRightRow = rowPosition;
          firstRightCol = colDirection + colPosition;
        } else if (rightTurns === 2) {
          // obstacles.add(`${firstRightRow - 1},${colPosition}`); // going up
          obstacles.add(`${firstRightRow + 1},${colPosition}`); // going down
        }
      } else if (rowDirection === 1 && colDirection === 0) { // down -> left
        rowDirection = 0;
        colDirection = -1;
        if (rightTurns === 0) {
          firstRightRow = rowDirection + rowPosition;
          firstRightCol = colPosition;
        } else if (rightTurns === 2) {
          // obstacles.add(`${rowPosition},${firstRightCol + 1}`); // going right
          obstacles.add(`${rowPosition},${firstRightCol - 1}`); // going left
        }
      }
      nextRowPosition = rowDirection + rowPosition;
      nextColPosition = colDirection + colPosition;

      if (rightTurns === 2) {
        rightTurns = 0;
      } else {
        rightTurns++;
      }
    }

    rowPosition = nextRowPosition;
    colPosition = nextColPosition;
  }

  console.log(traveled.size);

  console.log(obstacles);
  console.log(obstacles.size);

  return 0;
}

function part2() {
  const input = parseInput();

  // capture the 1st right turn

  // after the 3rd right turn the obstacle needs placed in the col/row of the first

  return 0;
}

class Guard {
  constructor() {
  }
}

part1();
// part2();
