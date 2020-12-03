const fs = require("fs");

const readFile = async (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

const findTrees = (path, pairs) => {
  let trees = 0;
  let space = 0;
  for (let i = 1; i < path.length; i++) {
    if (i % pairs.down === 0) {
      const row = path[i];
      const arr = row.split("");

      space += pairs.right;
      if (space >= arr.length) {
        space = space - arr.length;
      }
      if (arr[space] === "#") {
        trees++;
      }
    }
  }
  return trees;
};

(async () => {
  const file = await readFile("input.txt");

  if (file.success) {
    const arr = file.data.split("\n");
    const pairs = [
      { right: 1, down: 1 },
      { right: 3, down: 1 },
      { right: 5, down: 1 },
      { right: 7, down: 1 },
      { right: 1, down: 2 },
    ];
    const partOne = findTrees(arr, pairs[1]);
    const trees = pairs.map((pair) => findTrees(arr, pair));
    const reducer = (accumulator, currentValue) => accumulator * currentValue;
    const partTwo = trees.reduce(reducer);
    console.log({ partOne, partTwo });
  }
})();
