const express = require("express");
const Character = require("./characters.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allCharacters = await Character.find();
    console.log(allCharacters);
    return res.status(200).json(allCharacters);
  } catch (error) {
    return res.status(500).json("Error en el servidor");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const characterToFind = await Character.findById(id);
    console.log(characterToFind);
    return res.status(200).json(characterToFind);
  } catch (error) {
    return res.status(500).json("No se encontró el personaje");
  }
});

router.get("/findbyname/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const characterToFind = await Character.findOne({ name: name });
    console.log(characterToFind);
    return res.status(200).json(characterToFind);
  } catch (error) {
    return res.status(500).json("No se encontró el personaje");
  }
});

router.post("/create", async (req, res) => {
  try {
    const character = req.body;
    const newCharacter = new Character(character);
    const created = await newCharacter.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear el personaje");
  }
});

router.put("/modify/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const character = req.body;
    const characterModificator = new Character(character);
    characterModificator._id = id;
    const characterModified = await Character.findByIdAndUpdate(
      id,
      characterModificator
    );
    return res.status(200).json("Se ha modificado el personaje");
  } catch (error) {
    return res.status(500).json("Error al modificar el personaje");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const characterToDelete = await Character.findByIdAndRemove(id);
    return res.status(200).json("Se ha modificado el personaje");
  } catch (error) {
    return res.status(500).json("Error al modificar el personaje");
  }
});

module.exports = router;
