import * as settings from "./setting";

class KMeans {
  K?: number;
  datas?: number[][];
  clusters?: number[][];

  setInit!: () => void;
}

KMeans.prototype.setInit = settings.setInit;

export default KMeans;
