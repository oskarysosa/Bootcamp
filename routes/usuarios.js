const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener usuarios que cumplen con un query específico
router.get('/buscar', async (req, res) => {
  const { campo, valor } = req.query;

  try {
    const usuarios = await Usuario.find({ [campo]: valor });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modificar un usuario que cumple con una condición específica
router.put('/modificar/:id', async (req, res) => {
  const { id } = req.params;
  const { campo, nuevoValor } = req.body;

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      // Si no se encuentra, crear un nuevo documento
      const nuevoUsuario = new Usuario({ [campo]: nuevoValor });
      await nuevoUsuario.save();
      res.status(201).json(nuevoUsuario);
    } else {
      // Si se encuentra, modificar el documento existente
      usuario[campo] = nuevoValor;
      await usuario.save();
      res.status(200).json(usuario);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar usuarios que cumplen con un query específico
router.delete('/eliminar', async (req, res) => {
  const { campo, valor } = req.query;

  try {
    const resultado = await Usuario.deleteMany({ [campo]: valor });

    if (resultado.deletedCount === 0) {
      // Si no se encuentra ningún documento, no hacer nada
      res.status(204).send();
    } else {
      // Si se encuentran documentos, devolver éxito
      res.status(200).json({ message: 'Documentos eliminados exitosamente' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
