const inquirer = require("inquirer");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const fs = require("fs");

function initialize() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: `Manager's name?`,
    },
    {
      type: "input",
      name: "id",
      message: `Manager's ID?`,
    },
    {
      type: "input",
      name: "email",
      message: `Manager's email?`,
    },
    {
      type: "input",
      name: "officeNumber",
      message: `Manager's office number?`,
    },
  ]);
}
function buildTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Position?",
        choices: ["Engineer", "Intern", "Done"],
      },
    ])
    .then((answer) => {
      if (answer.role === "Engineer") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: `Engineer's name?`,
            },
            {
              type: "input",
              name: "id",
              message: `Engineer's ID?`,
            },
            {
              type: "input",
              name: "email",
              message: `Engineer's email?`,
            },
            {
              type: "input",
              name: "github",
              message: `Engineer's GitHub??`,
            },
          ])
          .then((answers) => {
            let engineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            );
            team.splice(team.length - 1, 0, engineer.getHTML());
            buildTeam();
          });
      }
      if (answer.role === "Intern") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: `Intern's name?`,
            },
            {
              type: "input",
              name: "id",
              message: `Intern's ID?`,
            },
            {
              type: "input",
              name: "email",
              message: `Intern's email?`,
            },
            {
              type: "input",
              name: "school",
              message: `School of Internship?`,
            },
          ])
          .then((answers) => {
            let intern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              answers.school
            );
            team.splice(team.length - 1, 0, intern.getHTML());
            buildTeam();
          });
      }

      return printHTML(team);
    });
}
function printHTML(team) {
  fs.writeFile("Team.html", team, (err) => {
    if (err) {
      throw err;
    }
    console.log("Team Made");
  });
  open("Team.html");
}

initialize().then((answers) => {
  const manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  team.splice(team.length - 1, 0, manager.getHTML());
  buildTeam();
});
