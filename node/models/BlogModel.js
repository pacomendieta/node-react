
/** MODELO PARA SEQUELIZE *****************/
import sequelize from "../database/dbmysql.js"

import { DataTypes } from 'sequelize'

const BlogModel = sequelize.define('blogs', {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    title: {type: DataTypes.STRING},
    content: { type: DataTypes.STRING },

})

export default BlogModel


/** MODELO PARA MONGOOSE *****************/
import mongoose, { isObjectIdOrHexString } from  "mongoose"
const ObjectId = mongoose.Schema.Types.ObjectId;
const blogSchema = new mongoose.Schema(
    {
        _id  :  {type:ObjectId},
        title:  {type:String},
        content: {type:String}
    },
    {
        collection: 'blog'
    }
)
const BlogModelMongo=mongoose.model ('BlogModel', blogSchema)
export { BlogModelMongo }