// Importar el paquete Express
const express = require("express");

// Crear la aplicación Express
const app = express();

//CORS para que el navegador no bloquee la solicitud
const cors = require("cors");

// Definir un puerto para el servidor
const PORT = 3000;

// Habilitar CORS
app.use(cors());

// Utilizar el módulo fs de Node.js para leer los archivos JSON
const fs = require("fs");
const path = require("path");

// Middleware para manejar JSON y datos en las solicitudes
app.use(express.json()); // Permite parsear cuerpos JSON

// Middleware para verificar rutas y depurar errores
const logPath = (req, filePath) => {
  console.log(`Ruta generada para ${req.originalUrl}: ${filePath}`);
};

// Ruta para obtener datos del carrito
app.get("/cart", (req, res) => {
  const filePath = path.join(__dirname, "emercado-api", "cart", "buy.json");
  logPath(req, filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo del carrito:", err.message);
      return res.status(500).send("Error al leer el archivo del carrito");
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para obtener todas las categorías
app.get("/categories", (req, res) => {
  const filePath = path.join(__dirname, "emercado-api", "cats", "cat.json");
  logPath(req, filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo de categorías:", err.message);
      return res.status(500).send("Error al leer el archivo de categorías");
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para obtener productos específicos por ID
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(
    __dirname,
    "emercado-api",
    "products",
    `${id}.json`
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(
        `Error al leer el archivo para el producto con ID ${id}:`,
        err.message
      );
      return res.status(404).send("Producto no encontrado");
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para obtener productos de una categoría específica por catID
app.get("/cats_products/:catID", (req, res) => {
  const { catID } = req.params;
  const filePath = path.join(
    __dirname,
    "emercado-api",
    "cats_products",
    `${catID}`
  );

  console.log(
    `Ruta generada para obtener productos de categoría ${catID}:`,
    filePath
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(
        `Error al leer el archivo para la categoría con ID ${catID}:`,
        err.message
      );
      return res.status(404).send("Categoría no encontrada");
    }

    res.json(JSON.parse(data));
  });
});

// Ruta para obtener comentarios de un producto por su ID
app.get("/products_comments/:id", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(
    __dirname,
    "emercado-api",
    "products_comments",
    `${id}.json`
  );

  console.log(
    `Ruta generada para obtener comentarios del producto ${id}:`,
    filePath
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(
        `Error al leer el archivo de comentarios para el producto con ID ${id}:`,
        err.message
      );
      return res
        .status(404)
        .send("Comentarios no encontrados para este producto");
    }

    res.json(JSON.parse(data));
  });
});

// Ruta para obtener las publicaciones en venta
app.get("/sell", (req, res) => {
  const filePath = path.join(__dirname, "emercado-api", "sell", "publish.json");

  console.log(`Ruta generada para las publicaciones en venta:`, filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo de publicaciones:", err.message);
      return res.status(500).send("Error al leer el archivo de publicaciones");
    }

    res.json(JSON.parse(data));
  });
});

// Ruta para obtener los datos del carrito del usuario
app.get("/user_cart", (req, res) => {
  const filePath = path.join(
    __dirname,
    "emercado-api",
    "user_cart",
    "25801.json"
  );

  console.log(`Ruta generada para el carrito del usuario:`, filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(
        "Error al leer el archivo del carrito del usuario:",
        err.message
      );
      return res
        .status(500)
        .send("Error al leer el archivo del carrito del usuario");
    }

    res.json(JSON.parse(data));
  });
});

// Ruta de prueba genérica para verificar si las rutas están funcionando
app.get("/test", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
