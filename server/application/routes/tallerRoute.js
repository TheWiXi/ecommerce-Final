const express = require ('express');
const WorkshopController = require('../controllers/tallerController')
const WorkshopValidator = require('../validator/tallerValidator');


const router = express.Router()
const workshopController = new WorkshopController();
const workshopValidator = new WorkshopValidator();

router.get('/getAllWorkshops',workshopValidator.validateWorkshopDataEmpty(),(req, res) => workshopController.getWorksh(req, res))

router.get('/:id',workshopValidator.validateAspecificWorkshopDataEmpty(),(req, res)=> workshopController.getAspecificWorkshop(req, res))

module.exports = router;
