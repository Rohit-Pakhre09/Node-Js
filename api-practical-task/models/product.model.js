import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, trim: true, required: true },
    category: { type: String, trim: true, required: true },
    brand: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    description: { type: String, trim: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
