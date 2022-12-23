import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, writeFile } = fs;

// const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const publicFolderPath = join(process.cwd(), "./public/img/products");

// console.log("ROOT OF THE PROJECT:", process.cwd());
// console.log("PUBLIC FOLDER:", publicFolderPath);

// console.log("DATA FOLDER PATH: ", dataFolderPath);
// const blogPostsJSONPath = join(dataFolderPath, "blogposts.json");
// console.log("blogPostsJSONPath", blogPostsJSONPath);

const productsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/products.json"
);
console.log(productsJSONPath);

export const getProducts = () => readJSON(productsJSONPath);
export const writeProducts = (productsArray) =>
  writeJSON(productsJSONPath, productsArray);

export const saveProductPicture = (fileName, contentAsABuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsABuffer);
