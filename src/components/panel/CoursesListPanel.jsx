import { useRef } from 'react'
import ListCousePanelMap from '../map/ListCousePanelMap'
import Paginate from '../common/Paginate'
import ReserveCourseMap from '../map/ReserveCourseMap'
import FavoriteCourseMap from '../map/FavoriteCourseMap'
import FavoriteNewsMap from '../map/FavoriteNewsMap'


const CoursesListPanel = ({bool,s1,s2,s3,s4,s5,s6,classNameSpans}) => {

    const inpurSearch = useRef()

  return (
    <div className="w-[79%] max-[1260px]:w-[94%] bg-white">


        <div className="h-[15%] [&>div]:h-full [&>div]:w-[35%] flex justify-between ">

            <div className="flex justify-center items-center"> 
            
                <div className="bg-[#EEE6F6] w-[75%] h-[40%] rounded-[50px] flex items-center justify-around overflow-hidden pr-[10px] border border-[transparent] transition-all duration-300 hover:border hover:border-[#955ecc]">
                    <img src="../src/assets/images/header/search.png" alt="" className=" w-[30px] h-[30px]" />
                    <input ref={inpurSearch} dir="rtl" type="text" className="w-[75%] h-full border-none outline-none bg-[#EEE6F6] placeholder:text-[#7F42BC] text-[#7F42BC]" placeholder="جستجو" id='inpurSearch'/>
                </div>

            </div>
            <div dir="rtl" className="flex items-center px-[15px]"></div>

        </div>
        <div className="h-[72%] m-[25px] mt-[0] bg-[#f1f1f1] rounded-[25px] max-[1350px]:overflow-x-scroll" dir='rtl'>
            <div className={"pr-[40px] w-[90%] h-[15%] flex flex-row-reverse justify-evenly items-center mx-[auto] max-[1350px]:w-[900px] " + classNameSpans}>
                
                <span>{s1}</span>
                <span>{s2}</span>
                <span>{s3}</span>
                <span>{s4}</span>
                <span>{s5}</span>
                <span>{s6}</span>
                
            </div>
            <div className="h-[85%] mx-auto px-[15px] max-[1350px]:h-[80%]">
                {/* {bool && <ListCousePanelMap inpurSearch={inpurSearch} />} */}
                {location.pathname == "/panel/ListOfCourse" && <ListCousePanelMap inpurSearch={inpurSearch} />}
                {location.pathname == "/panel/reserveCourse" && <ReserveCourseMap />}
                {location.pathname == "/panel/favoriteCourse" && <FavoriteCourseMap />}
                {/* {location.pathname == "/panel/favoriteNews" && <FavoriteNewsMap />} */}
                  
            </div>
        </div>
        <div className={(location.pathname.indexOf("/panel/ListOfCourse") !== -1 && location.pathname.indexOf("/panel/favoriteCourse") == -1 && location.pathname.indexOf("/panel/favoriteNews") == -1) ? 'py-[1px] bg-[#f1f1f1] rounded-[25px] px-[15px] w-[35%] mx-auto' : ""}>

            {location.pathname.indexOf("/panel/ListOfCourse") !== -1 && <Paginate itemsPerPage={6} />}

        </div>


    </div>

  )
}

export default CoursesListPanel