const express = require('express');
const TallerController = require("../controllers/tallerController")
const TallerValidator = require("../validator/tallerValidator")

const router = express.Router()
const tallerController = new TallerController();
const tallerValidator = new TallerValidator();

router.get("/searchAll", tallerValidator.validateTallerDataEmpty (), (req, res) => tallerController.getAllTalleres(req, res))





module.exports = router;