import KMeans from "./KMeans";

const kmeans = new KMeans();

kmeans.setDatas();
console.log(kmeans.datas);
console.log("K", kmeans.K);

kmeans.setInit();
console.log(kmeans.clusters);
