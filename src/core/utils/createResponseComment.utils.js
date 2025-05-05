import customAxios from "../services/interceptor";
import likeDissLikeCourse from "./likeDissLikeCourse.utils";
let parentElement ;
const creatingReply = async (element,url,bool) => {
    if(bool == true)  parentItem.innerHTML = "";
    
    let resultReply ;
    if(location.pathname.indexOf("courses") !== -1) resultReply = await customAxios.get(`/Course/GetCourseReplyCommnets/${element.courseId}/${element.id}`)
    else resultReply = await customAxios.get(`/News/GetRepliesComments?Id=${element.id}`)

    parentElement = element
    resultReply.map((element,index)=> {


        let parent = document.createElement("div");
        parent.className = "w-[85%] h-[100%] bg-white shadow-[0_0_7px_#999] rounded-[15px] p-[10px] relative mr-28"

        if(location.pathname.indexOf("/courses") !== -1) {
            let isAccept = document.createElement("div");
            if(element.accept) isAccept.className = element.accept ? "absolute left-3 top-2 text-[15px] text-[#36c54e]" : "absolute left-3 top-2 text-[15px] text-[#c33b3b]"
            isAccept.innerHTML = element.accept ? "پذیرفته شده" : "پذیرفته نشده"
            parent.appendChild(isAccept)
        }

        let top = document.createElement("div");
        top.className = "text-[18px] my-1 flex [&>span]:mx-[10px]"
    
        let span1 = document.createElement("span");
        span1.className = "order-1"
        span1.innerHTML = element?.author ? element.author : element.title
        top.appendChild(span1)
    
        let span2 = document.createElement("span");
        span2.className = "order-2"
        span2.innerHTML = "|"
        top.appendChild(span2)
    
        let span3 = document.createElement("span");
        span3.className = "order-2"
        span3.innerHTML = element.insertDate ? element.insertDate.slice(0,10).replace("-","/").replace("-","/") : element.inserDate.slice(0,10).replace("-","/").replace("-","/")
        top.appendChild(span3)
        
        parent.appendChild(top)
    
        let desc = document.createElement("p");
        desc.className = "text-[#707070] text-[15px] my-1 inline-block"
        desc.innerHTML = element.describe
        parent.appendChild(desc)
    
        let likeAndDisslike = document.createElement("div");
        likeAndDisslike.className = "w-[130px] h-[25px] flex justify-evenly items-center my-1"
    
        let like = document.createElement("div");
        like.className = "flex items-center"
    
        let likeSpan = document.createElement("span");
        likeSpan.className = location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "LIKED" ? "text-[#37c54f]" : "text-[#000]" : element.currentUserIsLike ? "text-[#37c54f]" : "text-[#000]"
        likeSpan.innerHTML = element?.likeCount == 0 ? 0 : element?.likeCount || element?.commentLike
        like.appendChild(likeSpan)
    
        let likeImg = document.createElement("img");
        likeImg.className = "mx-2 mb-2 w-6 cursor-pointer"
        likeImg.setAttribute("data-id" , index)
        likeImg.src = location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "LIKED" ? "../src/assets/images/selectedCourse/like.png" : "../src/assets/images/selectedCourse/likeDefault.png" : element.currentUserIsLike ? "../src/assets/images/selectedCourse/like.png" : "../src/assets/images/selectedCourse/likeDefault.png"
        likeImg.onclick = (e)=> {
            likeDissLikeCourse(element.id,"Like",true,element,e,url)
            creatingReply(parentElement,url,true)
        }
        like.appendChild(likeImg)
    
        likeAndDisslike.appendChild(like)
    
        let space = document.createElement("span");
        space.innerHTML = "|"
        likeAndDisslike.appendChild(space)
    
        let dissLike = document.createElement("div");
        dissLike.className = "flex items-center mr-2"
    
        let dissLikeSpan = document.createElement("span");
        dissLikeSpan.className = location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "DISSLIKED" ? "text-[#ec0b1a]" : "text-[#000]" : element.currentUserIsDissLike ? "text-[#ec0b1a]" : "text-[#000]"
        dissLikeSpan.innerHTML = element?.disslikeCount == 0 ? 0 : element?.disslikeCount || element?.dissLikeCount
        dissLike.appendChild(dissLikeSpan)
    
        let dissLikeImg = document.createElement("img");
        dissLikeImg.className = "mr-2 mt-2 w-6 cursor-pointer"
        dissLikeImg.setAttribute("data-id" , index)
        dissLikeImg.src = location.pathname.indexOf("courses") !== -1 ? element?.currentUserEmotion == "DISSLIKED" ? "../src/assets/images/selectedCourse/disslike.png" : "../src/assets/images/selectedCourse/disslikeDefault.png" : element.currentUserIsDissLike ? "../src/assets/images/selectedCourse/disslike.png" : "../src/assets/images/selectedCourse/disslikeDefault.png"
        dissLikeImg.onclick = (e)=> { 
            likeDissLikeCourse(element.id,"DissLike",false,element,e,url)
            creatingReply(parentElement,url,true)
        }
        dissLike.appendChild(dissLikeImg)
    
        likeAndDisslike.appendChild(dissLike)
    
        parent.appendChild(likeAndDisslike)
    
        let repParent = document.createElement("div");
        repParent.className = "flex items-center justify-between absolute left-[20px] bottom-[10px] [&>img]:cursor-pointer"
    
        let showRepParent = document.createElement("div");
        showRepParent.className = "text-[#777] cursor-pointer flex items-center"
        // showRepParent.onclick = showResponse(e,element,index)
    
        repParent.appendChild(showRepParent)
    
        parent.appendChild(repParent)
    
        parentItem.appendChild(parent)
    })
}
const create = async (element,url) => {

    creatingReply(element,url,false)
}

export default create