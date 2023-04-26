import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditBlog = ()=> {
    // Estados campos del Formulario */
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {id} = useParams()
    useEffect( ()=>{
        getBlogById(id)
    },[])


    const navigate = useNavigate()

    const getBlogById = async (id)=>{
        console.log("getBlogById: ", `${import.meta.env.VITE_ENDPOINT_GETBLOGS}/${id}`)
        const res = await axios.get(`${import.meta.env.VITE_ENDPOINT_GETBLOGS}/${id}`)
        setTitle(res.data.title)
        setContent(res.data.content)
    }


    const store = async(e)=>{
        e.preventDefault()
        await axios.put(`${import.meta.env.VITE_ENDPOINT_GETBLOGS}/${id}`,{title,content})
        setTimeout(()=>{ navigate('/')},3000)
       
    }

    return (
        <div>
            <h3>Edit Blog</h3>
            <form onSubmit={store} className='form form-primary'>
                <div className='mb-3'>
                    <label className='form-label'>Title </label>
                    <input 
                        value={title}
                        onChange={ (e)=>setTitle(e.target.value)}
                        type='text'
                        className="formControl"
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Content </label>
                    <textarea
                        value={content}
                        onChange={ (e)=>setContent(e.target.value)}
                        type='text'
                        className="formControl"
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Save</button>
            </form>
        </div>
    )
}

export default EditBlog