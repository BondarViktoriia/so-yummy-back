const mongoose = require("mongoose");
const app = require('./app')

// const { DB_HOST, PORT = 3000 } = process.env;
const DB_HOST ="mongodb+srv://viktoriiashvetsinteravia:group7@cluster0.qest4en.mongodb.net/db-soYummy?retryWrites=true&w=majority"


mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
.then(()=>app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
}))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
})

