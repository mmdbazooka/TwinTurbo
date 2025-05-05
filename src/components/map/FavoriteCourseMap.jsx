import { useState , useEffect } from "react"
import customAxios from "../../core/services/interceptor"
import { useNavigate } from "react-router-dom"

const FavoriteCourseMap = () => {

    let navigate = useNavigate()
    const [favoriteCourse, setFavoriteCourse] = useState()

    const getFavoriteCourse = async() => {
        let res = await customAxios.get("/SharePanel/GetMyFavoriteCourses")
        setFavoriteCourse(res.favoriteCourseDto)
    }

    

    useEffect(() => {getFavoriteCourse()}, [])

    const handelDeleting = async (element) => {
        let formData = new FormData()
        formData.append("CourseFavoriteId",element.favoriteId)
        await customAxios.delete("/Course/DeleteCourseFavorite",{
            data : formData
        });
        getFavoriteCourse()
    }
    const goToCourse = (element) => navigate("/courses/" + element.courseId)
    
    return (
        
            favoriteCourse?.map((element,index)=> {
                return (
                    <div key={index} className='max-[1350px]:w-[900px] h-[80px] bg-[#fff] my-[7px] rounded-[25px] flex flex-row-reverse items-center justify-around [&>span]:w-[110px] px-[10px] [&>span]:text-center' data-id={`${index+1}`} >

                        <img src="../src/assets/images/dashboard/Recycle Bin.png" alt="" className='w-[30px] cursor-pointer' onClick={()=> handelDeleting(element)}/>
                        <img src="../src/assets/images/panel/view.svg" alt="" className='w-[30px] cursor-pointer' onClick={()=> goToCourse(element)}/>

                        <span dir='rtl'>{element.lastUpdate.slice(0,10)}</span>
                        <span dir='rtl'>{element.typeName}</span>
                        <span dir='rtl'>{element.levelName}</span>
                        <span dir='rtl'>{element.teacheName}</span>
                        <span dir='rtl'>{element.courseTitle}</span>

                        <img src={element?.tumbImageAddress !== null ? element?.tumbImageAddress.indexOf("https://") !== -1 ? element?.tumbImageAddress : "../src/assets/images/courses/03.png" : "../src/assets/images/courses/03.png"} alt="" className='w-[90px] h-[80%] rounded-[15px]' />
                    </div>
                )
            })

    )
}

export default FavoriteCourseMap