import 'dotenv/config'
import express from 'express'
import './config/connection.js'

const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () =>{
    console.log("Server is listening on port:" + port);
})