import TitleComponents from "./TitleComponents"
import Master from '../common/Master'
import customAxios from '../../core/services/interceptor'
import { useEffect , useState } from "react"

const Masters = () => {
    const [teacher, setTeacher] = useState([])
    
    const getTeacher = async () => {

      let res = await customAxios.get("/Home/GetTeachers")
      setTeacher(res.slice(3,6))

    }

    useEffect(() => {
      getTeacher()
    }, [])
    
    return (
      <div className='w-full flex flex-col justify-center items-center relative [&>div]:my-8'>
          <TitleComponents title="اساتید برتر" content="استاد های مهربون و دوست داشتی" src="courses-title.png" className="flex" />

          <div className="[&>div]:h-full w-[550px] h-[220px] rounded-[15px] flex max-[600px]:flex-col-reverse relative shadow-[0px_0px_6px_#ccc] dark:shadow-none bg-white dark:bg-[#26324D] max-[1300px]:scale-[90%] transition-all duration-1000 max-[1023px]:w-[90%] max-[600px]:h-[400px]">
              <div dir="rtl" className="w-[80%] max-[600px]:w-full flex flex-col justify-center max-[600px]:items-center [&>p]:py-[4px] max-[600px]:pr-[0px] pr-[25px]">
                <p className="text-[22px] dark:text-[#fff]">دکتر بحرالعلوم</p>
                <p className="text-[#555] dark:text-[#f5f5f5]">مدیریت</p>
                <p dir="rtl" className="text-[#777] w-[90%] dark:text-[#f1f1f1]">مدرس در آموزشگاه  , مدرس در دانشگاه علم و فناوری مازندران مستقر در بهشهر , مدرس دوره های وب</p> 
              </div>
              <div className="w-[20%]  flex items-center justify-center max-[600px]:w-full">
                  <img src="../src/assets/images/landingMaster/ostad.jpg" alt="" className="rounded-[10px] w-[150px] max-[600px]:ml-[0px] ml-[50px]" /> 
              </div>
              
          </div>
          <div className="w-[60%] opacity-0 transition-all duration-[2s] flex flex-wrap justify-around items-center [&>div]:flex [&>div]:flex-col [&>div]:justify-center [&>div]:items-center [&>div]:max-[1300px]:scale-[90%] [&>div]:max-[1024px]:transition-all [&>div]:max-[1024px]:duration-500 [&>div]:max-[1024px]:w-[90%] whitespace-nowrap" id="holderMasters">
              {
                teacher.map((element,index)=> <Master key={index} name={element.fullName} ability="طراح فرانت" src={element.pictureAddress} />)
              }
          </div>
          <img src="../src/assets/images/landingMaster/Path 564.png" alt="" className="absolute bottom-[200px] right-[-50px] scale-[70%] max-[1300px]:scale-[60%] max-[1300px]:right-[-65px] max-[1120px]:scale-[55%] max-[1024px]:hidden transition-all duration-700" id="mas2"/>
          <img src="../src/assets/images/landingMaster/77777.png" alt="" className="absolute top-[100px] left-[-120px] scale-[70%] max-[1300px]:scale-[60%] max-[1300px]:left-[-135px] max-[1120px]:scale-[50%] max-[1120px]:left-[-158px] max-[1023px]:hidden transition-all duration-700" id="mas1"/>
      </div>
    )
}

export default Masters