import { Router } from "express";
import { getAllCategories } from "../controller/categories.controller";
const { getProductsWithCategory, addCategory, getProductsWithName } = require("../controller/categories.controller");
const categoryRouter = Router();

categoryRouter.get("/", getProductsWithCategory); // query parameters {category}
categoryRouter.post("/", addCategory);
categoryRouter.get("/search", getProductsWithName); // search query parameter {name}
categoryRouter.get("/all", getAllCategories);

export default categoryRouter;
