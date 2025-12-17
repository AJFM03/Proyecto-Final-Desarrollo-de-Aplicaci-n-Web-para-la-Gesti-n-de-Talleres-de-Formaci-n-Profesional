const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Servir archivos estáticos (HTML, imágenes, PDFs)
app.use(express.static(path.join(__dirname, "paginademo1")));

const DATA_PATH = path.join(__dirname, "data", "cursos.json");

function leerCursos() {
  return new Promise((resolve, reject) => {
    fs.readFile(DATA_PATH, "utf8", (err, data) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });
}

app.get("/api/cursos", async (req, res) => {
  try {
    const cursos = await leerCursos();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: "Error al leer los cursos" });
  }
});

app.get("/api/cursos/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const cursos = await leerCursos();
    const curso = cursos.find((c) => c.id === id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ error: "Error al leer los cursos" });
  }
});

// ✅ Ruta raíz para servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "paginademo1", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
