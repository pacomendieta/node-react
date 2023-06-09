import BlogModel from "../models/BlogModel.js";

//** Metodos CRUD  **//

//Get todos
export const getAllBlogs = async (req, res) =>{
    try {
        const blogs = await BlogModel.findAll()
        res.status(200).json(blogs)
    } catch (error) {
        res.json( {message: error.message})
    }
}

//Get blog from id param
export const getBlog = async (req, res) =>{
    try {
        const blog = await BlogModel.findAll( {where: { id: req.params.id }})
        res.json(blog[0])
    } catch (error) {
        res.json( {message: error.message})    
    }
}

// Crear blog
export const createBlog = async (req, res) =>{
    try {
        await BlogModel.create(req.body)
        res.status(200).json( {message:"Registro creado"} )
    } catch (error) {
        res.json( {message: error.message})   
    }
}

//Update blog
export const updateBlog= async (req, res)=>{
    try {
        await BlogModel.update(req.body, { where: {id:req.params.id}})
        res.json({message:"Registro actualizado"})
    } catch (error) {
        res.json( {message: error.message})   
    }
}

//Eliminar blog
export const deleteBlog = async (req, res)=>{
    try {
        await BlogModel.destroy( {where: {id:req.params.id}})
        res.json({message:"Registro borrado"})
    } catch (error) {
        res.json( {message: error.message})  
    }
}
