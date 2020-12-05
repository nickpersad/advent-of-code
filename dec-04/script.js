const fs = require("fs");

const readFile = async (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

const validateNumber = (strNumber) => {
  const regExp = new RegExp("^\\d+$");
  const isValid = regExp.test(strNumber);
  return isValid;
};

const partOne = (arr) => {
  let retVal = { partOne: 0, partTwo: 0 };
  for (let i = 0; i < arr.length; i++) {
    const passport = arr[i].replace(/\n/g, " ").split(" ");
    const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
      .slice()
      .sort();
    const fields = passport
      .flatMap((entry) => entry.split(":")[0])
      .slice()
      .sort();
    let partOneValid = false;

    if (
      (fields.includes("cid") && fields.length === 8) ||
      (!fields.includes("cid") && fields.length === 7)
    ) {
      partOneValid = true;
      let valid = false;

      for (let j = 0; j < passport.length; j++) {
        const pp = passport[j];
        const key = pp.split(":")[0];
        const value = pp.split(":")[1];

        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        if (
          key === "byr" &&
          value.length === 4 &&
          +value >= 1920 &&
          +value <= 2002
        ) {
          valid = true;
        } else if (key === "byr") {
          valid = false;
          break;
        }
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        if (
          key === "iyr" &&
          value.length === 4 &&
          +value >= 2010 &&
          +value <= 2020
        ) {
          valid = true;
        } else if (key === "iyr") {
          valid = false;
          break;
        }
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        if (
          key === "eyr" &&
          value.length === 4 &&
          +value >= 2020 &&
          +value <= 2030
        ) {
          valid = true;
        } else if (key === "eyr") {
          valid = false;
          break;
        }
        // hgt (Height) - a number followed by either cm or in:
        // If cm, the number must be at least 150 and at most 193.
        // If in, the number must be at least 59 and at most 76.
        if (
          key === "hgt" &&
          ((value.includes("cm") &&
            +value.replace("cm", "") >= 150 &&
            +value.replace("cm", "") <= 193) ||
            (value.includes("in") &&
              +value.replace("in", "") >= 59 &&
              +value.replace("in", "") <= 76))
        ) {
          valid = true;
        } else if (key === "hgt") {
          valid = false;
          break;
        }
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        if (
          key === "hcl" &&
          value.charAt(0) === "#" &&
          value.length === 7 &&
          value.match(/[^a-f0-9]/g)
        ) {
          valid = true;
        } else if (key === "hcl") {
          valid = false;
          break;
        }
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        if (
          key === "ecl" &&
          ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(value) > -1
        ) {
          valid = true;
        } else if (key === "ecl") {
          valid = false;
          break;
        }
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        if (key === "pid" && value.length === 9 && validateNumber(value)) {
          valid = true;
        } else if (key === "pid") {
          valid = false;
          break;
        }
        // cid (Country ID) - ignored, missing or not.
      }
      if (partOneValid) {
        retVal.partOne++;
      }
      if (valid) {
        retVal.partTwo++;
      }
    }
  }
  return retVal;
};

(async () => {
  const file = await readFile("input.txt");

  if (file.success) {
    const arr = file.data.split("\n\n");
    const validate = partOne(arr);

    console.log(validate);
  }
})();
