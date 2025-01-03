const mongoose = require("mongoose"); 
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const { incomingRequestLogger } = require("./middleware/index.js");
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const newformRouter = require("./routes/newform");
const formbot = require("./routes/formbot");
const newfolderRouter = require("./routes/newfolder");
const { mongo } = require("mongoose");
const urlencoded = require("body-parser/lib/types/urlencoded.js");
const { header } = require("express-validator");
app.use(incomingRequestLogger);
app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/newform", newformRouter );
app.use("/api/v1/user/newform/formbot", formbot );
app.use("/api/v1/user/newfolder", newfolderRouter );
app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
    mongoose.connect(process.env.MONGOOSE_URI_STRING, {

    });
    mongoose.connection.on("error", (err) => {
        console.log(err);
    });
});