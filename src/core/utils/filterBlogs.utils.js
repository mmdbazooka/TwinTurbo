import blogDB from '../services/blogDB'
import { setBlog } from '../../components/map/BlogsMap'
const filterBlogs = (e) => {
  
    let type = e.target.getAttribute("data-type")
    if(type !== "all" && location.pathname == "/blogs"){
        let filtered = blogDB.filter((element)=> {
            return element.type == type
        })
        setBlog(filtered)
    }
    else {
        setBlog(blogDB)
    }



}

export default filterBlogs