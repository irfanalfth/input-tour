var mysql = require("mysql");
const readline = require("readline-sync");
var clc = require("cli-color");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tour",
});

con.connect(function (err) {
  if (err) throw err;

  let sql = `SELECT * FROM tour WHERE latitude = 0 AND longitude = 0`;

  con.query(sql, (err, result) => {
    if (err) throw err;

    console.log("\n");
    console.log(
      clc.greenBright.bold(result.length) +
        clc.yellow(` data akan di input secara berurutan.\n`) +
        clc.redBright(`Pastikan anda input data dengan benar!\n`) +
        clc.blueBright(`Jika anda salah input maka mengulang dari awal`)
    );

    result.forEach((a) => {
      console.log("\n");
      console.log(
        clc.blueBright.underline(`Cari ${clc.red.bold(a.name)} di google maps`)
      );
      console.log(clc.yellow(`Latitude dan Longitude :`));

      do {
        var input = readline.question("=> ");
      } while (!input);

      let ll = input.replace(/ /g, "").split(",", 2);

      let data = [false, 1];

      let sql2 = `UPDATE tour SET latitude = '${ll[0]}',longitude ='${ll[1]}' WHERE tourCode = ${a.tourCode};`;

      con.query(sql2, data, (error, results) => {
        if (error) {
          return console.error(error.message);
        }
        console.log(`\n`);
        console.log(clc.whiteBright(`Tempat    : ` + clc.blueBright(a.name)));
        console.log(clc.whiteBright(`Latitude  : ` + clc.yellowBright(ll[0])));
        console.log(
          clc.whiteBright(`Longitude : ` + clc.yellowBright(ll[1])) + `\n`
        );
      });
    });
  });
});
