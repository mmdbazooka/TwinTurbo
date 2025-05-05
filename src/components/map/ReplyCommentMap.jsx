import { useEffect, useState } from "react"
import customAxios from "../../core/services/interceptor"
import likeDissLikeCourse from "../../core/utils/likeDissLikeCourse.utils";
import { useParams } from "react-router-dom";
export let settingReplyComment
const ReplyCommentMap = ({element}) => {
    let url = useParams()
    const [replyComment, setReplyComment] = useState()
    let theme = localStorage.getItem("theme")

    const getReplyCommentCourse = async (element) => {
        let res = await customAxios.get(`/Course/GetCourseReplyCommnets/${element.courseId}/${element.id}`)
        setReplyComment(res)
    }
    const getReplyCommentNews = async () => {
        let res = await customAxios.get(`/News/GetRepliesComments?Id=${element.id}`)
        setReplyComment(res)
    }
 
    useEffect(() => {
        settingReplyComment = setReplyComment
        if(location.pathname.indexOf("/courses") !== -1) getReplyCommentCourse(element)
        else if(location.pathname.indexOf("/blogs") !== -1) getReplyCommentNews()
        
    }, [])


    

    
    return (
        
        replyComment?.map((element,index)=> {
            return (
                <div key={index} className={`w-[90%] flex items-center gap-[15px] my-[7px] py-5`} data-order={index+5} style={{order:index+5}} >
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
                                <span className='ml-[15px] dark:text-white' onClick={(e)=> changeTextShow(e,element)} data-id={index}>{location.pathname.indexOf("/blogs") !== -1 ? element.replyCount !== 0 ? `نمایش پاسخ ها ${element.replyCount}` : "" : element.acceptReplysCount !== 0 ? `نمایش پاسخ ها ${element?.acceptReplysCount ? element.acceptReplysCount : element.replyCount}` : "" }</span>
                            </div>
                            {/* <img src={theme == "light" ? "../src/assets/images/selectedCourse/reply.png" : "../src/assets/images/selectedCourse/reply-light.png"  } className='w-[25px] h-[20px] replyImg' onClick={(e) => reply(e,element)} /> */}
                        </div>
                        <div className={element.accept ? "absolute left-3 top-2 text-[15px] text-[#36c54e]" : "absolute left-3 top-2 text-[15px] text-[#ec0b1a]" }>{location.pathname.indexOf("courses") !== -1 ? element.accept ? "پذیرفته شده" : "پذیرفته نشده" : ""}</div>
                    </div>
                </div>

            )
        })

    )
}

export default ReplyCommentMap