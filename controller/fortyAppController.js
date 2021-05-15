const TaskBoard = require('../model/taskBoard')
const Task = require('../model/task')
const _ = require('lodash')
const Profile = require('../model/profile')

exports.getTaskboards = async (req, res) => {
    let taskBoardList = await TaskBoard.find({profile:req.user.id})
    res.status(201).json(taskBoardList);
}

exports.getTaskboardById = async (req, res) => {
    const { id } = req.query;
    let taskBoardList = await TaskBoard.findById(id).populate('tasks');
    res.status(201).json(taskBoardList);
}

exports.postTask = async (req, res) => {
    try {
        const { id } = req.query;
        let taskBoard = await TaskBoard.findById(id);
        // 
        let task = new Task(req.body)
        task.taskBoard = taskBoard;
        task = await task.save();
    
        taskBoard.tasks.push(task);
        taskBoard.save();

        res.status(201).json(task);    
    } catch (error) {
        console.log(error)
        res.status(500).json(error);    
    }
}

exports.postTaskboard = async (req, res) => {
    let board = req.body;
    let profile = await Profile.findById(req.user.id)
    board.profile = req.user.id;
	board.author = req.user.email;
    board = await new TaskBoard(board)
    .save()
    .then(
        data=>{
            profile.taskBoards.push(data);
            profile.save();
            return data;
        }
    )
    .then(
        data=>res.status(201).json(data)
    )
    .catch((err)=>res.status(500).json(err))
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