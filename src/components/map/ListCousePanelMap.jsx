import { useState , useEffect , useRef} from 'react'
import customAxios from '../../core/services/interceptor';
import { useNavigate } from 'react-router-dom';
export let settingPageNumberCoursePanel;
const ListCousePanelMap = ({inpurSearch}) => {

    const [course, setCourse] = useState([])
    const [input, setInput] = useState("")
    const [PageNumber, setPageNumber] = useState(5)
    let navigate = useNavigate()
    const time = useRef()

    const getCourse = async ()=> {
        let result = await customAxios.get(`/Home/GetCoursesWithPagination?PageNumber=${PageNumber}&RowsOfPage=6&&SortType=DESC${input ? `&Query=${input}` : ""}`)
        setCourse(result.courseFilterDtos)
    }
    useEffect(() => {getCourse()}, [input])
    useEffect(() => {getCourse()}, [PageNumber])
    
    useEffect(() => {
        settingPageNumberCoursePanel = setPageNumber
        inpurSearch.current.oninput = () => {
            clearTimeout(time.current)
            let timeOut = setTimeout(() => {setInput(inpurSearch.current.value)}, 1000);
            time.current = timeOut
        }
        getCourse()

    }, [])
    
    const findListCourse = (element) => navigate(`/courses/${element.courseId}`)
    return (
        course.map((element,index)=> {
            return (
                <div key={index} className='max-[1350px]:w-[900px] h-[80px] bg-[#fff] my-[7px] rounded-[25px] flex flex-row-reverse items-center justify-around [&>span]:w-[110px] px-[10px] [&>span]:text-center' data-id={`${index+1}`} >

                    <img src="../src/assets/images/panel/view.svg" alt="" className='w-[30px] h-[30px] cursor-pointer' onClick={()=> findListCourse(element)}/>

                    <span dir='rtl'>{element.cost}  تومان  </span>
                    <span dir='rtl'>{element.lastUpdate?.slice(0,10)}</span>
                    <span dir='rtl'>{element.statusName}</span>
                    <span dir='rtl'>{element.levelName}</span>
                    <span dir='rtl'>{element.teacherName}</span>
                    <span dir='rtl'>{element.title.slice(0,14)}</span>

                    <img src={element?.tumbImageAddress !== null ? element?.tumbImageAddress.indexOf("https://") !== -1 ? element?.tumbImageAddress : "../src/assets/images/courses/03.png" : "../src/assets/images/courses/03.png"} alt="" className='w-[90px] h-[80%] rounded-[15px]' />
                </div>
            )
        })
    )
  
  
}
export default ListCousePanelMap