import { Router } from "express"
import {
  createProduct,
  deleteProduct,
  getProductImageFromMeli,
  getShoppingList,
  listProducts,
  sellProduct,
  updateProduct
} from "../controllers/productController"
import { authMiddleware } from "../middlewares/authMiddleware"

const productRoutes = Router()

productRoutes.use(authMiddleware)

productRoutes.get("/", listProducts)
productRoutes.get("/lista-compras", getShoppingList)
productRoutes.post("/", createProduct)
productRoutes.post("/:id/vender", sellProduct)
productRoutes.put("/:id", updateProduct)
productRoutes.delete("/:id", deleteProduct)
productRoutes.post("/image-search", getProductImageFromMeli)

export default productRoutes
