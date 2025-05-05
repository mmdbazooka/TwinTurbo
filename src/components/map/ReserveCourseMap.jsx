import { useState , useEffect } from "react"
import customAxios from "../../core/services/interceptor"
import { useNavigate } from "react-router-dom"

const ReserveCourseMap = () => {

    let navigate = useNavigate()
    const [reserveCourse, setReserveCourse] = useState()

    const getReserveCourse = async() => {
        let res = await customAxios.get("/SharePanel/GetMyCoursesReserve")

        setReserveCourse(res)
    }

    const goToCourse = (element) => navigate("/courses/" + element.courseId); 

    const handelDeleting = async (element) => {
        await customAxios.delete("/CourseReserve",{
            data : { id : element.reserveId}
        });
        getReserveCourse()
    }

    useEffect(() => {
        getReserveCourse()
    }, [])
    
    return (
            
            reserveCourse?.map((element,index)=> {
                return (
                    <div key={index} className='max-[1350px]:w-[900px] h-[80px] bg-[#fff] my-[7px] pr-60 rounded-[25px] flex flex-row-reverse items-center justify-around [&>span]:w-[110px] px-[10px] [&>span]:text-center' data-id={`${index+1}`} >
                        <div className="flex [&>img]:mx-[15px]">
                            <img src="../src/assets/images/panel/view.svg" alt="" className='cursor-pointer w-[35px]' onClick={()=> goToCourse(element)}/>
                            <img src="../src/assets/images/dashboard/Recycle Bin.png" alt="" className='w-[30px] cursor-pointer' onClick={()=> handelDeleting(element)}/>
                        </div>

                        <span dir='rtl'>{element.reserverDate?.slice(0,10)}</span>
                        <span dir='rtl' className={element.accept ? "text-[#36c54e]" : "text-[#ec0b1a]"}>{element.accept ? "فعال" : "غیر فعال"}</span>
                        <span dir='rtl' className="whitespace-nowrap mr-[-25px]">{element.courseName}</span>

                    </div>
                )
            })
        
    )
}

export default ReserveCourseMap