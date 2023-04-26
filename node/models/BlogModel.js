import sequelize from "../database/dbmysql.js"

import { DataTypes } from 'sequelize'

const BlogModel = sequelize.define('blogs', {
    id: { type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
    title: {type: DataTypes.STRING},
    content: { type: DataTypes.STRING },

})

export default BlogModel