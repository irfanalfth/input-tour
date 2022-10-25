const { MySqlConnection } = require("mysqlconnector");
const fs = require("fs-extra");
var clc = require("cli-color");

const connection = new MySqlConnection("localhost", "root", "", "tour");

(async () => {
  await connection.connectAsync().then(() => {
    connection
      .queryAsync("SELECT * FROM tour WHERE latitude = 0 AND longitude = 0")
      .then((results) => {
        results.forEach((a) => {
          fs.appendFileSync("tempat.txt", `${a.name}|${a.tourCode}\r\n`);
        });
        connection.closeAsync().then(() => {
          console.log("\n");
          console.log(
            clc.greenBright(
              "👌 Berhasil input : " + clc.blueBright(results.length)
            )
          );
          console.log("\r");
        });
      });
  });
})();
