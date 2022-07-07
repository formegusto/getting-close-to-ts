class KMeans implements Iterable<number> {
  private _numbers = [1, 2, 3, 3, 4, 5];
  constructor() {}

  run() {
    for (const num of this) {
      console.log(num);
    }
  }

  [Symbol.iterator]() {
    let nextIndex = 0;
    return {
      next: () => {
        return {
          value: this._numbers[nextIndex++],
          done: nextIndex > this._numbers.length,
        };
      },
    };
  }
}

export default KMeans;
