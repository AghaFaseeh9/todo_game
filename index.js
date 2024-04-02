#!/usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let continueAdding = true;
while (continueAdding) {
    const addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What do you want to add to your todos?",
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more?",
            default: true,
        },
    ]);
    todos.push(addTask.todo);
    continueAdding = addTask.addMore;
}
// Display todos
if (todos.length > 0) {
    const formatTodos = await inquirer.prompt({
        name: "formatting",
        type: "confirm",
        message: "Do you want to format the list of todos?",
        default: true,
    });
    if (formatTodos.formatting) {
        console.log("Formatted list of todos:");
        todos.forEach(function (todo, index) {
            console.log(index + 1 + ". " + todo);
        });
    }
    else {
        console.log("List of todos:");
        console.log(todos);
    }
    // Delete todo
    const deleteTodo = await inquirer.prompt({
        name: "delete",
        type: "confirm",
        message: "Do you want to delete a todo?",
        default: false,
    });
    if (deleteTodo.delete) {
        const todoToDelete = await inquirer.prompt({
            name: "todoIndex",
            type: "number",
            message: "Enter the index of the todo you want to delete:",
            validate: function (input) {
                if (input >= 1 && input <= todos.length) {
                    return true; // Input is valid
                }
                return "Invalid index. Please enter a valid index."; // Input is invalid
            },
        });
        // Delete the todo
        todos.splice(todoToDelete.todoIndex - 1, 1);
        console.log("Todo deleted.");
        // Display todos again after deletion
        if (todos.length > 0) {
            console.log("Updated list of todos:");
            todos.forEach(function (todo, index) {
                console.log(index + 1 + ". " + todo);
            });
        }
        else {
            console.log("No todos to display.");
        }
    }
}
