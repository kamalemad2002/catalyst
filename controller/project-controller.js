
const {validationResult} = require('express-validator');
const Project = require('../model/project');
const appError = require('../utility/appError');


const getAllProjects = async (req,res,next) => {
  try{
    const projects=await Project.find();
    res.json(projects);
  }  catch(err){
    next(err);
    return res.status(404).json("error:",err)
  }
};

const getProject = async (req, res, next) => {
        const project = await Project.findById(req.params.id);
        if(!project) {
            const error = appError.create('project not found', 404, "FAIL :mafesh project ya sahby")
            return next(error);
        }
        return res.json({ status: "SUCCESSFULLY GETTING", data: {project}});
};

const addProject = async (req, res, next) => {
    // res.json(req.body);
    const project = await Project.findById(req.params.id);
    if(!project) {
        const error = appError.create('project not found', 404, "FAIL :mafesh project ya sahby")
        return next(error);
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = appError.create(errors.array(), 400, "FAILED!")
        return next(error);
    }
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({status: "SUCCESSFULLY ADDED", data: {project: newProject}})
}
const updateProject = async (req, res,next) => {
  try{
    // const project = await Project.findById(req.params.id);
    // if(!project) {
    //     const error = appError.create('project not found', 404, "FAIL :mafesh project")
    //     return next(error);
    // }
    const _id = req.params.id;  
    const updatedproject = await Project.updateOne({_id: _id}, {$set: {...req.body}});
    return res.status(200).json({status: "SUCCESSFULLY UPDATED", data: {project: updatedproject}})

  }
  catch(err){
    const error = appError.create('project not found', 404, "FAIL :mafesh project ya sahby")
    return next(error);
    }
  
};
const deleteProject = async (req, res) => {
    await Project.deleteOne({_id: req.params.id});
    res.status(200).json({status: "SUCCESSFULLY DELETED", data: "mesh el project et7athaF enta mstany eh"});
};

module.exports = {
       addProject,
       updateProject,
       getAllProjects,
       getProject,
       deleteProject
}