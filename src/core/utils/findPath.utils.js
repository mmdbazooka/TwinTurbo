import {setingBlogs} from '../../screens/SelectedBlog'
import {setingItemComment} from '../../screens/SelectedBlog'
import customAxios from '../services/interceptor';


const getBlogDetail = async () => {
    let num = location.pathname.lastIndexOf("/")+1
    let loc = location.pathname.slice(num)
    let result = await customAxios.get("/News/" + loc) 
    setingBlogs(result.detailsNewsDto)

}
const getBlogComment = async () => {
    let num = location.pathname.lastIndexOf("/")+1
    let loc = location.pathname.slice(num)
    let resultComment = await customAxios.get("/News/GetNewsComments?NewsId=" + loc)
    setingItemComment(resultComment)
}
const findPath = (index, location , navigate) => {
    let num1 = location.pathname.indexOf("/");
    let num2 = location.pathname.lastIndexOf("/");
    let result = location.pathname.slice(num1, num2);
    navigate(`${result}/${index}`);
    getBlogDetail()
    getBlogComment()
};

export default findPath