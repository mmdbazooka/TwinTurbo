import { toast } from "react-toastify"
import { setComment } from "../../screens/SelectedBlog"
import { setComments } from "../../screens/SelectedCourse"
import customAxios from "../services/interceptor"
import { settingReplyComment } from "../../components/map/ReplyCommentMap"

const likeDissLikeCourse = async (id,params,bool,element,e,url) => {

    let theme = localStorage.getItem("theme")
    let token = localStorage.getItem("token")
    
    if(!token) {
        toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
        if(location.pathname.indexOf("/courses") !== -1){
            // like
            console.log(element.currentUserEmotion);
            if(params == "Like" && element.currentUserEmotion !== "LIKED") {
            
                e.target.previousElementSibling.innerHTML = Math.ceil(e.target.previousElementSibling.innerHTML) + 1
                e.target.previousElementSibling.classList.add("text-[#37c54f]")
                e.target.src = "../src/assets/images/selectedCourse/like.png"
                await customAxios.post(`/Course/AddCourseComment${params}?CourseCommandId=` + id)
                
            }
            else if(params == "Like" && element.currentUserEmotion == "LIKED") {
        
                e.target.previousElementSibling.innerHTML = e.target.previousElementSibling.innerHTML - 1
                e.target.previousElementSibling.classList.add("text-[#000]")
                e.target.src = "../src/assets/images/selectedCourse/likeDefault.png"
                await customAxios.delete(`/Course/DeleteCourseCommentLike?CourseCommandId=` + id)
            
            }
            // //disslike
            if(params == "DissLike" && element.currentUserEmotion !== "DISSLIKED") {
                
                e.target.previousElementSibling.innerHTML = Math.ceil(e.target.previousElementSibling.innerHTML) + 1
                e.target.previousElementSibling.classList.add("text-[#ec0b1a]")
                e.target.src = "../src/assets/images/selectedCourse/disslike.png"
                await customAxios.post(`/Course/AddCourseComment${params}?CourseCommandId=` + id)

            }
            else if(params == "DissLike" && element.currentUserEmotion == "DISSLIKED") {
                    
                e.target.previousElementSibling.innerHTML = e.target.previousElementSibling.innerHTML - 1
                e.target.previousElementSibling.classList.add("text-[#000]")
                e.target.src = "../src/assets/images/selectedCourse/disslikeDefault.png"
                await customAxios.delete(`/Course/DeleteCourseCommentLike?CourseCommandId=` + id)
                    
            }

        }
        else if(location.pathname.indexOf("/blogs") !== -1) {
            // like
            if(bool == true) {

                e.target.previousElementSibling.innerHTML = element.likeCount + 1
                e.target.previousElementSibling.classList.add("#37c54f")
                e.target.src = "../src/assets/images/selectedCourse/like.png"
                await customAxios.post(`/News/CommentLike/${id}?LikeType=${bool}`)

            }
            else if(bool == false) {

                e.target.previousElementSibling.innerHTML = element.dissLikeCount + 1
                e.target.parentNode.previousElementSibling.firstChild.className = theme == "light" ? "text-[#000] dark:text-white" : "text-white dark:text-[#000]"
                e.target.src = "../src/assets/images/selectedCourse/disslike.png"
                // api isnt exist
                await customAxios.post(`/News/CommentLike/${id}?LikeType=${bool}`)

            }
        }
    }
    
    if(location.pathname.indexOf("/courses") !== -1) {
        let result = await customAxios.get("/Course/GetCourseCommnets/" + url.id)
        setComments(result)
    }
    else {
        let result = await customAxios.get("/News/GetNewsComments?NewsId=" + url.id)
        setComment(result)
    }

}

export default likeDissLikeCourse