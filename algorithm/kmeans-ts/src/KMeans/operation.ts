import _ from "lodash";

export function ruleOfThumbs(size: number): number {
  return _.round(Math.sqrt(size / 2));
}

export function euclideanDistance(X: number[], Y: number[]): number {
  // 제곱 오차
  const err = _.zipWith(X, Y, (x, y) => {
    return (x - y) ** 2;
  });
  // 합
  const sum = _.sum(err);
  // 루트
  const euc = Math.sqrt(sum);

  return euc;
}
