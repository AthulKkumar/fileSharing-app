const file = require("./models/file");
const File = require("./models/file");
const fs = require("fs");
const connectDb = require("./config/db");
connectDb();

// Automatic deleter (Sheduler)
async function deleteData() {
  const pastData = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastData } });

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`succefully deleted ${file.filename}`);
      } catch (error) {
        console.log(`Error in deleting the file ${error}`);
      }
    }
  }
}

deleteData().then(process.exit);
