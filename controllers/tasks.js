const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
    if (!tasks.length) {
        return next(createCustomError('No tasks found', 404))
    }
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: TaskId } = req.params
    const task = await Task.findOne({ _id: TaskId })
    if (!task) {
        return next(createCustomError('No tasks found', 404))
    }
    res.status(200).json({ task })
})

const updateTask = async (req, res) => {
    const { id: TaskId } = req.params
    const task = await Task.findOneAndUpdate({ _id: TaskId }, req.body, { new: true, runValidators: true })
    if (!task) {
        return next(createCustomError('No tasks found', 404))
    }
    res.status(200).json({ task })
}

const deleteTask = async (req, res) => {
    const { id: TaskId } = req.params
    const task = await Task.findOneAndDelete({ _id: TaskId })
    if (!task) {
        return next(createCustomError('No tasks found', 404))
    }
    res.status(200).json({ task })
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}