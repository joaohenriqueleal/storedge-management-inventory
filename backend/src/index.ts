import cors from "cors"
import express from "express"
import authRoutes from "./routes/auth.routes"
import categoryRoutes from "./routes/categories.routes"
import comboRoutes from "./routes/combos.routes"
import productRoutes from "./routes/products"

const app = express()
app.use(cors())
app.use(express.json())

// Rota básica só pra testar
app.get("/", (_, res) => {
  res.send("Servidor funcionando 🚀")
})

app.use("/auth", authRoutes)
app.use("/categorias", categoryRoutes)
app.use("/produtos", productRoutes)
app.use("/combos", comboRoutes)

app.listen(3000, () => {
  console.log("Backend rodando na porta 3000")
})
