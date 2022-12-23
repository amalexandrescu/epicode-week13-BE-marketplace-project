import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const productsSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "name is a mandatory field and needs to be a string!",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage:
        "description is a mandatory field and needs to be a string!",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "brand is a mandatory field and needs to be a string!",
    },
  },
  imageUrl: {
    in: ["body"],
    isString: {
      errorMessage: "imageUrl is a mandatory field and needs to be a string!",
    },
  },
  price: {
    in: ["body"],
    isNumeric: {
      errorMessage: "price is a mandatory field and needs to be a number",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "category is a mandatory field and it must be a string",
    },
  },
};

export const checksProductsSchema = checkSchema(productsSchema); //middleware

// export const triggerBadRequest = (req, res, next) => {
//   // 1. Check if previous middleware ( checksBlogPostSchema) has detected any error in req.body

//   const errors = validationResult(req);
//   console.log(errors.array());

//   if (!errors.isEmpty()) {
//     // 2.1 If we have any error --> trigger error handler 400
//     next(createHttpError(400, "Errors during product post validation"), {
//       errorsList: errors.array(),
//     });
//   } else {
//     // 2.2 Else (no errors) --> normal flow (next)
//     next();
//   }
// };

//middleware

// {
//   "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
//   "name": "3310",  //REQUIRED
//   "description": "somthing longer", //REQUIRED
//   "brand": "nokia", //REQUIRED
//   "imageUrl":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
//   "price": 100, //REQUIRED
//   "category": "smartphones" //REQUIRED
//   "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
//   "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
// }

const reviewSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "comment is a mandatory field and it must be a string",
    },
  },
  rate: {
    in: ["body"],
    isNumeric: {
      errorMessage: "rate is a mandatory field and it must be a number",
    },
  },
};

export const checksReviewSchema = checkSchema(reviewSchema);

export const triggerBadRequest = (req, res, next) => {
  // 1. Check if previous middleware ( checksBlogPostSchema) has detected any error in req.body

  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    // 2.1 If we have any error --> trigger error handler 400
    next(createHttpError(400, "Errors during product post validation"), {
      errorsList: errors.array(),
    });
  } else {
    // 2.2 Else (no errors) --> normal flow (next)
    next();
  }
};

// {
//   "_id": "123455", //SERVER GENERATED
//   "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
//   "rate": 3, //REQUIRED, max 5
//   "productId": "5d318e1a8541744830bef139", //REQUIRED
//   "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
// }
