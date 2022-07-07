import _ from "lodash";

export function ruleOfThumbs(size: number): number {
  return _.round(Math.sqrt(size / 2));
}
