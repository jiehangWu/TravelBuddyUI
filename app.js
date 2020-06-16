import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users";
import cors from 'cors';

require('dotenv').config()

const app = express();
var corsOptions = {
    origin: 'http://localhost:8080'
}
app.use(express.static(__dirname + "/src"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`)
);
