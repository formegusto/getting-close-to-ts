import _ from "lodash";

class IterableFrame implements Iterable<number> {
  private _numbers = _.map(new Array(10), (number, idx) => idx);

  run() {
    for (const number of this) console.log(number);
  }

  [Symbol.iterator]() {
    let nextIndex = 0;
    return {
      next: () => {
        return {
          value: this._numbers[nextIndex++],
          done: nextIndex >= this._numbers.length,
        };
      },
    };
  }
}

new IterableFrame().run();
