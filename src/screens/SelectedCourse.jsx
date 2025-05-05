import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CourseDetail from "../components/selected-Blog-course/CourseDetail";
import { Header,Footer,RightPanel, Submit } from '../components/common'
import customAxios from "../core/services/interceptor";
import Loading from "../components/common/Loading"
import ReactStars from "react-stars";

export let setComments;
const SelectedCourses = () => {

  const [item, setItem] = useState();
  const [teacher, setTeacher] = useState();
  const [comment, setComment] = useState();
  let starHolder = useRef()
  let star = 0
  let url = useParams();
  let token = localStorage.getItem("token")
  let theme = localStorage.getItem("theme")

  const getCourseDetail = async () => {

    let result = await customAxios.get("/Home/GetCourseDetails?CourseId=" + url.id)
    setItem(result)

    let TeacherResult = await customAxios.get("/Home/GetTeacherDetails?TeacherId=" + result.teacherId)
    setTeacher(TeacherResult)

  }

  const getCommentCourse = async () => {

      let result = await customAxios.get("/Course/GetCourseCommnets/" + url.id)
      setComment(result)

  }

  const sendRate = async () => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      let result = await customAxios.post(`/Course/SetCourseRating?CourseId=${url.id}&RateNumber=${star}`)
      if(result.success) toast.success("عملیات با موفقیت انجام شد")
      else toast.error(result.message)
    }
  }
  
  const addToReserve = async (e) => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      if(item?.isCourseReseve == "0") {
        await customAxios.post("/CourseReserve/ReserveAdd",{
            courseId: url.id
        })
        getCourseDetail()
        e.target.innerHTML = "حذف رزرو"
        toast.success("این دوره با موفقیت رزرو شد")
      }
      else if(item?.isCourseReseve == "1") {
        let res = await customAxios.delete("/CourseReserve" , {
          data : {id : url.id}
        })
        if(res.success) toast.success("این دوره با موفقیت از رزرو حذف شد")
        else toast.error("به دلیل اینکه  در دوره افزوده شدید قادر به حذف رزرو نمی باشید.")
        getCourseDetail()
        e.target.innerHTML = "رزرو دوره"
      }
    }
  }

  const addToFavorite = async (e) => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      if(!item?.isUserFavorite) {
        await customAxios.post("/Course/AddCourseFavorite",{
            courseId: url.id
        })
        getCourseDetail()
        e.target.innerHTML = "حذف از علاقه مندی ها"
        toast.success("این دوره با موفقیت به مورد علاقه ها اضافه شد")
      }
      else if(item?.isUserFavorite) {
        let formData = new FormData()
        formData.append("CourseFavoriteId" , item?.userFavoriteId)
        await customAxios.delete("/Course/DeleteCourseFavorite" , {
          data : formData
        })
        getCourseDetail()
        toast.success("این دوره با موفقیت از مورد علاقه ها حذف شد")
        e.target.innerHTML = "افزودن به علاقه مندی ها"
      }
    }
  }

  const likeCourse = async (e) => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      if(item?.currentUserLike == "0") {
        await customAxios.post("/Course/AddCourseLike?CourseId=" + url.id)
        getCourseDetail()
        toast.success("نظر شما با موفقیت ثبت شد")
      }
      else if(item?.currentUserLike == "1") {
        let formData = new FormData()
        formData.append("CourseLikeId" , item?.userLikeId)
        await customAxios.delete("/Course/DeleteCourseLike" , {
          data : formData
        })
        getCourseDetail()
        toast.success("نظر شما با موفقیت برداشته شد")
      }
    }
  }

  const dissLikeCourse = async () => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      if(item?.currentUserDissLike == "0") {
        await customAxios.post("/Course/AddCourseDissLike?CourseId=" + url.id)
        getCourseDetail()
        toast.success("نظر شما با موفقیت ثبت شد")
      }
      else if(item?.currentUserDissLike == "1") {
        let formData = new FormData()
        formData.append("CourseLikeId" , item?.userLikeId)
        await customAxios.delete("/Course/DeleteCourseLike" , {
          data : formData
        })
        getCourseDetail()
        toast.success("نظر شما با موفقیت برداشته شد")
      }
    }
  }

  useEffect(() => {
      setComments = setComment
      getCourseDetail()
      getCommentCourse()
  }, [])
  
  return (
    <>
      <Loading time={500} />
      <div className="w-[1920px] max-[1919px]:w-full mx-[auto]">
        <ToastContainer theme={theme} autoClose={4000} position="top-center" limit={4}  /> 
        <Header src="avatar.png" color="#5A0BA9"/>
        <div className="w-[full] flex justify-center flex-wrap gap-[50px] my-5 mt-20 [&>div]:transition-all [&>div]:duration-100">
          <div dir="ltr" className="w-[580px] dark:bg-[#26324d] dark:[&>div]:bg-[#3c4e78] dark:[&>div]:shadow-none max-[1780px]:w-[500px] max-[1355px]:w-[400px] h-full flex flex-col items-center justify-center rounded-xl shadow-[0_0_7px_#ddd] bg-white py-5 max-[1150px]:order-2 max-[1150px]:w-[60%] max-[1150px]:mb-10 max-[715px]:w-[80%] max-[600px]:w-full max-[600px]:rounded-none" >
            <div className=" w-[80%] rounded-t-2xl bg-white shadow-[0_0_7px_#ddd] flex flex-col rounded-b-3xl my-5 dark:[&>div:nth-child(even)]:bg-[#2a375c] [&>div:nth-child(even)]:bg-[#f5f5f5] max-[1360px]:[&>div:not(&>div:first-child)]:text-[18px]">
              <div className="text-[28px] flex justify-between items-center p-3 dark:text-white">
                <img src="../src/assets/images/selectedCourse/details.png" alt="" className="w-[54px] h-[54px]"/> مشخصات دوره
              </div>
              <CourseDetail content={item?.title} title="نام دوره" logo="courseName.png"/>
              <CourseDetail content={item?.courseStatusName} title="وضعیت دوره" logo="terms.png"/>
              <CourseDetail content={item?.courseLevelName} title="سطح دوره" logo="level.png"/>
              <CourseDetail content={item?.startTime.slice(0,10)} title="شروع دوره" logo="startTerm.png"/>
              <CourseDetail content={item?.endTime.slice(0,10)} title="پایان دوره" logo="endTerm.png"/>
              <CourseDetail content={"  تومان  " + item?.cost} contentStyle="text-[#36C54E]" title="قیمت دوره" logo="abcd.png"/>
            </div>
            <div className="w-[80%] rounded-2xl bg-white rounded-b-3xl shadow-[0_0_7px_#ddd] flex flex-col my-5 dark:[&>div:nth-child(even)]:bg-[#2a375c] [&>div:nth-child(even)]:bg-[#f5f5f5] max-[1360px]:[&>div:not(&>div:first-child)]:text-[18px]">
              <div className="text-[28px] flex justify-between items-center p-3"> 
                <img src="../src/assets/images/selectedCourse/capacity.png" alt="" className="w-[54px] h-[54px]"/> <div className="dark:text-white">ظرفیت</div>
              </div>
              <CourseDetail content={item?.capacity} title="ظرفیت کل" noLogo="hidden"/>
              <CourseDetail content={item?.currentRegistrants} title="تعداد دانشجو" noLogo="hidden"/>
              <button className="h-12 flex justify-center items-center bg-gradient-to-r from-[#62cff4] to-[#2c67f2] hover:bg-gradient-to-l text-white text-[22px] rounded-b-3xl transition-all duration-500 hover:bg-[#24384b]" onClick={addToReserve}>{item?.isCourseReseve == "1" ? "حذف رزرو" : "رزرو دوره"}</button>
            </div>
            <div className="w-[80%] rounded-2xl bg-white shadow-[0_0_7px_#ddd] flex flex-col my-5 dark:[&>div:nth-child(even)]:bg-[#2a375c] [&>div:nth-child(even)]:bg-[#f5f5f5] max-[1360px]:[&>div:not(&>div:first-child)]:text-[17px] [&>div:nth-child(4)>div:first-child]:truncate">
              <div className="text-[28px] flex justify-between items-center p-3 dark:text-white"> 
                <img src="../src/assets/images/selectedCourse/teacher.png" alt="" className="w-[58px] h-[58px]"/> مدرس
              </div>
              <div className="w-[85%] h-20 mx-auto my-3 rounded-3xl bg-[#f5f5f5] flex justify-end items-center"> <div className="text-[24px] mr-3 text-[#555] max-[1360px]:text-[18px] dark:text-white">   {teacher?.fullName}  </div> 
                <img src={teacher?.pictureAddress} alt="" className="w-20 h-20 rounded-3xl"/>
              </div>
              <div className="text-[#444] text-[22px] self-end m-3 dark:text-white"> : فعالیت ها</div>
              <CourseDetail content={teacher?.newsCount} title="تعداد اخبار" noLogo="hidden" dir={"rtl"}/>
              <CourseDetail content={teacher?.courseCounts} title="تعداد دوره ها" noLogo="hidden" dir={"rtl"}/>
            </div>

            <div className="w-[80%] rounded-3xl bg-white shadow-[0_0_7px_#ddd] flex flex-col my-5 dark:[&>div:nth-child(even)]:bg-[#2a375c] [&>div:nth-child(even)]:bg-[#f5f5f5] max-[1360px]:[&>div]:text-[18px]">
              <div className="text-[28px] flex justify-between items-center p-3 dark:text-white"> 
                <img src="../src/assets/images/selectedCourse/idea.png" alt="" className="w-[54px] h-[54px]"/> نظر شما
              </div>
              <CourseDetail title="دوره مورد پسند است؟" noLogo="hidden" content={
                <div className="flex justify-evenly items-start text-[18px] w-[150px] [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:cursor-pointer [&>div>*]:mx-1">
                  <div onClick={e => likeCourse(e)}>
                    <span className={item?.currentUserLike == "1" ? "text-[#37c54f]" : "text-[#666] dark:text-white"}>{item?.likeCount}</span>
                    <img src={item?.currentUserLike == "1" ? "../src/assets/images/selectedCourse/like.png" : theme == "light" ? "../src/assets/images/selectedCourse/likeDefault.png" : "../src/assets/images/selectedCourse/likeDefault-light.png"} className="w-5" />
                  </div>
                  <div onClick={dissLikeCourse}>
                    <span className={item?.currentUserDissLike == "1" ? "text-[#ec0b1a]" : "text-[#666] dark:text-white"}>{item?.dissLikeCount}</span>
                    <img src={item?.currentUserDissLike == "1" ? "../src/assets/images/selectedCourse/disslike.png" : theme == "light" ? "../src/assets/images/selectedCourse/disslikeDefault.png" : "../src/assets/images/selectedCourse/disslikeDefault-light.png"} className="w-5 relative top-[1px]"  />
                  </div>
                </div>
              } />
              <CourseDetail title="امتیاز به دوره" noLogo="hidden" className="items-center" content={
                <div className="flex flex-col items-center justify-center ">
                  <div className="flex items-center [&>div]:mr-2">
                    <span ref={starHolder}>{ "5 / " + item?.currentUserRateNumber} </span>
                    <ReactStars size={35} half={false} edit={true} value={item?.currentUserRateNumber == 0 ? 0 : item?.currentUserRateNumber} onChange={e => {starHolder.current.innerHTML = "5 / " + e ; star = e}} />  
                  </div>
                </div>
              } />
              <Submit content="ثبت امتیاز" className="ml-5 py-[6px] w-[40%] my-2 rounded-2xl self-center shadow-2xl" onClick={sendRate} />
              <button className="h-12 mt-2 flex justify-center items-center bg-gradient-to-r from-[#5A0BA9] to-[#C003B2] hover:bg-gradient-to-l text-white text-[22px] rounded-b-3xl transition-all duration-500 hover:bg-[#994aa9]" onClick={e => addToFavorite(e)}>{item?.isUserFavorite ? "- حذف از علاقه مندی ها " : "+ افزودن به علاقه مندی ها "}</button>
            </div>
          </div>
          <RightPanel details={item ? item : item} db={comment} title="دوره"/>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default SelectedCourses;
