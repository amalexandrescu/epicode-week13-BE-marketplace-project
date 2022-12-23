import express from "express";
import uniqid from "uniqid";
import { getProducts, writeProducts } from "../../library/fs-tools.js";
import httpErrors from "http-errors";
import {
  checksProductsSchema,
  checksReviewSchema,
  triggerBadRequest,
} from "./validator.js";
const { NotFound, Unauthorized, BadRequest } = httpErrors;

const productsRouter = express.Router();

export default productsRouter;

//POST

productsRouter.post(
  "/",
  checksProductsSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newProduct = {
        ...req.body,
        id: uniqid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const productsArray = await getProducts();
      productsArray.push(newProduct);
      await writeProducts(productsArray);
      res.status(201).send({ newProduct: newProduct.id });
    } catch (error) {
      next(error);
      // console.log("post error");
    }
  }
);

//GET

productsRouter.get("/", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    res.send(productsArray);
    console.log("this is the simple get method");
  } catch (error) {
    next(error);
    // console.log("get error");
  }
});

//GET single product

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    const singleProduct = productsArray.find(
      (product) => product.id === req.params.productId
    );
    if (singleProduct) {
      res.send(singleProduct);
    } else {
      next(NotFound(`Blog post with id ${req.params.productId} not found!`));
    }
  } catch (error) {
    next(error);
    // console.log("get single error");
  }
});

//PUT

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    const index = productsArray.findIndex(
      (product) => product.id === req.params.productId
    );
    if (index !== -1) {
      const oldProduct = productsArray[index];
      const updatedProduct = {
        ...oldProduct,
        ...req.body,
        updatedAt: new Date(),
      };
      productsArray[index] = updatedProduct;
      await writeProducts(productsArray);
      res.send(updatedProduct);
    } else {
      next(NotFound(`Products with id ${req.params.productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

//DELETE
productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const productsArray = await getProducts();
    const remainingProducts = productsArray.filter(
      (product) => product.id !== req.params.productId
    );
    if (productsArray.length !== remainingProducts.length) {
      await writeProducts(remainingProducts);
      res.status(204).send();
    } else {
      next(NotFound(`Product with id ${req.params.productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.post(
  "/:productId/reviews",
  checksReviewSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const productsArray = await getProducts();
      const index = productsArray.findIndex(
        (product) => product.id === req.params.productId
      );
      if (index !== -1) {
        const review = {
          ...req.body,
          createdAt: new Date(),
          id: uniqid(),
          productId: req.params.productId,
        };
        const oldProduct = productsArray[index];
        const updatedProduct = {
          ...oldProduct,
          reviews: review,
          updatedAt: new Date(),
        };
        productsArray[index] = updatedProduct;
        await writeProducts(productsArray);
        res.status(201).send({ newProduct: updatedProduct.reviews });
      } else {
        res.send({ message: "we didn't find any product with this id" });
      }
    } catch (error) {
      next(error);
    }
  }
);
