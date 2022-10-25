const fs = require("fs-extra");
const readline = require("readline-sync");
const prompt = require("prompt-sync");
var clc = require("cli-color");

const file = fs.readFileSync("./tempat.txt", "utf-8");
const splitFile = file.split("\r\n");

console.log("\n");
console.log(
  clc.greenBright.bold(splitFile.length - 1) +
    clc.yellow(` data akan di input secara berurutan.\n`) +
    clc.red(`Pastikan anda input data dengan benar!\n`) +
    clc.blueBright(`Jika anda salah input maka mengulang dari awal`)
);

for (let i = 0; i < splitFile.length; i++) {
  let mysql = require("mysql");
  let config = require("./config.js");
  let connection = mysql.createConnection(config);

  var files = fs.readFileSync("./tempat.txt", "utf-8");
  var lines = files.split("\r\n");
  lines.splice(0, 1);

  const tempat = splitFile[i].split("|")[0];
  const id = splitFile[i].split("|")[1];

  console.log("\n");
  console.log(
    clc.blueBright.underline(`Cari ${clc.red.bold(tempat)} di google maps`)
  );
  console.log(clc.yellow(`Latitude dan Longitude :`));

  do {
    input = readline.question("=> ");
  } while (!input);

  let ll = input.replace(/ /g, "").split(",", 2);

  let sql = `UPDATE tour SET latitude = '${ll[0]}',longitude ='${ll[1]}' WHERE tourCode = ${id};`;

  let data = [false, 1];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(`\n`);
    console.log(clc.whiteBright(`Tempat    : ` + clc.blueBright(tempat)));
    console.log(clc.whiteBright(`Latitude  : ` + clc.yellowBright(ll[0])));
    console.log(
      clc.whiteBright(`Longitude : ` + clc.yellowBright(ll[1])) + `\n`
    );
  });

  connection.end();
}
