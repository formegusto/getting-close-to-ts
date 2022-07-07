import KMeans from "./KMeans";

const kmeans = new KMeans();

kmeans.setInit();
console.log(kmeans.datas);
console.log("K", kmeans.K);
console.log(kmeans.clusters);
