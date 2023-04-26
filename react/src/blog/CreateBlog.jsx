import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = ()=> {
    // Estados campos del Formulario */
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const navigate = useNavigate()

    const store = async(e)=>{
        e.preventDefault()
        await axios.post(import.meta.env.VITE_ENDPOINT_GETBLOGS,{title,content})
        setTimeout(()=>{},3000)
        navigate('/')
    }

    return (
        <div>
            <h3>Create Blog</h3>
            <form onSubmit={store} className='form form-primary'>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input 
                        value={title}
                        onChange={ (e)=>setTitle(e.target.value)}
                        type='text'
                        className="formControl"
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Content</label>
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

export default CreateBlog