function parseInput() {
  const input = Deno.readTextFileSync("src/day5/input.txt");

  const parsed = input.split("\n\n");

  return parsed;
}

function part1() {
  const input = parseInput();

  const rules = input[0].split("\n");
  const updates = input[1].split("\n").filter((el) => !!el).map((el) =>
    el.split(",")
  );

  const ruleSet = new Map<string, Set<string>>();

  rules.forEach((rule) => {
    const split = rule.split("|");

    ruleSet.set(
      split[0],
      ruleSet.get(split[0])?.add(split[1]) ?? new Set<string>().add(split[1]),
    );
  });

  const ans = updates.reduce((acc, curr) => {
    const passes = curr.every((val, i) => {
      return checkRules(val, curr.slice(0, i), ruleSet);
    });

    const middleEl = curr[Math.floor(curr.length / 2)];

    if (passes) {
      return acc + parseInt(middleEl);
    }

    return acc;
  }, 0);

  console.log(ans);

  return 0;
}

function checkRules(
  el: string,
  before: string[],
  ruleSet: Map<string, Set<string>>,
) {
  // look up the rules and get back the values it must be before
  // check the array of values before, if exists then fail

  const rules = ruleSet.get(el);

  if (before.some((el) => rules?.has(el))) {
    return false;
  }

  return true;
}

function part2() {
  const input = parseInput();

  const rules = input[0].split("\n");
  const updates = input[1].split("\n").filter((el) => !!el).map((el) =>
    el.split(",")
  );

  const ruleSet = new Map<string, Set<string>>();

  rules.forEach((rule) => {
    const split = rule.split("|");

    ruleSet.set(
      split[0],
      ruleSet.get(split[0])?.add(split[1]) ?? new Set<string>().add(split[1]),
    );
  });

  let passingCount = 0;
  const ans = updates.reduce((acc, curr) => {
    const passes = curr.every((val, i) => {
      return checkRules(val, curr.slice(0, i), ruleSet);
    });

    if (passes) {
      passingCount += parseInt(curr[Math.floor(curr.length / 2)]);
      return acc;
    }

    const fixed = fixOrder(curr, ruleSet);

    const middleEl = fixed[Math.floor(fixed.length / 2)];

    return acc + parseInt(middleEl);
  }, 0);

  console.log(ans);

  return 0;
}

function fixOrder(row: string[], ruleSet: Map<string, Set<string>>) {
  // take the element, if the lookup set has the val, swap
  const copy = [...row];

  let updating = true;
  let restart = false;
  while (updating) {
    restart = false;
    copy.forEach((el, i) => {
      if (restart) {
        return;
      }
      const outOfOrder = copy.slice(0, i).findIndex((beforeEl) =>
        ruleSet.get(el)?.has(beforeEl)
      );
      if (outOfOrder >= 0) {
        // swap the two
        const el1 = copy[i];
        const el2 = copy[outOfOrder];

        copy[i] = el2;
        copy[outOfOrder] = el1;
        restart = true;
      } else if (i === copy.length - 1 && !restart) {
        updating = false;
      }
    });
  }
  return copy;
}

part1();
part2();
