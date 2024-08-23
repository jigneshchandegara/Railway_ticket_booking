require("dotenv").config()
let http = require("http");
let express = require("express");
const DBconnection = require("./DBconnection/DBconnection");
const route = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors")
let app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(cookieParser())
//body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//router
app.use("/Api", route)

//DBconnection
DBconnection()
//server
http.createServer(app).listen(process.env.PORT, () => {
    console.log(`server started on port no ${process.env.PORT}`);
})


