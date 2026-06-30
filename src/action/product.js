"use server";

import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export const getProducts = async () => {
  try {
    await connectDB();
    const products = await Product.find({}).lean();
    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addProduct = async (productData) => {
  try {
    await connectDB();
    const count = await Product.countDocuments();
    if (count >= 8) {
      return {
        success: false,
        message: "You can only add 8 featured products.",
      };
    }
    const product = await Product.create(productData);
    return {
      success: true,
      message: "Product added successfully.",
      id: product._id.toString(),
    };
  } catch (error) {
    console.error("Failed to add product:", error);
    return { success: false, message: "Failed to add product." };
  }
};

export const deleteProduct = async (id) => {
  try {
    await connectDB();
    const result = await Product.findByIdAndDelete(id);
    if (result) {
      return { success: true, message: "Product deleted successfully." };
    }
    return { success: false, message: "Product not found." };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, message: "Failed to delete product." };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      return { success: false, message: "Product not found." };
    }
    Object.assign(product, productData);
    await product.save();
    return { success: true, message: "Product updated successfully." };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, message: "Failed to update product." };
  }
};
