import  mongoose from 'mongoose'

mongoose.connect(process.env.MONGOURI)
.then ( conexion=>console.log("Conexion OK a", process.env.MONGOURI) )
.catch( error=>console.log("Error conectando a ",process.env.MONGOURI, process.env.MONGODBNAME, error) )

export default mongoose