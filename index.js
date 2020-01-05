const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const moment = require("moment");
const path = require("path");
const pdf = require("html-pdf");
const axios = require("axios");
const html = fs.readFileSync("index.html","utf8");
const options = { format: "Letter"};
const writeFileAsync = util.promisify(fs.writeFile);

// prompt for username and favorite color
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
            choices: [ "pink", "blue" , "red" , "green"]
        }
    ]);
}

// perform github api await/async call using axios & store github data variables
async function githubUser(answers) {
    try {
        const githubURL = `https://api.github.com/users/${answers.username}`;
        const githubUserData = await axios.get(githubURL);
        return githubUserData;
        console.log(githubUserData);
    } catch (error) {
        console.error(error);
    }
}

// create const html storing htmlProfile which creates HTML
function htmlProfile(answers, githubUserData) {
    // storing github data variables
    const userName = githubUserData.name;
    console.log(userName);
    const userGitName = githubUserData.login;
    const userLocation = githubUserData.location;
    const userGithubLink = githubUserData.html_url;
    const userBlogLink = githubUserData.blog;
    const userProfImg = githubUserData.avatar_url;
    console.log(userProfImg);
    const userBio = githubUserData.bio;
    const userRepos = githubUserData.public_repos;
    const userCreated = githubUserData.created_at;
    const userCreatedFormat = moment(userCreated).format("MMMM YYYY");
    const userFollowers = githubUserData.followers;
    const userFollowing = githubUserData.following;

    const colors = {
        green: {
            wrapperBackground: "#E6E1C3",
            headerBackground: "#C1C72C",
            headerColor: "black",
            photoBorderColor: "#black"
            },
            blue: {
            wrapperBackground: "#5F64D3",
            headerBackground: "#26175A",
            headerColor: "white",
            photoBorderColor: "#73448C"
            },
            pink: {
            wrapperBackground: "#879CDF",
            headerBackground: "#FF8374",
            headerColor: "white",
            photoBorderColor: "#FEE24C"
            },
            red: {
            wrapperBackground: "#DE9967",
            headerBackground: "#870603",
            headerColor: "white",
            photoBorderColor: "white"
            }
    };
    
    // generate html from github api response data
    return `  
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <title>Generated Profile Page</title>
        <style>
                @page {
                margin: 0;
                }
                *,
                *::after,
                *::before {
                box-sizing: border-box;
                }
                html, body {
                padding: 0;
                margin: 0;
                }
                html, body, .wrapper {
                height: 100%;
                }
                .wrapper {
                background-color: ${colors[answers.color].wrapperBackground};
                padding-top: 100px;
                }
                body {
                background-color: white;
                -webkit-print-color-adjust: exact !important;
                font-family: 'Cabin', sans-serif;
                }
                main {
                background-color: #E9EDEE;
                height: auto;
                padding-top: 30px;
                }
                h1, h2, h3, h4, h5, h6 {
                font-family: 'BioRhyme', serif;
                margin: 0;
                }
                h1 {
                font-size: 3em;
                width: 100%;
                text-align: center;
                margin-top: 10px;
                }
                h2 {
                font-size: 2.5em;
                width: 100%;
                text-align: center;
                }
                h3 {
                font-size: 2em;
                }
                h4 {
                font-size: 1.5em;
                }
                h5 {
                font-size: 1.3em;
                }
                h6 {
                font-size: 1.2em;
                }
                .img-fluid {
                background-color: ${colors[answers.color].headerBackground};
                color: ${colors[answers.color].headerColor};
                padding: 10px;
                width: 95%;
                border-radius: 6px;
                border: 6px solid ${colors[answers.color].photoBorderColor};
                box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                }
    
                .container {
                padding: 50px;
                padding-left: 100px;
                padding-right: 100px;
                }
    
                .row {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-top: 20px;
                margin-bottom: 20px;
                }
    
                .card {
                padding: 20px;
                border-radius: 6px;
                background-color: ${colors[answers.color].headerBackground};
                color: ${colors[answers.color].headerColor};
                margin: 20px;
                }
                
                .col {
                flex: 1;
                text-align: center;
                }
    
                a, a:hover {
                text-decoration: none;
                color: inherit;
                font-weight: bold;
                }
    
                @media print { 
                body { 
                zoom: .75; 
                } 
                }
            </style>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-sm-4"> <!--github profile image-->
                    <img src="${userProfImg}" class="img-fluid" alt="User profile image pulled from github">
                </div>
                <div class="col-sm-8">
                    <div class="row">
                        <div class="col-sm"><h1>${userName}</h1></div> <!--github user's name-->
                    </div>
                    <div class="row">
                        <div class="col-sm"><h2>${userGitName}</h2></div> <!--github username-->
                    </div>
                    <div class="row">
                        <div class="col-sm"><h4>${userLocation}</h4></div> <!--user location-->
                    </div>
                    <div class="row">
                        <div class="col-sm-6"><a href =${userGithubLink} target="blank"> </a></div> <!--github link-->
                        <div class="col-sm-6"><a href=${userBlogLink} target="blank">Website</a></div> <!--personal website link-->
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm"></div><h3>${userBio}</h3> <!--github bio line-->
            </div>
            <br>
            <div class="row"> 
                <div class="col-sm-6">
                    <div class="card" style="width: 18rem;"> <!--repositories-->
                        <div class="card-body">
                            <h5 class="card-title">Repositories</h5>
                            <p class="card-text">${userRepos}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card" style="width: 18rem;"> <!--created date-->
                        <div class="card-body">
                            <h5 class="card-title">Created on:</h5>
                            <p class="card-text">${userCreatedFormat}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="card" style="width: 18rem;"> <!--followers-->
                        <div class="card-body">
                            <h5 class="card-title">Followers</h5>
                            <p class="card-text">${userFollowers}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card" style="width: 18rem;"> <!--following-->
                        <div class="card-body">
                            <h5 class="card-title">Following</h5>
                            <p class="card-text">${userFollowing}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <footer>
                        <h6>Copyright 2020 ${userName}</h6>
                    </footer>
                </div>
            </div>
        </div>
    </body>
    </html>`;
}

// returns writeFileAsync
async function writeFile(html) {
 return await writeFileAsync("index.html", html) 
}

// pdf.create(html,options).toFile("index.pdf", function(err, res) {
//     if (err) return console.log(err);
//     console.log(res);
// });

// function calls
promptUser()
    .then(answers => githubUser(answers)
        .then(function(githubUserData){
            console.log(githubUserData);
            const html = htmlProfile(answers, githubUserData)
            writeFile(html)
        }
        )
    )
.catch( err => console.log(err))
