import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


const ShowBlogs = () =>{

    const [blogs, setBlogs] = useState([])


    const getBlogs = async () =>{
        const res=await axios.get(process.env.ENDPOINT_GETBLOGS)
        setBlogs(res.data)
    }

    const deleteBlog = async()=>{
        await axios.delete( `${process.env.ENDPOINT_GETBLOGS}/${id}`)
        getBlogs()
    }
}



export default ShowBlogs

