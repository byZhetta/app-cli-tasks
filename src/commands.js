const {program} = require("commander");
const {prompt} = require("inquirer");
const {addTask, listTasks, removeTask, updateTask, findTask} = require("./controllers/task.controllers");

program.version("0.0.1").description("A command line tool for managing tasks");

const taskQuestions = [
    {
        type: "input",
        message: "Task title",
        name: "title"
    },
    {
        type: "input",
        message: "Task description",
        name: "description",
    },
];

program.command("save").alias("s").action(async () => {
    const answers = await prompt(taskQuestions);
    addTask(answers);
});

program.command("list").alias("l").action(() => listTasks());

program.command("delete <id>").alias("d").action((_id) => removeTask(_id));

program.command("update <id>").alias("u").action(async (_id) => {
    const answers = await prompt(taskQuestions);
    await updateTask(_id, answers);
});

program.command("find <task>").alias("f").action((text) => findTask(text));

program.parse(process.argv);