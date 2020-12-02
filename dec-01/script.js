const fs = require("fs");

const readFile = async (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

const partOne = (arr) => {
  let retVal;

  for (let i = 0; i < arr.length; i++) {
    const num = +arr[i];
    for (let j = 1; j < arr.length - 1; j++) {
      const num2 = +arr[j];
      if (num + num2 === 2020) {
        retVal = num * num2;
        break;
      }
    }
    if (retVal) {
      break;
    }
  }
  return retVal;
};

const partTwo = (arr) => {
  let retVal;

  for (let i = 0; i < arr.length; i++) {
    const num = +arr[i];
    for (let j = 1; j < arr.length - 1; j++) {
      const num2 = +arr[j];
      for (let k = 2; k < arr.length - 2; k++) {
        const num3 = +arr[k];
        if (num + num2 + num3 === 2020) {
          retVal = num * num2 * num3;
          break;
        }
      }
      if (retVal) {
        break;
      }
    }
    if (retVal) {
      break;
    }
  }
  return retVal;
};

(async () => {
  const file = await readFile("input.txt");

  if (file.success) {
    const arr = file.data.split("\n");
    const one = partOne(arr);
    const two = partTwo(arr);
    console.log({one, two});
  }
})();
