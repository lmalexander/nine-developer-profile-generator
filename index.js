const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {
            type: "input",
            name: "color",
            message: "What is your favorite color?",
            choices: [ "black", "white" , "blue" , "red" , "orange", "purple" , "green"]
        }
    ]);
}
promptUser();
