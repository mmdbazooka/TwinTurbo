import { useEffect, useRef } from "react"
import headerScroll from "../../core/utils/headerScroll.utils"
import darkMode from "../../core/utils/darkMode.utils"
import { setttttttt } from "../landing/TitleComponents"
import { useLocation } from "react-router-dom"
import { sFillPath } from "../landing/footerSvg"
import { reRend } from "../map/SocialMediaMap"

const NightMode = ({bgClass}) => {
    
    let location = useLocation()
    let theme = localStorage.getItem("theme")
    if(!theme) localStorage.setItem("theme","light")

    const pic = useRef()

    useEffect(() => {
        darkMode()
    }, [])

    const changeMode = ()=> {

        let theme = localStorage.getItem("theme")
            
        if(theme == "light") {

            pic.current.src = "../src/assets/images/header/sun.png"
            localStorage.setItem("theme","dark")
            if(location.pathname == "/" || location.pathname.indexOf("/courses") !== -1 || location.pathname == "/blogs" || location.pathname == "/contact-us") {
                sFillPath("#0f172a")
                reRend(false)
            }  
            if(location.pathname.indexOf("/courses/") !== -1 || location.pathname.indexOf("/blogs/") !== -1) {
                
                if(btn1.style.background == "rgb(241, 235, 248)")  btn1.style.background = "#3c4e78"
                if(btn1.style.background == "transparent")  btn1.style.background = "transparent"
                if(btn2.style.background == "rgb(241, 235, 248)")  btn2.style.background = "#3c4e78"
                if(btn2.style.background == "transparent")  btn2.style.background = "transparent"
                let likeCourse = document.querySelectorAll(".likeCourses[src='../src/assets/images/selectedCourse/likeDefault.png']")
                likeCourse.forEach(e => e.src = "../src/assets/images/selectedCourse/likeDefault-light.png") 
                let dissLikeCourse = document.querySelectorAll(".dissLikeCourses[src='../src/assets/images/selectedCourse/disslikeDefault.png']")
                dissLikeCourse.forEach(e => e.src = "../src/assets/images/selectedCourse/disslikeDefault-light.png") 
                let replyImg = document.querySelectorAll(".replyImg")
                replyImg.forEach(e => e.src = "../src/assets/images/selectedCourse/reply-light.png") 
            }
            if(location.pathname == "/")  setttttttt(`../src/assets/images/landingCourse/courses-title-dark.png`)
        }
        else if(theme == "dark") {

            pic.current.src = "../src/assets/images/header/moon.png"
            localStorage.setItem("theme","light")
            if(location.pathname == "/" || location.pathname.indexOf("/courses") !== -1 || location.pathname == "/blogs" || location.pathname == "/contact-us") {
                sFillPath("#f5f5f5")
                reRend(true)
            }  
            if(location.pathname.indexOf("/courses/") !== -1 || location.pathname.indexOf("/blogs/") !== -1) {
                if(btn1.style.background == "rgb(60, 78, 120)")  btn1.style.background = "#f1ebf8"
                if(btn1.style.background == "transparent")  btn1.style.background = "transparent"
                if(btn2.style.background == "rgb(60, 78, 120)")  btn2.style.background = "#f1ebf8"
                if(btn2.style.background == "transparent")  btn2.style.background = "transparent"
                let likeCourse = document.querySelectorAll(".likeCourses[src='../src/assets/images/selectedCourse/likeDefault-light.png']")
                likeCourse.forEach(e => e.src = "../src/assets/images/selectedCourse/likeDefault.png") 
                let dissLikeCourse = document.querySelectorAll(".dissLikeCourses[src='../src/assets/images/selectedCourse/disslikeDefault-light.png']")
                dissLikeCourse.forEach(e => e.src = "../src/assets/images/selectedCourse/disslikeDefault.png") 
                let replyImg = document.querySelectorAll(".replyImg")
                replyImg.forEach(e => e.src = "../src/assets/images/selectedCourse/reply.png") 
            }
            if(location.pathname == "/")  setttttttt(`../src/assets/images/landingCourse/courses-title.png`)
        }
        darkMode()
        // for darkMode the header it should call here
        headerScroll()
        
    }

    return (
        <div className={"w-[50px] h-[45px] rounded-full p-[5px] max-[321px]:right-[-75px] flex justify-center items-center cursor-pointer " + bgClass} onClick={changeMode} >
            <img src={theme == "dark" ? "../src/assets/images/header/sun.png" : "../src/assets/images/header/moon.png" } alt="" className="w-[28px] h-[28px]" ref={pic}/>
        </div>
    )
}

export default NightMode