const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();

app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));


app.listen(PORT , ()=>{
    console.log(`App is listening at ${PORT}`);
})

const router = require("./routes/User");
const productRouter = require("./routes/Product");

app.use(router);
app.use(productRouter);

app.get('/',(req, res) => {
    res.send('Hello World!')
});

const database = require("./config/database");
database.connectDB();
