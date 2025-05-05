import { Header,Footer,SelectOption,View, Paginate } from '../components/common'
import changeViewCourses from "../core/utils/changeViewCourse.utils";
import { useEffect, useRef , useState} from "react"
import CoursesMap, { costDowner, costUpper, settingCourseTypeId, settingInput, settingLevel, settingTechnologies, tech } from '../components/map/CoursesMap'
import resizeCourse from '../core/utils/resizeCourse.utils'
import SortCourse from '../components/course&blog/SortCourse'
import Loading from '../components/common/Loading';
import customAxios from '../core/services/interceptor';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export let settingCountCourse;

const Courses = () => {
    let priceFrom = useRef();
    let priceTo = useRef();
    let filterParent = useRef();
    let parent = useRef();
    const time = useRef();
    const costD = useRef();
    const costU = useRef();
    const input = useRef();
    const [counter, setCounter] = useState(6)
    const [courseType, setCourseType] = useState()
    const [courseLevel, setCourseLevel] = useState()
    const [courseTechnologies, setCourseTechnologies] = useState()
    let flag = [false , false , false , false]
    let flagFilter = false;

    let state = sessionStorage.getItem("courseClass")  

    const getCourseTypes = async () => {
      let res = await customAxios.get("/CourseType/GetCourseTypes")
      setCourseType(res)
    }
    const getCourseTechnologies = async () => {
      let res = await customAxios.get("/Home/GetTechnologies")
      setCourseTechnologies(res)
    }
    const getCourseLevel = async () => {
      let res = await customAxios.get("/CourseLevel/GetAllCourseLevel")
      setCourseLevel(res)
    }

    useEffect(() => {
      getCourseTypes()
      getCourseLevel()
      getCourseTechnologies()
      settingCountCourse = setCounter
      if(!state) sessionStorage.setItem("courseClass" , "grid")
      window.onresize = () => {resizeCourse(parent)}
      return () => { window.onresize = () => {return false}}
    }, [])


  const changer = (e) => {
    clearTimeout(time.current)
    let timeOut = setTimeout(() => {
      settingInput(e.target.value)
    }, 1000);
    time.current = timeOut
  }

  const openAcc = (e,h,id) => {
    if(e.target.nodeName == "DIV") {
      if(!flag[id]) {
        e.target.nextElementSibling.style.height = h + "px"
        filterParent.current.style.height = Math.ceil(filterParent.current.style.height.slice(0,filterParent.current.style.height.indexOf("p"))) + h + "px"
        e.target.nextElementSibling.style.borderBottom = "1px solid #cdcdcd"
        flag[id] = true
      }
      else if(flag[id]) {
        e.target.nextElementSibling.style.height = "0px"
        filterParent.current.style.height = Math.ceil(filterParent.current.style.height.slice(0,filterParent.current.style.height.indexOf("p"))) - h + "px"
        e.target.nextElementSibling.style.borderBottom = "1px solid transparent"
        flag[id] = false
      }
      e.target.children[1].classList.toggle("rotate-180")
    }
    else return
  }
  const handlePrice = e => {
    priceFrom.current.innerHTML = e[0]
    priceTo.current.innerHTML = e[1]
    costDowns(e)
    costUps(e)
  }
  
  const costDowns = (e) => {
    clearTimeout(costD.current)
    let timeOut = setTimeout(() => {
      costDowner(e[0])
    }, 1000);
    costD.current = timeOut
  }
  const costUps = (e) => {
    clearTimeout(costU.current)
    let timeOut = setTimeout(() => {
      costUpper(e[1])
    }, 1000);
    costU.current = timeOut
  }
  
  const handleFilter = () => {
    if(flagFilter) {
      parent.current.style.width = "100%"
      flagFilter = false
    }
    else if(!flagFilter) {
      parent.current.style.width = "80%"
      flagFilter = true
    }
    filterParent.current.classList.toggle("hidden")
  }
  return (
    <>
      <Loading time={500} />
      <div className="w-[1920px] max-[1920px]:w-full mx-auto my-0 overflow-hidden">
        <Header src="avatar.png" ml="25px" color="#5A0BA9" />

        <div className="w-full  flex flex-col items-center">
          <div className="inline-block my-[55px] px-[95px] py-[12px] rounded-[18px] text-[25px] shadow-[0_0_7px_#ccc] bg-white dark:bg-[#26324d] dark:text-white">
            دوره
          </div>
          <div className="hover:border hover:border-[#955ecc] border border-[transparent] transition-all duration-300 bg-[#EEE6F6] dark:bg-[#26324d] w-[400px] h-[50px] my-[15px] rounded-[50px] flex items-center justify-around overflow-hidden pr-[10px]">
              <img src="../src/assets/images/header/search.png" alt="" className=" w-[30px] h-[30px]" id="searchImg" />
              <input dir="rtl" ref={input} onInput={(e)=>changer(e)} type="text" className="w-[75%] h-full border-none outline-none bg-[#EEE6F6] dark:bg-[#26324d] placeholder:text-[#7F42BC] dark:placeholder:text-white text-[#7F42BC] dark:text-white" placeholder="جستجو" id='inpurSearch'/>
          </div>
          <div className="w-[90%] h-[100px] flex items-center max-[801px]:justify-center min-[801px]:justify-between">
            <SelectOption />

            <div className="bg-white dark:bg-[#26324d] w-[40%] min-w-[510px] [&>*]:mx-2 whitespace-nowrap max-[801px]:ml-[25px] max-[770px]:mx-auto max-[770px]:scale-[90%] max-[770px]:w-full max-[450px]:[&>*]:text-[14px] max-[1500px]:w-[65%] h-[60px] p-[7px] flex items-center justify-around rounded-[18px] text-[25px] shadow-[0_0_7px_#ccc] [&>input]:hidden [&>label]:py-[8px] [&>label]:cursor-pointer [&>input:checked+label]:border-b-[#333] dark:[&>label]:text-white dark:[&>input:checked+label]:border-b-white [&>input:checked+label]:border-b-[4px] max-[1700px]:text-[20px] max-[1170px]:text-[18px] max-[990px]:text-[16px] max-[480px]:scale-75 max-[395px]:scale-50">
              <SortCourse type="Active" id="radio5" htmlFor="radio5" text="همه" defaultChecked={true}/>
              <SortCourse type="insertDate" id="radio4" htmlFor="radio4" text="جدید ترین" defaultChecked={false}/>
              <SortCourse type="likeCount" id="radio3" htmlFor="radio3" text="محبوب ترین" defaultChecked={false}/>
              <SortCourse type="currentRegistrants" id="radio2" htmlFor="radio2" text=" تعداد دانشجو" defaultChecked={false}/>
              <SortCourse type="cost" id="radio1" htmlFor="radio1" text="پرفروش ترین" defaultChecked={false}/>
            </div>

            <div className="flex justify-around items-center w-[250px]">
              <div className="px-6 py-3 bg-white dark:bg-[#26324d] dark:text-white border rounded-xl cursor-pointer flex items-center justify-around" onClick={handleFilter}> <img src="../src/assets/images/arrow-down.png" className="mr-1" /> فیلتر ها</div>
              <div className="bg-white dark:bg-[#26324d] max-[800px]:hidden w-[120px] h-[60px] p-[5px] flex items-center justify-around rounded-[18px] text-[25px] shadow-[0_0_7px_#ccc] [&>img]:h-[35px] [&>img]:mx-[5px] [&>img]:cursor-pointer [&>input]:hidden [&>label]:cursor-pointer [&>label]:py-[8px] [&>input:checked+label]:border-b-[#333] dark:[&>input:checked+label]:border-b-white [&>input:checked+label]:border-b-[4px]">
                <View id="radios1" htmlFor="radios1" defaultChecked={state ? state == "grid" ? true : false : true} src="view (1).png" onInput={()=> {changeViewCourses(parent);sessionStorage.setItem("courseClass","grid")}}/>
                <View id="radios2" htmlFor="radios2" defaultChecked={state ? state == "table" ? true : false : false} src="view (2).png" onInput={()=> {changeViewCourses(parent);sessionStorage.setItem("courseClass","table")}}/>
              </div>
            </div>
          </div>
          <div dir="rtl" className="w-[90%] flex flex-wrap justify-between">
            
            <div ref={filterParent} className="hidden transition-all duration-300 flex flex-col justify-start border border-[#cdcdcd] rounded-3xl w-[20%] [&>div.top-acc:not([&>div.top-acc:last-child])]:border-b-2 [&>div.top-acc]:border-[#cdcdcd] [&>div.top-acc]:h-[80px] [&>div.top-acc]:flex [&>div.top-acc]:justify-between [&>div.top-acc]:items-center [&>div.top-acc]:px-5 [&>div.top-acc]:cursor-pointer" style={{height : 385}}>

              <div className='top-acc' onClick={e => openAcc(e,140,0)}>
                <span className="text-[24px]">نوع دوره</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className={`h-6 w-6 transition-transform`} >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  
                  />
                </svg>
              </div>

              <div className='transition-all duration-300 overflow-hidden pr-2 flex flex-col items-start justify-center m-2 [&>div>*]:cursor-pointer [&>div>label]:text-[20px] [&>div>label]:mr-2 [&>div]:my-2' style={{height : 0}}>
                {courseType?.map((el,index) => {
                  return  <>
                    <div key={index}>
                      <input type="radio" name="courseType" id={`courseType${el.id}`} onInput={() => settingCourseTypeId(el.id)} className='w-5 h-5' />
                      <label htmlFor={`courseType${el.id}`}>{el.typeName}</label>
                    </div>
                  </>
                })}
                  <div>
                    <input type="radio" name="courseType" id="all" onInput={() => settingCourseTypeId("")} className='w-5 h-5' />
                    <label htmlFor="all">همه</label>
                  </div>
              </div>

              <div className='top-acc' onClick={e => openAcc(e,180,1)}>
                <span className="text-[24px]">سطح دوره</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className={`h-6 w-6 transition-transform`}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>

              <div className='transition-all duration-300 overflow-hidden pr-2 flex flex-col items-start justify-center m-2 [&>div>*]:cursor-pointer [&>div>label]:text-[20px] [&>div>label]:mr-2 [&>div]:my-2' style={{height : 0}}>
              
                {courseLevel?.map((el,index) => {
                  return  <>
                    <div key={index}>
                      <input type="radio" name="courseLevel" id={`courseLevel${el.id}`} onInput={() => settingLevel(el.id)} className='w-5 h-5' />
                      <label htmlFor={`courseLevel${el.id}`}>{el.levelName}</label>
                    </div>
                  </>
                })}
                <div>
                  <input type="radio" name="courseLevel" id="courseLevel" onInput={() => settingLevel("")} className='w-5 h-5' />
                  <label htmlFor={`courseLevel`}>همه</label>
                </div>

              </div>
              
              <div className='top-acc' onClick={e => openAcc(e,380,2)}>
                <span className="text-[24px]">دسته بندی</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className={`h-6 w-6 transition-transform`}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>

              <div className='transition-all duration-300 overflow-hidden pr-2 flex flex-col items-start justify-center m-2 [&>div>*]:cursor-pointer [&>div>label]:text-[20px] [&>div>label]:mr-2 [&>div]:my-2' style={{height : 0}}>
              
                {courseTechnologies?.map((el,index) => {
                  return  <>
                    <div key={index}>
                      <input type="checkbox" name="courseTechnologies" id={`courseTechnologies${el.id}`} onInput={() => settingTechnologies(tech ? [...tech , el.id] : [el.id] )} className='w-5 h-5' />
                      <label htmlFor={`courseTechnologies${el.id}`}>{el.techName}</label>
                    </div>
                  </>
                })}

              </div>

              <div className='top-acc' onClick={e => openAcc(e,200,3)} >
                <span className="text-[24px]">قیمت</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className={`h-6 w-6 transition-transform`}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>

              <div className='transition-all duration-300 overflow-hidden pr-4 gap-3 flex flex-col items-start justify-center text-[21px] [&>div]:my-2' style={{height : 0 , borderRadius : "20px"}}>
              
                <RangeSlider className="bg-[#ccc] w-[95%] [&>div]:bg-purple-500" onInput={e => handlePrice(e)} step="5000" min="0" max="500000" defaultValue={[0,500000]} />

                <div>از <span ref={priceFrom} className="mx-2">0</span> تومان </div>
                <div>تا <span ref={priceTo} className="mx-2">500000</span> تومان </div>

              </div>

            </div>

            <div className="flex flex-wrap justify-center content-start" ref={parent} style={{width : "100%"}}>
              <CoursesMap parent={parent} />
            </div>
          </div>
          <div className="w-full h-[70px] m-[25px] rounded-[25px] flex justify-center items-center">
            <div className="w-[400px] h-full shadow-[0_0_7px_#cdcdcd] rounded-[25px] bg-white dark:bg-[#26324d]">
              <Paginate itemsPerPage={counter} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Courses;
