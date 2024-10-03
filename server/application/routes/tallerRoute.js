const express = require ('express');
const WorkshopController = require('../controllers/tallerController')
const WorkshopValidator = require('../validator/tallerValidator');


const router = express.Router()
const workshopController = new WorkshopController();
const workshopValidator = new WorkshopValidator();


router.get('/getWorkshopWithArtesanoName',workshopValidator.getWAllWorkshopsWithTeacherNameControllerValidator(),(req, res)=> workshopController.getWAllWorkshopsWithTeacherNameController(req,res))
router.get('/:id',workshopValidator.validateAspecificWorkshopDataEmpty(),(req, res)=> workshopController.getAspecificWorkshop(req, res))
router.get('/searchForArtesano/:id', workshopValidator.validateAspecificWorkshopDataEmpty(), (req, res)=> workshopController.getWorkshoForIdUser(req, res))
router.post('/postingAWorkshop',workshopValidator.validatingWorkshopData(), (req, res) => workshopController.creatingAWorkshop(req, res))
router.delete('/:id',workshopValidator.workshopDeleter(),(req,res)=>workshopController.deleteWorkshop(req, res));
router.put('/:id',workshopValidator.validateUpdateWorkshopsById(),(req,res)=>workshopController.updatingWorkshops(req,res));






module.exports = router;

