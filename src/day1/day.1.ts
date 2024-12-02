function parseInput() {
    const input = Deno.readTextFileSync("src/day1/input.txt");

    const parsed = input.split("\n").filter((el) => !!el);

    return parsed;
}

function part1() {
    const input = parseInput();

    const list1 = input.map((el) => parseInt(el.split("   ")[0])).toSorted();
    const list2 = input.map((el) => parseInt(el.split("   ")[1])).toSorted();

    const reduced = list1.reduce((acc, curr, i) => {
        const val = Math.abs(curr - list2[i]);
        return acc + val;
    }, 0);

    console.log(reduced);

    return 0;
}

function part2() {
    const input = parseInput();

    const list1 = input.map((el) => parseInt(el.split("   ")[0]));
    const list2Dict = input.map((el) => parseInt(el.split("   ")[1])).reduce(
        (acc, curr) => {
            if (acc[curr]) {
                acc[curr] += 1;
            } else {
                acc[curr] = 1;
            }

            return acc;
        },
        {} as { [key: number]: number },
    );

    const ans = list1.reduce((acc, curr) => {
        // similarity score
        const score = (list2Dict[curr] ?? 0) * curr;
        return acc + score;
    }, 0);

    console.log(ans);

    return 0;
}

part1();
part2();
