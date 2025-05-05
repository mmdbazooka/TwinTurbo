import { useLocation, useParams } from 'react-router-dom'
import customAxios from '../../core/services/interceptor'
import create from '../../core/utils/createResponseComment.utils'
import { setComments } from '../../screens/SelectedCourse'
import { useEffect, useRef, useState } from 'react'
import likeDissLikeCourse from '../../core/utils/likeDissLikeCourse.utils'
import ReplyCommentMap, { settingReplyComment } from './ReplyCommentMap'
import { toast } from 'react-toastify'



const CommentMap = ({ db , parentComment }) => {
    let flag = true
    let theme = localStorage.getItem("theme")
    let token = localStorage.getItem("token")
    let url = useParams()
    let location = useLocation()
    const parent = useRef()
    const repOrder = useRef()
    const parentReply = useRef()
    
    let boolean = [];
    for(let i = 0; i< db?.length ; i++) boolean.push(true)



    

    const changeTextShow = (e,element,index) => {

        if(boolean[index] == true) e.target.innerHTML = `بستن پاسخ ها ${element.acceptReplysCount}`
        else if(boolean[index] == false) e.target.innerHTML = `نمایش پاسخ ها ${element.acceptReplysCount}`
    
    }


    const reply = (e,element,index) => {

        if(flag) {
            let targetComment = e.target.parentNode.parentNode.parentNode
            let order = targetComment.getAttribute("data-order")

            if(targetComment.nextElementSibling.style.height !== "") { 
                boolean[index] = true
                targetComment.nextElementSibling.style.height = "0px"
            }

    
            let replay = document.createElement("div");
            replay.className = `w-[80%] h-[200px] relative`;
            repOrder.current = replay 
            replay.style.order = order
            parentComment.appendChild(replay)
            
    
            let textareaReply = document.createElement("textarea");
            textareaReply.className = "resize-none w-[90%] h-[50%] absolute left-0 top-0 border rounded-[25px] m-[15px] p-[10px]";
            replay.appendChild(textareaReply);

            let idea = document.createElement("div")
            idea.className = "w-[300px] h-[70px] px-[20px] absolute left-0 bottom-0 flex justify-between items-center"
            replay.appendChild(idea);
    
    
            let rejBtn = document.createElement("button")
            rejBtn.className = "bg-[#cc0000] w-[120px] h-[50px] rounded-[15px] text-[#fff] text-[19px]"
            rejBtn.innerHTML = "بیخیال";
            rejBtn.onclick = () => { 
                replay.remove()
                flag = true
            }
            idea.appendChild(rejBtn);
    
            let accBtn = document.createElement("div")
            accBtn.className = "bg-[green] w-[120px] h-[50px] rounded-[15px] text-[#fff] text-[19px] cursor-pointer flex justify-center items-center"
            accBtn.innerHTML = "ارسال";
            
            accBtn.onclick = async (e) => {
                
                if(!token) {
                    toast.error("لطفا ابتدا ثبت نام کنید")
                }
                else {
                    let res = await customAxios.get("/SharePanel/GetProfileInfo")
                    flag = true
                    
                    if(textareaReply.value.length < 5) toast.error("لطفا متنی بیش از 5 کلمه وارد کنید")
                    else if(location.pathname.indexOf("/courses") !== -1 && textareaReply.value !== "") {
                        
                        let formData = new FormData()
                        formData.append("CommentId",element.id)
                        formData.append("CourseId",element.courseId)
                        formData.append("Title",res.fName + " " + res.lName)
                        formData.append("Describe",textareaReply.value)

                        await customAxios.post("/Course/AddReplyCourseComment",formData)
                        
                        if(repOrder.current) {
                            repOrder.current.remove()
                            flag = true
                        }
                        if(parent.current) parent.current.remove()
                        replay.remove()
                        toast.success("عملیات با موفقیت انجام شد")
                        let result = await customAxios.get("/Course/GetCourseCommnets/" + url.id)
                        setComments(result)
                        let resulting = await customAxios.get(`/Course/GetCourseReplyCommnets/${element.courseId}/${element.id}`)
                        settingReplyComment(resulting)
                    }
                    else if(location.pathname.indexOf("/blogs") !== -1){
                        console.log(element);
                        customAxios.post("/News/CreateNewsReplyComment",{
                            newsId: element.newsId,
                            title: res.fName + " " + res.lName,
                            describe: textareaReply.value,
                            parentId: element.parentId,
                        })
                        
                        replay.remove()
                        toast.success("عملیات با موفقیت انجام شد")
                    }
                }
            }
            idea.appendChild(accBtn);

        }
        else return false
        flag = false
        
    }

 
    const showResponse = async (e,element,index) => {
        let targetComment = e.target.parentNode.parentNode.parentNode.parentNode
        let order = targetComment.getAttribute("data-order")


        if(boolean[index] == true) {
            let res = await customAxios.get(`/Course/GetCourseReplyCommnets/${element.courseId}/${element.id}`)
            settingReplyComment(res)
            targetComment.nextElementSibling.style.height = targetComment.nextElementSibling.children.length * 180 + "px";
            
            if(repOrder.current) {
                repOrder.current.remove()
                flag = true
            }
            
            boolean[index] = false
        }
        else if(boolean[index] == false) {
            boolean[index] = true
            targetComment.nextElementSibling.style.height = "0px";
        }
    }
    return (
        db?.map((element,index)=> {
            return (
                <>
                    <div key={index} className={`w-full flex items-center gap-[15px] my-[7px] py-5`} data-order={index+5} style={{order:index+5}} >
                        <img src={element.pictureAddress ? element.pictureAddress : "../src/assets/images/icons/userIcon.png"} alt="" className="w-16 h-[60px] rounded-full " />

                        <div className="w-full h-[100%] bg-white dark:bg-[#2d3955] dark:shadow-none shadow-[0_0_15px_#999] rounded-[15px] p-[10px] relative">
                            <div  className="text-[18px] my-1 flex [&>span]:mx-[10px]">
                                <span className='order-1 dark:text-white'>{element?.author ? element.author : element.title}</span>  
                                <span className='order-2 text-[#f6f6f6]'>|</span>  
                                <span className='order-2 dark:text-[#eee]'>{element.insertDate ? element.insertDate.slice(0,10).replace("-","/").replace("-","/") : element.inserDate.slice(0,10).replace("-","/").replace("-","/")}</span>  
                            </div>
                            
                            <p className="text-[#707070] dark:text-[#f5f5f5] text-[15px] my-1 inline-block">{element.describe}</p>
                            <div className="w-[130px] h-[25px] flex justify-evenly items-center my-1">
                                <div className=" flex items-center">
                                    <span className={location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "LIKED" ? "text-[#37c54f]" : theme == "light" ? "text-[#000] dark:text-white" : "text-white dark:text-[#000]" : element.currentUserIsLike ? "text-[#37c54f]" : theme == "light" ? "text-[#000] dark:text-white" : "text-white dark:text-[#000]"}>{element.likeCount == 0 ? 0 : element?.likeCount || element?.commentLike}</span>
                                    <img src={location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "LIKED" ? "../src/assets/images/selectedCourse/like.png" : theme == "light" ? "../src/assets/images/selectedCourse/likeDefault.png" : "../src/assets/images/selectedCourse/likeDefault-light.png" : element.currentUserIsLike ? "../src/assets/images/selectedCourse/like.png" : theme == "light" ? "../src/assets/images/selectedCourse/likeDefault.png" : "../src/assets/images/selectedCourse/likeDefault-light.png" } onClick={(e)=> likeDissLikeCourse(element.id,"Like",true,element,e,url)} className="mx-2 mb-2 w-6 cursor-pointer likeCourses" data-id={`${index}`} />
                                </div>
                                |
                                <div className="flex items-center mr-2" >
                                    <span className={location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "DISSLIKED" ? "text-[#ec0b1a]" :  theme == "light" ? "text-[#000] dark:text-white" : "text-white dark:text-[#000]" : element.currentUserIsDissLike ? "text-[#ec0b1a]" : theme == "light" ? "text-[#000] dark:text-white" : "text-white dark:text-[#000]"}>{element?.disslikeCount == 0 ? 0 : element?.disslikeCount || element?.dissLikeCount}</span> 
                                    <img src={location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "DISSLIKED" ? "../src/assets/images/selectedCourse/disslike.png" : theme == "light" ? "../src/assets/images/selectedCourse/disslikeDefault.png" : "../src/assets/images/selectedCourse/disslikeDefault-light.png" : element.currentUserIsDissLike ? "../src/assets/images/selectedCourse/disslike.png" : "../src/assets/images/selectedCourse/disslikeDefault.png" } onClick={(e)=> likeDissLikeCourse(element.id,"DissLike",false,element,e,url)} className="mr-2 mt-2 w-6 cursor-pointer dissLikeCourses" data-id={`${index}`} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between absolute left-[20px] bottom-[10px] [&>img]:cursor-pointer" >
                                <div className='text-[#777] cursor-pointer flex items-center' onClick={(e) => showResponse(e,element,index)}> 
                                    <span className='ml-[15px] dark:text-white' onClick={(e)=> changeTextShow(e,element,index)} data-id={index}>{location.pathname.indexOf("/blogs") !== -1 ? element.replyCount !== 0 ? `نمایش پاسخ ها ${element.replyCount}` : "" : element.acceptReplysCount !== 0 ? `نمایش پاسخ ها ${element?.acceptReplysCount ? element.acceptReplysCount : element.replyCount}` : "" }</span>
                                </div>
                                <img src={theme == "light" ? "../src/assets/images/selectedCourse/reply.png" : "../src/assets/images/selectedCourse/reply-light.png"  } className='w-[25px] h-[20px] replyImg' onClick={(e) => reply(e,element,index)} />
                            </div>
                            <div className={element.accept ? "absolute left-3 top-2 text-[15px] text-[#36c54e]" : "absolute left-3 top-2 text-[15px] text-[#ec0b1a]" }>{location.pathname.indexOf("courses") !== -1 ? element.accept ? "پذیرفته شده" : "پذیرفته نشده" : ""}</div>
                        </div>
                    </div>
                    <div className='pl-[45px] flex flex-col items-end overflow-hidden w-full transition-all duration-1000 h-0' data-order={index+5} style={{order:index+5}}>
                        <ReplyCommentMap element={element} />
                    </div>
                
                </>
            )
        })
    )
}

export default CommentMap