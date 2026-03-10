import express from "express";
import { addItem, getItems, updateItem, deleteItem, getLowStockItems, getInventoryStats} from "../controllers/itemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addItem);
router.get("/", authMiddleware, getItems);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);
router.get("/low-stock", authMiddleware, getLowStockItems);
router.get("/stats", authMiddleware, getInventoryStats);

export default router;