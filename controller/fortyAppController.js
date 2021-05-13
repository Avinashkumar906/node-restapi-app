const TaskBoard = require('../model/taskBoard')
const Task = require('../model/task')
const _ = require('lodash')

exports.getTaskboards = async (req, res) => {
    let taskBoardList = await TaskBoard.find({author:req.user.email})
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
    let taskBoard = new TaskBoard(
        {title:"Restricted Note",description:"descriptin of article!",imgSrc:""}
    )
    taskBoard.save()
    .then(
        (data)=>res.status(201).json(data)
    )
    .catch(
        (err)=>res.status(500).json(err)
    )
}
