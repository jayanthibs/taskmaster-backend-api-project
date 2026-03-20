import 'dotenv/config'
import express from 'express'
import './config/connection.js'
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


const app = express();

const port = process.env.PORT || 3001;


app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes, taskRoutes);
app.use('/api/tasks', taskRoutes);



app.listen(port, () =>{
    console.log("Server is listening on port:" + port);
})