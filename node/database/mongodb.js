import mongoose from 'mongoose'

//Conectar
mongoose.connect(process.env.MONGOURI)
.then ( conexion=>console.log("Conexion OK", process.env.MONGOURI) )
.catch( error=>console.log("Error conectando a ",process.env.MONGOURI, process.env.MONGODBNAME, error) )

export default mongoose.connection