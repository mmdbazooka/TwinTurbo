import { useState , useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {Header,Footer,RightPanel, Submit} from '../components/common'

import SelectedBlogMap from '../components/map/SelectedBlogMap'
import customAxios from "../core/services/interceptor";
import CourseDetail from "../components/selected-Blog-course/CourseDetail";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/common/Loading"
import ReactStars from "react-stars";

export let setingBlogs ;
export let setingItemComment ;
export let setComment ;
export let functionGetCommentNews ;

const SelectedBlog = () => {
  const [blog, setBlog] = useState({});
  const [itemComment, setItemComment] = useState([]);
  let url = useParams();
  let starHolder = useRef()
  let star = 0
  let theme = localStorage.getItem("theme")
  let token = localStorage.getItem("token")

  setingBlogs = setBlog
  setingItemComment = setItemComment

  const getBlogDetail = async () => {
    let result = await customAxios.get("/News/" + url.id) 
    setBlog(result.detailsNewsDto)
  }

  const getBlogComment = async () => {
    let resultComment = await customAxios.get("/News/GetNewsComments?NewsId=" + url.id)
    setItemComment(resultComment)
  }
  
  useEffect(() => {
      functionGetCommentNews = getBlogComment
      setComment = setItemComment
      getBlogDetail()
      getBlogComment()
  }, [])


  const sendRate = async () => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      let result = await customAxios.post(`/News/NewsRate?NewsId=${url.id}&RateNumber=${star}`)
      if(result.message == "عملیات با موفقیت انجام شد.") toast.success("عملیات با موفقیت انجام شد")
      else toast.error("شما قبلا به این خبر امتیاز داده اید")
    }
  }

  const addToFavorite = async (e) => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      if(!blog?.isCurrentUserFavorite) {
        await customAxios.post("/News/AddFavoriteNews?NewsId=" + url.id)
        getBlogDetail()
        toast.success("این خبر با موفقیت به مورد علاقه ها اضافه شد")
      }
      else if(blog?.isCurrentUserFavorite) {
        await customAxios.delete("/News/DeleteFavoriteNews" , {
          data : {deleteEntityId : blog?.currentUserFavoriteId}
        })
        getBlogDetail()
        toast.success("این خبر با موفقیت از مورد علاقه ها حذف شد")
      }
    }
  }

  const likeNews = async (e) => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      if(!blog?.currentUserIsLike) {
        await customAxios.post("/News/NewsLike/" + url.id)
        getBlogDetail()
        toast.success("نظر شما با موفقیت ثبت شد")
      }
      else if(blog?.currentUserIsLike) {
        await customAxios.delete("/News/DeleteLikeNews" , {
          data : {deleteEntityId : blog?.likeId}
        })
        getBlogDetail()
        toast.success("نظر شما با موفقیت برداشته شد")
      }
    }
  }

  const dissLikeNews = async () => {
    if(!token) {
      toast.error("لطفا ابتدا ثبت نام کنید")
    }
    else {
      if(!blog?.currentUserIsDissLike) {
        await customAxios.post("/News/NewsDissLike/" + url.id)
        getBlogDetail()
        toast.success("نظر شما با موفقیت ثبت شد")
      }
      else if(!blog?.currentUserIsDissLike) {
        await customAxios.delete("/News/DeleteLikeNews" , {
          data : {deleteEntityId : blog?.likeId}
        })
        getBlogDetail()
        toast.success("نظر شما با موفقیت برداشته شد")
      }
    }
  }

  return (
    <>
      <Loading time={500} />
      <div className="w-[1920px] max-[1919px]:w-full mx-[auto]">
        <ToastContainer theme={theme} autoClose={4000} position="top-center" limit={2}  /> 
        <Header src="avatar.png" color="#5A0BA9" />

        <div className="w-[full] mb-10 flex justify-center flex-wrap items-start gap-[50px] mt-20 max-[1775px]:[&>div]:transition-all">
          <div className="flex flex-col">

            <div className="w-full rounded-3xl bg-white shadow-[0_0_7px_#ddd] flex flex-col my-5 dark:[&>div:nth-child(even)]:bg-[#2a375c] [&>div:nth-child(even)]:bg-[#f5f5f5] max-[1360px]:[&>div]:text-[18px]">
              <div className="text-[28px] flex justify-between items-center p-3 dark:text-white"> 
                <img src="../src/assets/images/selectedCourse/teacher.png" alt="" className="w-[54px] h-[54px]"/> نظر شما
              </div>
              <CourseDetail content={blog?.currentView} className="text-black" contentStyle="text-[#36C54E]" title="بازدید" noLogo="hidden"/>
              <CourseDetail title="خبر مورد پسند است؟" noLogo="hidden" content={
                <div className="flex justify-around items-start w-[150px] [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:cursor-pointer [&>div>*]:mx-1">
                  <div onClick={e => likeNews(e)}>
                    <span className={blog?.currentUserIsLike == true ? "text-[#37c54f]" : "text-black dark:text-white"}>{blog?.currentLikeCount}</span>
                    <img src={blog?.currentUserIsLike == true ? "../src/assets/images/selectedCourse/like.png" : theme == "light" ? "../src/assets/images/selectedCourse/likeDefault.png" : "../src/assets/images/selectedCourse/likeDefault-light.png"} className="w-7" />
                  </div>
                  <div onClick={dissLikeNews}>
                    <span className={blog?.currentUserIsDissLike == true ? "text-[#ec0b1a]" : "text-black dark:text-white"}>{blog?.currentDissLikeCount}</span>
                    <img src={blog?.currentUserIsDissLike == true ? "../src/assets/images/selectedCourse/disslike.png" : theme == "light" ? "../src/assets/images/selectedCourse/disslikeDefault.png" : "../src/assets/images/selectedCourse/disslikeDefault-light.png"} className="w-7 relative top-[1px]"  />
                  </div>
                </div>
              } />
              <CourseDetail title="امتیاز به خبر" className="items-center" noLogo="hidden" content={
                <div className="flex flex-col items-center justify-center ">
                  <div className="flex items-center [&>div]:mr-2">
                    <span ref={starHolder}>{ "5 / " + blog?.currentUserRateNumber} </span>
                    <ReactStars size={35} half={false} edit={true} value={blog?.currentUserRateNumber == 0 ? 0 : blog?.currentUserRateNumber} onChange={e => {starHolder.current.innerHTML = "5 / " + e ; star = e}} />  
                  </div>
                </div>
              } />
              <Submit content="ثبت امتیاز" className="ml-5 py-[6px] w-[40%] my-2 rounded-2xl self-center shadow-2xl" onClick={sendRate} />
              <button className="h-12 flex justify-center items-center bg-gradient-to-r from-[#5A0BA9] to-[#C003B2] hover:bg-gradient-to-l text-white text-[22px] rounded-b-3xl transition-all duration-500 hover:bg-[#994aa9]" onClick={e => addToFavorite(e)}>{blog?.isUserFavorite ? "- حذف از علاقه مندی ها " : "+ افزودن به علاقه مندی ها "}</button>
            </div>



            <div dir="ltr" className="pr-[15px] w-[570px] max-[1775px]:w-[500px] max-[1355px]:w-[400px] h-[1200px] rounded-xl shadow-[0_0_7px_#ddd] bg-white overflow-y-auto mt-5 max-[1159px]:order-2">
              <div dir="rtl" className="w-[28%] h-[52px] rounded-[18px] bg-white shadow-[0_0_7px_#ddd] flex justify-around items-center [&>img]:w-[30px] [&>p]:text-[20px] my-[20px] mx-[25px]">
                <img src="../src/assets/images/icons/view (2).png" alt="" />
                <p>اخبار</p>
              </div>
              <div dir="rtl" className="w-full">
                <SelectedBlogMap />
              </div>
            </div>
          </div>
          <RightPanel details={blog ? blog : blog} title="خبر" db={itemComment} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SelectedBlog;
