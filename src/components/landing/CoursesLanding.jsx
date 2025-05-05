import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import TitleComponents from "./TitleComponents";
import landingCourseSelector from '../../core/utils/landingCourseSelector.utils'
import customAxios from '../../core/services/interceptor/index'

export let setCurItem;
const Courses = () => {

    let bigPic = useRef()
    let title = useRef()
    let master = useRef()
    let content = useRef()
    let landingCourse = useRef()


    const [courseId, setCourseId] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [item, setItem] = useState([])
    setTimeout(() => {setCourseId(landingCourse.current.getAttribute("data-id"))}, 10);
    
    const getCourse = async () => {
        let result = await customAxios.get("/Home/GetCoursesTop?Count=3")
        console.log(result);
        setItem(result)
        setCurrentItem(result[1])
    }
    
    
    useEffect(() => {
        setCurItem = setCurrentItem
        getCourse()
        setCourseId(item[1]?.courseId)
    }, [])
    
    return (
        <div className="w-full relative max-[1600px]:flex-col">
            
            <div className="h-[250px] flex justify-center">

            <TitleComponents title="دوره ها" content="اخرین دوره های موجود" src="courses-title.png" className="flex mb-[45px]" />

            </div>

            <div className="max-[1250px]:w-[90%] max-[700px]:[&>div]:w-[95%] max-[820px]:[&>div]:w-[680px] max-[900px]:[&>div]:w-[800px] max-[900px]:[&>div]:mx-auto max-[1020px]:w-full max-[1020px]:flex-col-reverse max-[1020px]:items-center [&>div]:shadow-[0_0_7px_#ccc] dark:[&>div]:shadow-none  mx-auto [&>div]:mx-[30px] flex min-[1601px]:justify-center justify-center max-[1600px]:[&>div]:my-[15px]" >

                <div className="[&>img:not(&>img:first-child):hover]:shadow-[0_0_25px_#999] bg-white dark:bg-gradient-to-br from-[#2e3a56] to-[#171f33] w-[350px] max-[820px]:h-[150px] h-[600px] rounded-[25px] flex flex-col max-[1020px]:flex-row justify-around items-center transition-all duration-100 relative max-[1020px]:h-[200px] max-[1020px]:w-[80%] max-[450px]:h-[105px]" >
                    <img src="../src/assets/images/landingCourse/c-i-1.png" alt="" className="absolute left-[-160%] bottom-0 z-10 transition-all duration-1000 h-[250px] max-[1020px]:hidden"  id="coursesHolder1" />
                     {
                        item?.map((el,index)=> {
                            return (
                                <img key={index} src={el?.tumbImageAddress !== null ? el?.tumbImageAddress.indexOf("https://") !== -1 ? el?.tumbImageAddress : "../src/assets/images/courses/03.png" : "../src/assets/images/courses/03.png"} alt="" className="w-[85%] h-[150px] cursor-pointer rounded-[20px] max-[1020px]:w-[180px] max-[620px]:w-[150px] max-[510px]:w-[130px] max-[450px]:w-[120px] max-[1020px]:h-[110px] max-[450px]:h-[80px] max-[400px]:w-[100px] " data-id={index++} data-courseid={el.courseId} onClick={(e)=> landingCourseSelector(e,landingCourse?.current,setCourseId)}/>
                            )
                        })
                     }
                    <Button content="بیشتر" link="/courses" className="mx-auto max-[1020px]:hidden" />

                </div>
                
                <div className="bg-white dark:bg-gradient-to-tl from-[#2e3a56] to-[#171f33] w-[650px] max-[400px]:h-[400px] max-[963px]:h-[250px] h-[600px] relative py-[15px] rounded-[25px] transition-all duration-150 max-[1020px]:w-[80%] max-[1020px]:flex max-[1020px]:flex-row-reverse max-[1020px]:h-[300px] max-[1020px]:items-center max-[650px]:h-[400px] max-[650px]:flex-col " data-courseid={item[1]?.courseId} ref={landingCourse}>
                    <img src="../src/assets/images/landingCourse/c-i-2.png" alt="" className="absolute right-[-100%] top-[0px] w-28 -z-10 transition-all duration-1000 max-[1020px]:hidden " id="coursesHolder2"/>
                    <img src={currentItem?.tumbImageAddress !== null ? currentItem?.tumbImageAddress.indexOf("https://") !== -1 ? currentItem?.tumbImageAddress : "../src/assets/images/courses/03.png" : "../src/assets/images/courses/03.png"} alt="" className="max-[560px]:w-[90%] max-[450px]:w-full max-[1020px]:scale-[80%] max-[963px]:w-[70%] max-[963px]:h-[230px] w-[90%] h-[280px] mx-auto rounded-[15px]" ref={bigPic}/>
                    <div className=" max-[650px]:mt-[15px] max-[400px]:mt-[15px] max-[650px]:pr-[15px] w-[90%] mx-auto relative max-[1020px]:left-[25px] max-[1020px]:bottom-[65px] max-[960px]:bottom-[50px] max-[903px]:bottom-[40px]">
                        <div className="max-[400px]:flex-col-reverse px-[10px] max-[650px]:items-end max-[400px]:mt-[20px] h-[50px] flex justify-between items-center relative top-[10px] max-[650px]:flex-row ">
                            <div className="flex justify-center items-center">
                                <div className="text-[18px] max-[1020px]:text-[16px] max-[450px]:text-[15px] max-[400px]:mb-[-11px] dark:text-[#f5f5f5] relative max-[650px]:left-[-15px]" ref={master}>{currentItem?.teacherName.length < 13 ? currentItem?.teacherName : currentItem?.teacherName.slice(0,13)}</div> 
                                <span className="ml-1"> : مدرس</span> 
                            </div>
                            <div className="text-[24px] max-[500px]:text-[20px] max-[450px]:text-[18px] dark:text-[#fff] max-[1020px]:text-[18px]" ref={title}> دوره کامل : {currentItem?.title}</div>
                        </div>
                        <div className="mt-[30px] break-words text-[17px] text-[#777] px-[10px] dark:text-[#fff] leading-9 max-[650px]:mb-5 max-[1020px]:leading-6 max-[450px]:text-[14px] max-[1020px]:text-[15px]" dir="rtl" ref={content}>{currentItem?.describe}</div>
                    </div>
                    <Button content="مشاهده دوره" className="absolute left-7 bottom-4 max-[1020px]:bottom-[40px] max-[900px]:scale-[70%] max-[900px]:bottom-[20px] max-[650px]:bottom-[10px]" link={"/courses/" + landingCourse?.current?.getAttribute("data-courseid") } />
                </div>

            </div>
        </div>
    );
};

export default Courses;

