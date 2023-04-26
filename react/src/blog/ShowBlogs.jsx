import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHouse, faBookOpen} from '@fortawesome/free-solid-svg-icons'
//import { library } from '@fortawesome/fontawesome-svg-core'
//library.add ( faPlus, faCameraRetro, faTv )
import { FaHeart, FaPlus, FaEdit, FaTrash  } from "react-icons/fa"
import { FaReact } from "react-icons/fa"
import { FaBook } from "react-icons/fa"

const ShowBlogs = () =>{

    const [blogs, setBlogs] = useState([])
    useEffect( ()=>{
        getBlogs()
    },[])

    const getBlogs = async () =>{
        console.log("ShowBlogs.getBlogs() from ",import.meta.env.VITE_ENDPOINT_GETBLOGS)
        const res=await axios.get(import.meta.env.VITE_ENDPOINT_GETBLOGS)
        setBlogs(res.data)
    }

    const deleteBlog = async(id)=>{
        await axios.delete( `${import.meta.env.VITE_ENDPOINT_GETBLOGS}/${id}`)
        getBlogs()
    }


    return(
        <div className='col'>
            <Link to="/create" className='btn btn-primary mt-2 mb-2'><FaPlus /></Link>
            <table className='table'>
                <thead className='table-primary'>
                    <tr>
                        <th>Id</th><th>Title</th><th>Content</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs.map(blog=>(
                            <tr key={blog.id}>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.content}</td>
                                <td> 
                                    <Link to= {`/edit/${blog.id}`} className='btn btn-primary' ><FaEdit /></Link>
                                    <button onClick={ ()=>deleteBlog(blog.id)} className='btn btn-danger'><FaTrash/></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}



export default ShowBlogs

