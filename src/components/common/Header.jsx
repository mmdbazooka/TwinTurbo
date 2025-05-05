import { useEffect, useRef, useState } from "react"
import { Menu , LinkComponent , Linkes, Button } from "./index"
import headerScroll from '../../core/utils/headerScroll.utils'
import NightMode from '../common/NightMode'
import customAxios from "../../core/services/interceptor"
import ReactStars from "react-stars"
import { useNavigate } from "react-router-dom"

const Header = ({className,src,color,borderClass,ml,iconClassName,headerLinksClassName}) => {

  const [iconeUser, setIconeUser] = useState()
  const [inputSearch, setInputSearch] = useState()
  const [coloring, setColor] = useState("course")
  const [course, setCourse] = useState([])
  const [news, setNews] = useState([])
  const time = useRef()
  const modalSearch = useRef()
  let navigate = useNavigate()

    let token = localStorage.getItem("token");
    let classUnAuthorize = " [&>a:nth-child(3)]:max-[1020px]:hidden [&>a:nth-child(2)]:max-[1020px]:hidden "
    let view1 ="w-[350px] h-[400px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex flex-col justify-end overflow-hidden hover:shadow-[0_0_7px_#999] active:bg-[#eee] cursor-pointer";
    let theme = localStorage.getItem("theme")



    const getProfileInformation = async() => {
        let result = await customAxios.get("/SharePanel/GetProfileInfo")
        setIconeUser(result.currentPictureAddress)
    }

    const changeColorFlag = () => {
      if(coloring == "course") setColor("news")
      else if(coloring == "news") setColor("course")
    }

    const getCoursesAll = async () => {
      let result = await customAxios.get(`/Home/GetCoursesWithPagination?${inputSearch == "" ? "Query=" : "Query="+inputSearch}`) 
      setCourse(result.courseFilterDtos)
    }

    const getNewsAll = async () => {
      let result = await customAxios.get(`/News?${inputSearch == "" ? "Query=undefined" : "Query="+inputSearch}`) 
      setNews(result.news)
    }
    
    const search = (e) => {

        clearTimeout(time.current)
        let timeOut = setTimeout(() => {
          setInputSearch(e.target.value)
        }, 700);
        time.current = timeOut

    }

    useEffect(() => {

        if(coloring == "course") getCoursesAll()
        else if(coloring == "news") getNewsAll()

    }, [inputSearch])


    useEffect(() => {
      if(token) getProfileInformation()
      menuPic.onclick = () => { 
          menu.style.right = '0%';
          menu.style.opacity = 1;
      }
      closePic.onclick = ()=> { 
          menu.style.right = '-100%';
          menu.style.opacity = 0;
      }
      window.addEventListener("scroll",headerScroll)

      return () => {
        window.removeEventListener("scroll",headerScroll)
      }
    }, [])

    useEffect(() => {
      setNews([])
      setCourse([])
    }, [coloring])
    

  return (
    <>
      <div ref={modalSearch} className="w-[1920px] max-[1919px]:w-full shadow-[0_0_7px_#222]  z-[120] transition-all duration-700 fixed opacity-0 right-0 left-0 top-[-150%] mx-auto bg-[#fff] invisible">
          <div dir="rtl"  className="z-[1000] w-full transition-all duration-700 bg-[#fff] border border-[red] ">
              <div className="h-[100px] flex justify-center items-center relative ">
                  <div className="w-[80%] h-full flex justify-around items-center">

                        <div className="border border-[transparent] bg-[#EEE6F6] w-[30%] h-[60px] rounded-[50px] flex items-center justify-around overflow-hidden pr-[10px]  transition-all duration-300 hover:border hover:border-[#955ecc]">
                            <img src="../src/assets/images/header/search.png" alt="" className="w-[40px] h-[40px]" />
                            <input dir="rtl" id="Searchinput" type="text" className="w-[75%] placeholder:text-[20px] text-[20px] h-full border-none outline-none bg-[#EEE6F6] placeholder:text-[#7F42BC] text-[#7F42BC]" placeholder="جستجو" onInput={(e)=> search(e)}/>
                        </div>
                        <div className="border border-[#999] w-[150px] h-[60px] rounded-[25px] flex cursor-pointer overflow-hidden" onClick={()=> {changeColorFlag();Searchinput.focus()}}>
                            <span className={`w-[50%] h-full flex justify-center items-center ${coloring == "course" ? "bg-[#ccc]" : "bg-[#fff]"}`}>دوره ها</span>
                            <span className={`w-[50%] h-full flex justify-center items-center ${coloring == "news" ? "bg-[#ccc]" : "bg-[#fff]"}`}>اخبار ها</span>
                        </div>

                  </div>
                  <img src="../src/assets/images/close.svg" alt="" className="absolute left-2 top-2 w-10 h-10 cursor-pointer hover:drop-shadow-[0_0_7px_#ccc]" onClick={()=> {
                        modalSearch?.current.classList.remove("top-[0%]");
                        modalSearch?.current.classList.add("top-[-150%]");
                        setNews([]);
                        setCourse([]);
                        Searchinput.value = "";
                        modalSearch?.current.classList.remove("opacity-1");
                        modalSearch?.current.classList.add("opacity-0")
                        modalSearch?.current.classList.remove("visible");
                        modalSearch?.current.classList.add("invisible")
                      }
                    } />

              </div>
              <div>
                <div className={`w-full h-[470px] flex justify-around flex-wrap ${(course.length >= 5 || news.length >= 5) ? "overflow-y-scroll" : ""}`}>
                    {coloring == "course" &&
                      course.map((element, index) => {
                        return (
                            <div key={index} className={view1 + " border border-[red]"} onClick={()=> navigate(`courses/${element.courseId}`)} >
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
                    }
                    {coloring == "news" &&
                        news.map((element, index) => {
                          return (
                            <div key={index} className={view1}  > 
                              <div className="w-full h-170px overflow-hidden my-[10px]">  
                              
                                <img src={element?.currentImageAddressTumb !== null ? element?.currentImageAddressTumb.indexOf("https://") !== -1 ? element?.currentImageAddressTumb : "../src/assets/images/courses/03.png" : "../src/assets/images/courses/03.png"} alt="" className=" mx-auto h-full w-full rounded-[20px]"   /> 
                              
                              </div>
                              <div dir="rtl" className="w-full h-[210px] mx-auto">
                                <div className="w-[95%] h-[150px] mx-auto"> 
              
                                  <p className="truncate text-[24px] dark:text-white text-right max-[450px]:text-center">{element.title}</p> 
                                  <div className="text-[#777] dark:text-[#eee] w-full mt-[15px] leading-6 max-[450px]:text-center" >{sessionStorage.getItem("courseClass") == "grid" ? element.miniDescribe.slice(0,97) + "..." : element.miniDescribe.slice(0,97) + "..."}</div>
                                
                                </div>
                              <div className="w-full h-[50px] pb-2 flex justify-between items-center">
                              <div className="text-[#777] mr-[10px]">بازدید : {element.currentView}</div>
                              <Button content="ادامه مطلب" className="whitespace-nowrap text-[16px] scale-[80%]" link={`blogs/${element.id}`} />   </div> </div>
                            </div>
                          );
                      })
                    }
                </div>
              
              </div>
              
          </div>
      </div> 

      <header dir="rtl" className={"z-[100] relative w-full right-0 left-0 top-0 max-h-[80px] " + borderClass} id="header" >
          <div id="headerHolder" className={`dark:shadow-[0_0_7px_#transparent] mx-auto w-[1920px] h-full flex justify-between max-[1919px]:w-full items-center`}>
              <div className={"w-[35%] max-[1580px]:w-[40%] max-[1580px]:[&>a]:text-[16px] max-[1020px]:hidden whitespace-nowrap h-full flex justify-around items-center [&>a]:pb-2 px-4 [&>a]:text-[20px] flex-row-reverse max-[1200px]:[&>a]:text-[15px] "}>
                  <Linkes to="/contact-us" content="تماس با ما" imgClassName="hidden" ejectedStyle="none" acceptedClassName={"text-[" + color + "] border-b-[2px] border-b-[#8043bd] dark:text-[#fff] dark:border-b-[#fff]"} ejectedClassName={"text-[" + color + "] headerItemHover relative dark:text-[#ddd] dark:before:bg-white"} />
                  <Linkes to="/blogs" content="خدمات" imgClassName="hidden" ejectedStyle="none" acceptedClassName={"text-[" + color + "] border-b-[2px] border-b-[#8043bd] dark:text-[#fff] dark:border-b-[#fff]"} ejectedClassName={"text-[" + color + "] headerItemHover relative dark:text-[#ddd] dark:before:bg-white"} />
                  <Linkes to="/courses" content="آموزش" imgClassName="hidden" ejectedStyle="none" acceptedClassName={"text-[" + color + "] border-b-[2px] border-b-[#8043bd] dark:text-[#fff] dark:border-b-[#fff]"} ejectedClassName={"text-[" + color + "] headerItemHover relative dark:text-[#ddd] dark:before:bg-white"} />
                  <Linkes to="/" content="خانه" imgClassName="hidden" ejectedStyle="none" acceptedClassName={"text-[" + color + "] border-b-[2px] border-b-[#8043bd] dark:text-[#fff] dark:border-b-[#fff]"} ejectedClassName={"text-[" + color + "] headerItemHover relative dark:text-[#ddd] dark:before:bg-white"} />
                  <img src={"../src/assets/images/header/" + src} alt="" className={"scale-[70%] " + iconClassName} />
              </div>
              <img src="../src/assets/images/menu.png" alt="" id="menuPic" className="h-[30px] max-[1020px]:block m-[15px] cursor-pointer max-[500px]:scale-[83%] hidden "/>
              <div className={!token ? classUnAuthorize + "max-[500px]:scale-[83%] max-[500px]:ml-[-15px]" + " relative max-[1400px]:[&>*]:scale-[95%]  max-[1280px]:[&>*]:scale-[90%] h-full flex justify-around items-center pl-1 text-[#8043bd] [&>a]:h-[45px] [&>a]:bg-[#f1ebf8] [&>a]:mx-[8px] [&>a]:rounded-[30px] [&>a]:flex [&>a]:justify-center [&>a]:items-center [&>a]:whitespace-nowrap [&>a]:text-[18px] [&>a]:cursor-pointer [&>a]:shadow-[0px_3px_6px_#5757574f] " : " scale-[120%] ml-[20px] relative max-[1400px]:[&>*]:scale-[95%] max-[500px]:scale-[83%] max-[500px]:ml-[-15px] max-[1280px]:[&>*]:scale-[90%] h-full flex justify-around items-center pl-1 text-[#8043bd] [&>a]:h-[45px] [&>a]:bg-[#f1ebf8] [&>a]:mx-[8px] [&>a]:rounded-[30px] [&>a]:flex [&>a]:justify-center [&>a]:items-center [&>a]:whitespace-nowrap [&>a]:text-[18px] [&>a]:cursor-pointer [&>a]:shadow-[0px_3px_6px_#5757574f] " + className} style={{marginLeft:ml}}>
                <NightMode bgClass="bg-[#f1ebf8] px-[8px] absolute right-[-60px] " borderClass="border-2 border-black" />
                {(location.pathname !== "/sign-in" && location.pathname !== "/forgetPassword" && location.pathname !== "/forgetpassword" && location.pathname !== "/register") && <>
                    {!token && <LinkComponent content="ثبت نام" link="/register" className='mx-[15px] w-[100px] px-4 select-none' />}
                    {!token && <LinkComponent content="ورود" link="/sign-in" className='mx-[15px] w-[100px] px-4 select-none' />}
                    {token && <LinkComponent link="/panel/userpanel" content={<img src={iconeUser} alt="" id="pictureHeader" className="w-[90%] h-[90%] object-cover rounded-[50%]" />} className='w-[50px]' />}
                    <LinkComponent bool={true} modalSearch={modalSearch} content={<img src="../src/assets/images/header/search.png" alt="" className="w-[34px] object-cover" />} className='w-[50px]' />
                </>}
              </div>
          </div>
      </header>
      <Menu />
    </>
  )
}

export default Header