import { Router } from "express";
import { auth, login, logout, register } from "./controller/user-controller.js";
import { authMiddleware } from "./middlewares/auth.js";
import { deleteProduct, getProducts } from "./controller/product-controller.js";
import {
  getCartItems,
  createCartItem,
} from "./controller/cartItem-controller.js";

export const router = Router();

// Rotas de usuário
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

// Rota de produto
router.get("/get-products", getProducts);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

// Cart
router.get("/get-cart-items", authMiddleware, getCartItems);
router.post("/create-cart-item", authMiddleware, createCartItem);
