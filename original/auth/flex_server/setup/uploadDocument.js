const fs = require("fs");
const os = require("os");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Get the host name
const hostname = os.hostname();
console.log(hostname);

switch (hostname) {
  case "LAPTOP-CGMRD4JG":
    dotenv.config({ path: "../dev.env" });
    break;
  case "LAPTOP-GH39SS9C":
    dotenv.config({ path: "../dev.env" });
    break;
  case "PAAPRIFLEX":
    dotenv.config({ path: "../prod.env" });

  default:
    dotenv.config({ path: "../dev.env" });
}

// Connecting to the local mongo db, it require connection string, which is must be stored in config.env file
mongoose.connect(process.env.DATABASE_LOCAL, {}).then(async (con) => {
  console.log("DB Connection Successfull!");

  const Account = require("../modules/account/accountModel");
  const accountJSON = JSON.parse(
    fs.readFileSync(`${__dirname}/account.json`, "utf-8")
  );
  await Account.create(accountJSON);
  console.log("\x1b[36m", "Account is added successfully!", "\x1b[0m");

  const AccessControl = require("../modules/accessControl/accessControlModel");
  const masterAccessJSON = JSON.parse(
    fs.readFileSync(`${__dirname}/masterUserAccess.json`, "utf-8")
  );
  await AccessControl.create(masterAccessJSON);
  console.log("\x1b[36m", "Master User is added successfully!", "\x1b[0m");
});

const importData = async () => {
  try {
    // await Tour.create(tours);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    //const permissionDoc = await Permission.find();

    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await AccessControl.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--deleteAll") {
  deleteData();
}
