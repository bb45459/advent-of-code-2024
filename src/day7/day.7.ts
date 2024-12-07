function parseInput() {
  const input = Deno.readTextFileSync("src/day7/input.txt");

  const parsed = input.split("\n").filter((el) => !!el);

  return parsed;
}

function part1() {
  const input = parseInput();

  const ans = input.reduce((acc, curr) => {
    const total = parseInt(curr.split(": ")[0]);
    const sequence = curr.split(": ")[1].split(" ").map(Number);

    const len = sequence.length;
    const operations = Math.pow(2, len - 1);

    for (let i = 0; i < operations; i++) {
      // get the binary string rep of i
      const ops = (i >> 0).toString(2).split("");

      // pad with zeros
      while (ops.length < len - 1) {
        ops.unshift("0");
      }

      const optionTotal = sequence.reduce((optionAcc, el, j) => {
        if (j === 0) {
          return el;
        }
        if (ops[j - 1] === "0") {
          return optionAcc + el;
        } else if (ops[j - 1] === "1") {
          return optionAcc * el;
        }
        return optionAcc;
      }, 0);

      if (optionTotal === total) {
        return acc + optionTotal;
      }
    }

    return acc;
  }, 0);

  console.log(ans);

  return 0;
}

function part2() {
  const input = parseInput();

  const ans = input.reduce((acc, curr) => {
    const total = parseInt(curr.split(": ")[0]);
    const sequence = curr.split(": ")[1].split(" ").map(Number);

    const len = sequence.length;
    const operations = Math.pow(3, len - 1);

    for (let i = 0; i < operations; i++) {
      // get the trinary string rep of i
      const ops = (i >> 0).toString(3).split("");

      // pad with zeros
      while (ops.length < len - 1) {
        ops.unshift("0");
      }

      const optionTotal = sequence.reduce((optionAcc, el, j) => {
        if (j === 0) {
          return el;
        }
        if (ops[j - 1] === "0") {
          return optionAcc + el;
        } else if (ops[j - 1] === "1") {
          return optionAcc * el;
        } else if (ops[j - 1] === "2") {
          return parseInt(`${optionAcc}${el}`);
        }
        return optionAcc;
      }, 0);

      if (optionTotal === total) {
        return acc + optionTotal;
      }
    }

    return acc;
  }, 0);

  console.log(ans);

  return 0;
}

part1();
part2();
