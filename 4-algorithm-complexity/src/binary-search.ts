function binarySearch(sortedArr: number[], seekElement: number) {
  let startIndex = 0;
  let endIndex = sortedArr.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    if (sortedArr[middleIndex] == seekElement) {
      return seekElement;
    }

    if (sortedArr[middleIndex] < seekElement) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
}

function createArray(count: number) {
  const array: number[] = [];
  for (let i = 0; i < count; i++) {
    array.push(i * 2);
  }
  return array;
}

function measureTime(cb) {
  let start = Date.now();
  const result = cb();
  let end = Date.now();

  return {
    result,
    time: end - start,
  };
}

const array = createArray(50_000_000);

const searchValue = 1000_000_000;

let { result: result1, time: time1 } = measureTime(() => {
  return array.some((v) => v === searchValue);
});

console.log("result", result1);
console.log("time", time1);

let { result: result2, time: time2 } = measureTime(() => {
  return binarySearch(array, searchValue);
});

console.log("result", result2);
console.log("time", time2);
