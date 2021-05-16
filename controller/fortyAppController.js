const TaskBoard = require('../model/taskBoard')
const Task = require('../model/task')
const _ = require('lodash')
const Profile = require('../model/profile')

exports.getTaskboards = async (req, res) => {
    let taskBoardList = await TaskBoard.find({profile:req.user.id})
    res.status(201).json(taskBoardList);
}

exports.getTasks = async (req, res) => {
    let TaskList = await Task.find({profile:req.user.id})
    res.status(201).json(TaskList);
}

exports.getTaskboardById = async (req, res) => {
    const { id } = req.query;
    let taskBoardList = await TaskBoard.findById(id).populate('tasks');
    res.status(201).json(taskBoardList);
}

exports.postTask = async (req, res) => {
    try {
        let task = req.body;
        let profile = await Profile.findById(req.user.id)
        task.profile = req.user.id;
        task.author = req.user.email;
        task = await new Task(task).save()
        profile.tasks.push(task);
        profile.save();
        res.status(201).json(task) 
    } catch (error) {
        console.log(error)
        res.status(500).json(error);    
    }
}

exports.postTaskboard = async (req, res) => {
    try {
        let board = req.body;
        let profile = await Profile.findById(req.user.id)
        board.profile = req.user.id;
        board.author = req.user.email;
        board = await new TaskBoard(board).save()
        profile.taskBoards.push(board);
        profile.save();
        res.status(201).json(board)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);  
    }
}

exports.patchTaskboard = async (req, res) => {
    try {        
        let updatedBoard = req.body;
        let board = await TaskBoard.findById(updatedBoard._id);
        if(board.profile == req.user.id){
            await board.replaceOne(updatedBoard)
            res.status(201).json(updatedBoard)
        };
    } catch (error) {
        res.status(500).json(error)   
    }
}

exports.patchTask = async (req, res) => {
    try {        
        let updatedTask = req.body;
        let task = await Task.findById(updatedTask._id);
        if(task.profile == req.user.id){
            await task.replaceOne(updatedTask)
            res.status(201).json(updatedTask)
        };
    } catch (error) {
        res.status(500).json(error)   
    }
}

exports.deleteTaskboard = async (req, res) => {
    try {        
        const { taskboardId } = req.query;
        let profile = await Profile.findById(req.user.id);
        let board = await TaskBoard.findById(taskboardId);
        if(board.profile == req.user.id){
            profile.taskBoards.splice(profile.taskBoards.indexOf(taskboardId),1)
            profile.save()
            board.deleteOne()
            res.status(201).json(board)
        }else{
            res.status(403).json({message:"Unauthorised!"})    
        };
    } catch (error) {
        res.status(500).json(error)   
    }
}

exports.deleteTask = async (req, res) => {
    try {        
        const { taskId } = req.query;
        let profile = await Profile.findById(req.user.id);
        let task = await Task.findById(taskId);
        if(task.profile == req.user.id){
            profile.tasks.splice(profile.tasks.indexOf(taskId),1)
            profile.save()
            task.deleteOne()
            res.status(201).json(task)
        }else{
            res.status(403).json({message:"Unauthorised!"})    
        };
    } catch (error) {
        res.status(500).json(error)   
    }
}