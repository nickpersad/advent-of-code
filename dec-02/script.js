const fs = require("fs");

const readFile = async (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

const validate = (rules) => {
  let valid = { partOne: 0, partTwo: 0 };
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const segments = rule.split(" ");
    const constaint = segments[0];
    const lowest = +constaint.split("-")[0];
    const highest = +constaint.split("-")[1];
    const letter = segments[1].replace(":", "");
    const string = segments[2];
    const stringArr = string.split("");

    const count = (string.match(new RegExp(letter, "g")) || []).length;

    if (count >= lowest && count <= highest) {
      valid.partOne++;
    }

    if (
      (stringArr[lowest - 1] === letter || stringArr[highest - 1] === letter) &&
      stringArr[lowest - 1] !== stringArr[highest - 1]
    ) {
      valid.partTwo++;
    }
  }
  return valid;
};

(async () => {
  const file = await readFile("input.txt");

  if (file.success) {
    const arr = file.data.split("\n");
    const valid = validate(arr);

    console.log(valid);
  }
})();
