import { useLocation, useNavigate } from "react-router-dom";
import { useRef , useState , useEffect } from "react";
import customAxios from '../../core/services/interceptor'
import ReactStars from "react-stars";
import changeViewCourses from "../../core/utils/changeViewCourse.utils";
import { settingDbCourse } from "../common/Paginate";

export let addToCourse , Rows , tech , costDowner , costUpper , settingTechnologies , settingPageNumber , settingSort , settingInput , settingLevel , settingCourseTypeId;

const CoursesMap = ({parent}) => {
    let view1 ="w-[350px] h-[400px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex flex-col justify-end overflow-hidden hover:shadow-[0_0_7px_#999] active:bg-[#eee] cursor-pointer";
    let view2 ="w-[95%] h-[300px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex overflow-hidden hover:shadow-[0_0_7px_#999] active:bg-[#eee] cursor-pointer [&>div:nth-child(2)>div:first-child]:h-[20%] [&>div:nth-child(2)>div:first-child]:h-[80%] [&>div:nth-child(2)>div:first-child]:w-full [&>div:nth-child(2)>div:first-child]:pt-[30px] [&>div:nth-child(2)]:h-full [&>div:nth-child(2)>div:first-child>p]:text-[28px] [&>div:nth-child(2)]:w-[65%] [&>div:nth-child(2)>div:first-child>div]:my-[40px] [&>div:first-child]:w-[31%] [&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:pr-[15px] [&>div:first-child]:h-[92%] [&>div:nth-child(2)>:first-child]:top-[45px] [&>div:first-child>img]:h-[85%] [&>div:last-child>div:last-child]:items-center";
  
    let state = sessionStorage.getItem("courseClass")
    let location = useLocation();
    let item = useRef();
    let navigate = useNavigate()
    let theme = localStorage.getItem("theme")

    
    const [course, setCourse] = useState([])
    const [rowsOfPage, setRowsOfPage] = useState(6)
    const [PageNumber, setPageNumber] = useState(1)
    const [costDown, setCostDown] = useState(0)
    const [costUp, setCostUp] = useState()
    const [level, setLevel] = useState()
    const [technologies, setTechnologies] = useState()
    const [courseTypeId, setCourseTypeId] = useState()
    const [sort, setSort] = useState("Active")
    const [input, setInput] = useState("")
    
    const getCoursesAll = async () => {
      let result = await customAxios.get(`/Home/GetCoursesWithPagination?PageNumber=${PageNumber}&RowsOfPage=${rowsOfPage}&SortingCol=${sort}&SortType=DESC${input ? `&Query=${input}` : ""}${courseTypeId ? `&CourseTypeId=${courseTypeId}` : ""}&CostDown=${costDown}${costUp ? `&CostUp=${costUp}` : ""}${level ? `&courseLevelId=${level}` : ""}${technologies ? `&ListTech=${technologies}` : ""}${technologies?.length == 1 ? "&TechCount=1" : technologies?.length == 2 ? "&TechCount=2" : ""}`) 
      setCourse(result.courseFilterDtos)
      settingDbCourse(result.totalCount)
      setTimeout(() => {changeViewCourses(parent)}, 50);
    }
    
    useEffect(() => {getCoursesAll()}, [rowsOfPage])
    
    useEffect(() => {getCoursesAll()}, [PageNumber])
    
    useEffect(() => {getCoursesAll()}, [sort])
    
    useEffect(() => {getCoursesAll()}, [input])

    useEffect(() => {getCoursesAll()}, [costDown])

    useEffect(() => {getCoursesAll()}, [costUp])

    useEffect(() => {getCoursesAll()}, [level])

    useEffect(() => {getCoursesAll()}, [technologies])

    useEffect(() => {getCoursesAll()}, [courseTypeId])
    
    useEffect(() => {
      tech = technologies
      settingTechnologies = setTechnologies
      settingLevel = setLevel
      costDowner = setCostDown
      costUpper = setCostUp
      settingCourseTypeId = setCourseTypeId
      addToCourse = setCourse
      Rows = setRowsOfPage
      settingPageNumber = setPageNumber
      settingSort = setSort
      settingInput = setInput
      getCoursesAll()
    
      changeViewCourses(parent)
    }, [])
    return (

      course.map((element, index) => {
          return (
              <div key={index} className={state == "grid" ? view1 : view2} ref={item} onClick={()=> navigate(`${location.pathname}/${element.courseId}`)} >
                <div className="w-full h-[170px] overflow-hidden my-[10px]">
                  <img src={element?.tumbImageAddress !== null ? element?.tumbImageAddress.indexOf("https://") !== -1 ? element?.tumbImageAddress : "../src/assets/images/courses/03.png" : "../src/assets/images/courses/03.png"} className="mx-auto h-full w-full rounded-[20px]"/>
                </div>
                <div dir="rtl" className="w-full h-[210px] mx-auto relative">
                  <p className="text-[24px] absolute right-2 dark:text-white truncate w-[255px]">{element.title}</p>

                  <div className="w-7 absolute left-1 top-1 flex flex-col items-center">
                    <img src={theme == "light" ? "../src/assets/images/selectedCourse/likeDefault.png" : "../src/assets/images/selectedCourse/likeDefault-light.png"} className="likeCourse" alt="" />
                    <span className="mt-1 whitespace-nowrap dark:text-white">{element.likeCount}</span>
                  </div>
                  
                  <div className="w-7 absolute left-1 top-[70px] flex flex-col items-center">
                    <img src={theme == "light" ? "../src/assets/images/selectedCourse/disslikeDefault.png" : "../src/assets/images/selectedCourse/disslikeDefault-light.png"} className="dissLikeCourse" alt="" />
                    <span className="mt-1 whitespace-nowrap dark:text-white">{element.dissLikeCount}</span>
                  </div>

                  <div className="w-7 absolute left-1 bottom-4 flex flex-col items-center">
                    <img className="ml-1 registeredCourse" src={theme == "light" ? "../src/assets/images/selectedCourse/registered.png" : "../src/assets/images/selectedCourse/registered-light.png" } />
                    <div className="mt-1 whitespace-nowrap dark:text-white">{element.currentRegistrants}</div>
                  </div>

                  <div className=" flex justify-between items-start absolute bottom-[20px] h-[110px] mr-2" style={{flexDirection:"column",width:"180px"}}>
                      <div className="text-[20px] w-[200px] truncate dark:text-[#f9f9f9]">{element.teacherName}</div>
                      <div className="flex items-center justify-between text-[#888]">
                        <ReactStars size={30} color2="#ffbb1b" value={element.courseRate} half={false} edit={false} />
                        <span className="mr-2 dark:text-[#eee]">{element.courseRate}</span>
                      </div>
                      <span className="h-8 w-[230px] rounded-[50px] text-[#58AD57] dark:text-[#90dc8f] flex justify-start items-center"> <span className="text-[#000] dark:text-[#f5f5f5] text-[18px]"> مبلغ : </span> &nbsp; {element.cost} تومان</span>
                  </div>

                </div>
              </div>
          );
      })

    );
};
export default CoursesMap;