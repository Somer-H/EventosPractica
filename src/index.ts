import express from 'express'
import morgan from 'morgan';
import signale from 'signale';
import cors from 'cors'

import { userRoutes } from './presentacion/routes/userRoute';
import { eventRoutes } from './presentacion/routes/eventRoute';

const app = express()

//Middleware para uso del payload
app.use(express.json()) 
//Middleware para tener un log personalizado
app.use(morgan('dev'))
//Middleware para el uso de cors
app.use(cors())

//Recurso users
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/event", eventRoutes); 
app.listen(3000, ()=> {   
    signale.success('Server open in port 3000')
})