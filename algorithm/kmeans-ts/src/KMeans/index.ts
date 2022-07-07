import * as settings from "./setting";

class KMeans {
  K?: number;
  datas?: number[][];
  clusters?: number[][];

  setDatas!: () => void;
  setInit!: () => void;
}

KMeans.prototype.setDatas = settings.setDatas;
KMeans.prototype.setInit = settings.setInit;

export default KMeans;
