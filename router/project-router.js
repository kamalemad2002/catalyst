const express = require('express');
const currentUser=require('../middleware/currnetRole')
const router = express.Router();
const projectController = require('../controller/project-controller');
const { validationSchema } = require('../middleware/validationSchema');

router.route('/')
            .get(projectController.getAllProjects)
            .post(validationSchema(),projectController.addProject)
router.route('/:id')
            .get(projectController.getProject)
            .patch(projectController.updateProject)
            .delete( currentUser.userRoleCheck(["investor"]),projectController.deleteProject)
module.exports = router;