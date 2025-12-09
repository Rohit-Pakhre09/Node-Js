import express from "express";
import {
    getAllProducts,
    getProductById,
    searchByProductName,
    searchByBrand,
    searchByMultipleFields,
    getProductsByCategory,
    filterByPriceRange,
    filterByRating,
    sortByPrice,
    getProductsWithPagination,
    createProduct
} from "../controllers/route.controller.js";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/products/search/name", searchByProductName);
router.get("/products/search/brand", searchByBrand);
router.get("/products/search/multiple", searchByMultipleFields);
router.get("/products/category", getProductsByCategory);
router.get("/products/filter/price", filterByPriceRange);
router.get("/products/filter/rating", filterByRating);
router.get("/products/sort/price", sortByPrice);
router.get("/products/pagination", getProductsWithPagination);

export default router;
