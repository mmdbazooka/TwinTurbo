import { Formik, Form ,Field, ErrorMessage } from 'formik'
import CommentMap from '../map/CommentMap'
import { useLocation, useParams } from 'react-router-dom'
import customAxios from '../../core/services/interceptor'
import { useRef , useState } from 'react'
import { setComments } from '../../screens/SelectedCourse'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect } from 'react'
import { functionGetCommentNews , setComment } from '../../screens/SelectedBlog'

const Comment = ({db}) => {
    let url = useParams()
    let location = useLocation()
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    let token = localStorage.getItem("token")
    const parentComment = useRef()
    const ErrorParent = useRef()

    const addCommentBlog = async (value) => {
        if(!token) {
          toast.error("لطفا ابتدا ثبت نام کنید")
        }
        else {
            if(value.comment.length >= 10) {
                let result = await customAxios.get("/SharePanel/GetProfileInfo")
                await customAxios.post("/News/CreateNewsComment",{
                    newsId: url.id,
                    title: result.fName + " " + result.lName,
                    describe: value.comment
                })
                functionGetCommentNews()
            }
            else toast.error("متن باید بیش از 12 کلمه باشد")
        }
    } 

    const addCommentCourse= async (value) => {
        let formData = new FormData()

        formData.append("CourseId", url.id)
        formData.append("Title", "Hamid")
        formData.append("Describe", value.comment)

        customAxios.post("/Course/AddCommentCourse",formData)
    
    } 

    const handle = async (value)=> { 
        if(!token) {
          toast.error("لطفا ابتدا ثبت نام کنید")
        }
        else {
            if(textarea.value.length < 5) toast.error("نظر شما حداقل باید 5 کلمه باشد")
            else {
                if(location.pathname.indexOf("/blogs") !== -1)  {

                    addCommentBlog(value)
                    let result = await customAxios.get("/News/GetNewsComments?NewsId=" + url.id)
                    setComment(result)

                }  
                else if(location.pathname.indexOf("/courses") !== -1) {

                    addCommentCourse(value)
                    let result = await customAxios.get("/Course/GetCourseCommnets/" + url.id)
                    setComments(result)

                }   
                value.comment = ""
                textarea.value = ""
                toast.success("نظر شما با موفقیت اضافه شد")
            }
        }
    }
    
    useEffect(() => {
        ErrorParent.current.previousElementSibling.style.order = parentComment?.current?.children.length + "3"
        ErrorParent.current.style.order = parentComment?.current?.children.length + "4"
        ErrorParent.current.nextElementSibling.style.order = parentComment?.current?.children.length + "5"
    }, [])
    

    return (
        <>
            <Formik initialValues={{comment : ""}} onSubmit={(value)=> handle(value)} >
                <Form>
                    <div className="w-full bg-[#F5F5F5] dark:bg-[#3c4e78] rounded-[25px] overflow-hidden relative z-10">
                        <div dir="rtl" ref={parentComment} className="h-full flex flex-col p-[25px] leading-[28px] [&>*]:my-[7px]">
                            <CommentMap db={db} parentComment={parentComment.current} />
                            <Field as="textarea" id="textarea" name="comment" placeholder="نوشتن پیام" className="w-full h-[400px] bg-white dark:bg-[#26324d] dark:text-white shadow-[0_0_7px_#999] rounded-[15px] resize-none outline-none p-[10px] text-[18px]" style={{order : parentComment?.current?.children.length + "3"}} />
                            <div className="h-6" ref={ErrorParent} style={{order : parentComment?.current?.children.length + "4"}}>
                                <ErrorMessage component="div" name="comment" className='text-[#B00020] ErrorMessage' />
                            </div>
                            <button type="submit" className="bg-[#36C54E] rounded-[15px] w-full h-[55px] flex justify-center items-center text-[#fff] text-[21px] hover:bg-[#34a647]" style={{order : parentComment?.current?.children.length + "5"}}>ارسال متن</button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <ToastContainer theme={theme} autoClose={4000} position="top-center" limit={2}  /> 
        </>
    )
}

export default Comment