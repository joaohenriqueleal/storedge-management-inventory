import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
<<<<<<< HEAD
import categoryRoutes from "./routes/categories.routes";
import productRoutes from "./routes/products.routes";
import comboRoutes from "./routes/combos.routes";
=======
>>>>>>> 3dd0457fa8668a1fad05830a3e22e2b31c3ef9dd

const app = express();
app.use(cors());
app.use(express.json());
<<<<<<< HEAD

=======
app.use("/auth", authRoutes);
>>>>>>> 3dd0457fa8668a1fad05830a3e22e2b31c3ef9dd

// rota básica só pra testar
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

<<<<<<< HEAD
app.use("/auth", authRoutes);
app.use("/categorias", categoryRoutes);
app.use("/produtos", productRoutes);
app.use("/combos", comboRoutes);

=======
//rota para listar produtos
app.get("/produtos/:id", (req, res) => {
  const { id } = req.params; // pega o ID da URL
  const produtos = [
    { id: 1, nome: "Produto 1", preco: 10.99 },
    { id: 2, nome: "Produto 2", preco: 19.99 },
    { id: 3, nome: "Produto 3", preco: 29.99 },
  ];

  // procura o produto pelo ID
  const produto = produtos.find((p) => p.id === Number(id));

  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;
  const novoProduto = { id: Date.now(), nome, preco };
  // Salvaria no banco de dados
  res.status(201).json(novoProduto);
});
app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  const produtoAtualizado = { id: Number(id), nome, preco };
  res.json(produtoAtualizado);
});
app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Produto ${id} removido com sucesso` });
});

app.use("/auth", authRoutes);
>>>>>>> 3dd0457fa8668a1fad05830a3e22e2b31c3ef9dd

app.listen(3000, () => {
  console.log("Backend rodando na porta 3000");
});
