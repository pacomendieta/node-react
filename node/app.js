import express from "express"
import cors from "cors"

import sequelize from "./database/dbmysql.js"
import blogRoutes from './routes/routes.js'

import mongodb from "./database/mongodb.js"

const app = express()

app.use ( cors())              // header para peticiones ajax
app.use(express.json())        // json en body
app.use('/blogs', blogRoutes)  // Root de los endpoints de de blogs

//comprobar conexion a bd MySQL
if ( typeof sequelize !== "undefined") {
    console.log("Conexion a BD MySQL...",process.env.MYSQLDB)
    try {
        await sequelize.authenticate()
        console.log("...conexion a BD MySQL OK")
    } catch (error) {
        console.log("...Error conexion MySQL", error)
    }  
}




app.get('/', (req,res)=>{
    res.send("APP en /")

})

app.listen( process.env.PORT, ()=>{
    console.log("Server UP en puerto ", process.env.PORT)
})