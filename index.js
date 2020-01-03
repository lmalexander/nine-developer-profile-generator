const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const moment = require("moment");
const path = require("path");
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
function htmlProfile(answers) {
    return ` 
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Generated Profile Page</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-4"> <!--github profile image-->
                <img src="placeholder.svg" class="img-fluid" alt="User profile image pulled from github">
            </div>
            <div class="col-sm-8">
                <div class="row">
                    <div class="col-sm"><h1>${answers.username}</h1></div> <!--github username-->
                </div>
                <div class="row">
                    <div class="col-sm"><h4>Location</h4></div> <!--user location-->
                </div>
                <div class="row">
                    <div class="col-sm-6"><p>Github</p></div> <!--github link-->
                    <div class="col-sm-6"><p>Website</p></div> <!--personal website link-->
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm"></div><h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3> <!--github bio line-->
        </div>
        <br>
        <div class="row"> 
            <div class="col-sm-6">
                <div class="card" style="width: 18rem;"> <!--repositories-->
                    <div class="card-body">
                        <h5 class="card-title">Repositories</h5>
                        <p class="card-text">###</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card" style="width: 18rem;"> <!--stars-->
                    <div class="card-body">
                        <h5 class="card-title">Stars</h5>
                        <p class="card-text">###</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="card" style="width: 18rem;"> <!--followers-->
                    <div class="card-body">
                        <h5 class="card-title">Followers</h5>
                        <p class="card-text">###</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card" style="width: 18rem;"> <!--following-->
                    <div class="card-body">
                        <h5 class="card-title">Following</h5>
                        <p class="card-text">###</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <h6>Copyright (year) (username)</h6>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// function: print html to pdf

// function calls
promptUser()
    .then(function(answers) {
        console.log(answers.username);
        const html = htmlProfile(answers);
        return writeFileAsync("index.html", html);
    })
    
    .catch(function(err) {
        console.log(err);
    });
