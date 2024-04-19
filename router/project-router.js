const express = require('express');
const router = express.Router();
const projectController = require('../controller/project-controller');
const { validationSchema } = require('../middleware/validationSchema');

router.route('/')
            .get(projectController.getAllProjects)
            .post(validationSchema(),projectController.addProject)
router.route('/:id')
            .get(projectController.getProject)
            .patch(projectController.updateProject)
            .delete(projectController.deleteProject)
module.exports = router;