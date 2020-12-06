const fs = require("fs");

const readFile = async (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

const boardingPasses = (arr) => {
  let retVal = { maxSeatId: 0, seatIds: [] };
  const seatIds = [];

  for (let i = 0; i < arr.length; i++) {
    const pass = arr[i];
    const rows = Array.apply(null, Array(128)).map(function (x, i) {
      return i;
    });
    const columns = Array.apply(null, Array(8)).map(function (x, i) {
      return i;
    });
    let newRow = rows;
    let newColumn = columns;

    for (let j = 0; j < 7; j++) {
      const half = Math.ceil(newRow.length / 2);

      newRow =
        pass[j] === "F"
          ? newRow.splice(0, half)
          : newRow.splice(half, newRow.length - 1);

      if (newRow.length === 1) {
        break;
      }
    }
    for (let k = 7; k < pass.length; k++) {
      const half = Math.ceil(newColumn.length / 2);

      newColumn =
        pass[k] === "L"
          ? newColumn.splice(0, half)
          : newColumn.splice(half, newColumn.length - 1);

      if (newColumn.length === 1) {
        break;
      }
    }
    const seatId = newRow[0] * 8 + newColumn[0];
    seatIds.push(seatId);

    retVal.seatIds.push(seatId);
  }

  retVal.maxSeatId = Math.max(...seatIds);

  return retVal;
};

const seating = (seatIds) => {
  seatIds.sort((a, b) => {
    return a - b;
  });
  let missingSeat = null;
  let [prev] = seatIds;

  for (let i = 1; i < seatIds.length - 1; i++) {
    let seatId = seatIds[i];

    if (prev !== seatId -1) {
      missingSeat = seatId - 1;
      break;
    }
    prev += 1;
  }
  return missingSeat;
};

(async () => {
  const file = await readFile("input.txt");

  if (file.success) {
    const arr = file.data.split("\n");
    const partOne = boardingPasses(arr);
    const partTwo = seating(partOne.seatIds);
    

    console.log({ partOne, partTwo });
  }
})();
