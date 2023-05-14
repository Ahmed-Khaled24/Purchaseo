import { Router } from "express";

import {
    addNewProduct,
    deleteProduct,
    getProductById,
    updateProduct,
} from "../controller/products.controller";
import {
    authorize,
    mwCheckIsCurrentUser,
    mwCheckLoginStatus,
} from "../middlewares/auth/user.middleware";
import { validateProductDate } from "../middlewares/validation/productValidation.middleware";

const productRouter = Router();
// TODO: do del and up check seller "^^" problem
productRouter
    .post(
        "/",
        mwCheckLoginStatus("loggedIn"),
        authorize("Seller"),
        validateProductDate(true),
        addNewProduct
    )
    .patch(
        "/",
        mwCheckLoginStatus("loggedIn"),
        authorize("Seller"),
        validateProductDate(false),
        updateProduct
    )
    .get("/:id", getProductById)
    .delete(
        "/:id",
        mwCheckLoginStatus("loggedIn"),
        authorize("Seller"),
        deleteProduct
    );

export default productRouter;
