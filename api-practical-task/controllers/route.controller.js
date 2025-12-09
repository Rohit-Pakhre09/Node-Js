import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchByProductName = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.find({ productName: { $regex: name, $options: 'i' } });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchByBrand = async (req, res) => {
    try {
        const { brand } = req.query;
        const products = await Product.find({ brand: { $regex: brand, $options: 'i' } });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchByMultipleFields = async (req, res) => {
    try {
        const { productName, category, brand } = req.query;
        const query = {};
        if (productName) query.productName = { $regex: productName, $options: 'i' };
        if (category) query.category = { $regex: category, $options: 'i' };
        if (brand) query.brand = { $regex: brand, $options: 'i' };
        const products = await Product.find(query);
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const products = await Product.find({ category: { $regex: category, $options: 'i' } });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const filterByPriceRange = async (req, res) => {
    try {
        const { min, max } = req.query;
        const query = {};
        if (min) query.price = { ...query.price, $gte: parseFloat(min) };
        if (max) query.price = { ...query.price, $lte: parseFloat(max) };
        const products = await Product.find(query);
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const filterByRating = async (req, res) => {
    try {
        const { rating } = req.query;
        const products = await Product.find({ rating: { $gte: parseFloat(rating) } });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(products);
    } catch (error) {
        res.status(200).status(500).json({ message: error.message });
    }
};

export const sortByPrice = async (req, res) => {
    try {
        const { order = 'asc' } = req.query;
        const sortOrder = order === 'desc' ? -1 : 1;
        const products = await Product.find().sort({ price: sortOrder });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(products);
    } catch (error) {
        res.status(200).status(500).json({ message: error.message });
    }
};

export const getProductsWithPagination = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const products = await Product.find().skip(skip).limit(parseInt(limit));
        const total = await Product.countDocuments();
        const totalPages = Math.ceil(total / parseInt(limit));
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({
            products,
            total,
            totalPages,
            currentPage: parseInt(page),
            limit: parseInt(limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { productName, category, brand, price, rating, description } = req.body;

        if (!productName || !category || !brand || price === undefined || rating === undefined) {
            return res.status(400).json({ message: "Missing required fields: productName, category, brand, price, rating" });
        }

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" });
        }

        if (price < 0) {
            return res.status(400).json({ message: "Price must be a positive number" });
        }

        const newProduct = new Product({
            productName,
            category,
            brand,
            price,
            rating,
            description
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
