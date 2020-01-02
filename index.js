const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);


// function: prompt username and favorite color
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {
            type: "list",
            name: "color",
            message: "What is your favorite color?",
            choices: [ "black", "white" , "blue" , "red" , "orange", "purple" , "green"]
        }
    ]);
}

// function: generate html from answers


// function: print html to pdf



// function calls
promptUser()
    .then(function(answers) {
        console.log(answers.username);
        console.log(answers.color);
    })
