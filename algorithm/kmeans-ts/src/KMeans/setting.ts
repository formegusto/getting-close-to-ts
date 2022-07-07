import _ from "lodash";
import KMeans from ".";
import { ruleOfThumbs } from "./operation";

function setDatas(this: KMeans) {
  this.datas = Array.from(
    {
      length: 100,
    },
    () => [_.random(0, 100), _.random(0, 100)]
  );
  this.K = ruleOfThumbs(_.size(this.datas));
}

function setClusters(this: KMeans) {
  if (this.datas && this.K) this.clusters = _.sampleSize(this.datas, this.K);
}

export function setInit(this: KMeans) {
  setDatas.apply(this);
  setClusters.apply(this);
}
