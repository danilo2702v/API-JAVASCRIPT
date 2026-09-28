const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let livros = [
  { id: 1, titulo: "1984", autor: "George Orwell", ano: 1949 },
  { id: 2, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954 }
];

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const livro = livros.find((livro) => livro.id === id);
  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }
  res.status(200).json(livro);
});

app.post("/livros", (req, res) => {
  const { titulo, autor, ano } = req.body;
  if (!titulo || !autor || !ano) {
    return res.status(400).json({ mensagem: "titulo, autor e ano são obrigatórios" });
  }
  const novoLivro = {
    id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
    titulo,
    autor,
    ano
  };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = livros.findIndex((livro) => livro.id === id);
  if (indice === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }
  const { titulo, autor, ano } = req.body;
  if (!titulo || !autor || !ano) {
    return res.status(400).json({ mensagem: "titulo, autor e ano são obrigatórios" });
  }
  livros[indice] = { id, titulo, autor, ano };
  res.status(200).json(livros[indice]);
});

app.delete("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = livros.findIndex((livro) => livro.id === id);
  if (indice === -1) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }
  const livroExcluido = livros.splice(indice, 1);
  res.status(200).json({ mensagem: "Livro excluído com sucesso", livro: livroExcluido[0] });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});