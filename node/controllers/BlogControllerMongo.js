import {BlogModelMongo} from "../models/BlogModel.js";
import mongoose from 'mongoose'

//** Metodos CRUD con mongoose **//

//Get todos
export const getAllBlogs = async (req, res) =>{
    try {
        const blogs = await BlogModelMongo.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.json( {message: error.message})
    }
}

//Get blog from id param
export const getBlog = async (req, res) =>{
    try {
        const id = req.params.id
        await BlogModelMongo.findById( {_id: id }).then(blog=>res.status(200).json(blog))
        
    } catch (error) {
        res.json( {message: error.message})    
    }
}

// Crear blog
export const createBlog = async (req, res) =>{
    try {
        await BlogModelMongo.create(req.body)
        res.status(200).json( {message:"Registro creado"} )
    } catch (error) {
        res.json( {message: error.message})   
    }
}

//Update blog
export const updateBlog= async (req, res)=>{
    try {
        await BlogModelMongo.updateOne({_id:req.params.id},req.body)
        res.json({message:"Registro actualizado"})
    } catch (error) {
        res.json( {message: error.message})   
    }
}

//Eliminar blog
export const deleteBlog = async (req, res)=>{
    try {
        await BlogModelMongo.deleteOne( {_id:req.params.id})
        res.json({message:"Registro borrado"})
    } catch (error) {
        res.json( {message: error.message})  
    }
}
