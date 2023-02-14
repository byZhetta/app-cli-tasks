const Task = require('../models/Task');
const {connection} = require('../db');

const addTask = async (task) => {
    await Task.create(task);
    console.log("New Task Created");
    await connection.close();
};

const listTasks = async () => {
    const tasks = await Task.find().lean();
    console.table(tasks.map(task => ({
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
    })))
    await connection.close();
    process.exit(0)
};

const updateTask = async (_id, newTask) => {
    await Task.updateOne({_id}, newTask);
    console.log('Task Updated');
    await connection.close();
};

const removeTask = async (_id) => {
    await Task.findByIdAndDelete(_id);
    console.log('Task Deleted');
    await connection.close();
};

const findTask = async (text) => {
    const search = new RegExp(text, "i");

    const tasks = await Task.find({
        $or: [{title: search}, {description: search}]
    })

    if (tasks.length === 0){
        console.log("No tasks found");
        await connection.close();
        process.exit(0);
    }

    console.table({
        id: tasks[0]._id.toString(),
        title: tasks[0].title,
        description: tasks[0].description,
    });
    await connection.close();
    process.exit(0);
};

module.exports = {
    addTask,
    listTasks,
    updateTask,
    removeTask,
    findTask
}