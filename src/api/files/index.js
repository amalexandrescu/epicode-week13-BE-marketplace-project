import express from "express";
import multer from "multer";
import { extname } from "path";
import {
  saveProductPicture,
  getProducts,
  writeProducts,
} from "../../library/fs-tools.js";

const filesRouter = express.Router();

filesRouter.post(
  "/:id/upload",
  multer().single("picture"),
  async (req, res, next) => {
    // "avatar" needs to match exactly to the name of the field appended in the FormData object coming from the FE
    // If they do not match, multer will not find the file
    try {
      const originalFileExtension = extname(req.file.originalname);
      const fileName = req.params.id + originalFileExtension;

      await saveProductPicture(fileName, req.file.buffer);

      const url = `http://localhost:3001/img/products/${fileName}`;
      console.log("url", url);

      const productsArray = await getProducts();

      const index = productsArray.findIndex(
        (product) => product.id === req.params.id
      );
      if (index !== -1) {
        const oldProduct = productsArray[index];
        // const author = { ...oldBlogPost.author, avatar: url };
        const updatedProduct = {
          ...oldProduct,
          imageUrl: url,
          updatedAt: new Date(),
        };

        productsArray[index] = updatedProduct;

        await writeProducts(productsArray);
      }

      res.send("File uploaded");
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
