import { Formik , Form } from "formik"
import { Header , FieldInput , LinkComponent , Submit} from "../components/common/index"
import Validation from "../core/validations/registerValidation"
import customAxios from "../core/services/interceptor"
import { useNavigate } from "react-router-dom"
import { useEffect , useState} from "react"
import { useRef } from "react"
import { ToastContainer, toast } from "react-toastify"
import Loading from "../components/common/Loading"

const Register = () => {

  const sendAgain = useRef()
  const sendAgainIn = useRef()
  const [flag, setFlag] = useState(1)
  const [timerflag, setTimerFlag] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState()
  let navigate = useNavigate()
  let submitMessage ;
  let theme = localStorage.getItem("theme")
  const [codeM, setCodeM] = useState(1)
  const [codeS, setCodeS] = useState(59)
  
  useEffect(() => {
    if(timerflag) {
      let timer = setTimeout(() => {
        setCodeS(codeS - 1)
        if(codeS == 0) {
          setCodeM(codeM - 1)
          setCodeS(59)
        }
        if(codeM == 0 && codeS == 0) {
          setTimerFlag(false)
          clearTimeout(timer)
          sendAgainIn.current.style.display = "none"
          sendAgain.current.style.display = "inline"
        }
      }, 1000);
    }
  }, [timerflag , codeS])
  
  
    const resendCode = async ()=> {
      await customAxios.post("/Sign/SendVerifyMessage",{ phoneNumber : phoneNumber })
      sendAgainIn.current.style.display = "inline"
      sendAgain.current.style.display = "none"
      setCodeM(1)
      setCodeS(59)
      setTimerFlag(true)
      toast.success("کد تایید ارسال شد")
    }

  if(flag == 1) submitMessage = "ورود"
  else if(flag == 2) submitMessage = "ادامه"
  else if(flag == 3) submitMessage = "ثبت نام"

  let formClassName = "w-[520px] h-[400px] bg-white absolute right-[14%] top-[405px] shadow-[0_0_7px_#ccc] rounded-[15px] flex flex-col justify-around items-center py-4 regForm max-[1256px]:mt-20 max-[1256px]:right-0 max-[1256px]:top-0 max-[1256px]:relative max-[550px]:scale-[80%] max-[430px]:scale-[70%] max-[380px]:scale-[60%]  max-[340px]:scale-[50%] "

  const registerSubmit = async (values) => {
      if(flag == 1) { 
          let result = await customAxios.post("/Sign/SendVerifyMessage",{ phoneNumber : values.phoneNumber })
          if(result.success) {
            setFlag(flag+1)
            setPhoneNumber(values.phoneNumber)
            setTimerFlag(true)
            toast.success("کد تایید ارسال شد")
          }
          else toast.error(result.message)
      }
      if(flag == 2) {
          let res = await customAxios.post("/Sign/VerifyMessage",
          { 
            phoneNumber : values.phoneNumber ,
            verifyCode : values.VerifyCode
          })
          if(res.success) {
            setFlag(flag+1)
            toast.success("شماره موبایل تایید شد")
          }
          else toast.error("کد تایید با شماره موبایل مطابقت ندارد")
      }
      if(flag == 3) {
          let res = await customAxios.post("/Sign/Register",
          { 
              phoneNumber: values.phoneNumber ,
              password: values.Password ,
              gmail: values.Email,
          })
          if(res.success) { 
            navigate("/sign-in")
            toast.success("ثبت نام با موفقیت انجام شد")
          }
          else {
            toast(res.message)
          }
      }
  }

  const editPhoneNumber = () => {
    setFlag(flag - 1)
    setCodeM(1)
    setCodeS(59)
    setTimerFlag(false)
  }

  return (
    <>
      <Loading time={300} />
      <div className="w-full h-[1200px] bg-[#f5f5f5]">
        <Header className="hidden" ml="25px" src="avatar.png" color="#5A0BA9" />
        <div className="w-[1920px] max-[1919px]:w-full  mx-auto h-full relative overflow-hidden flex flex-col justify-start items-center">
            <img src="../src/assets/images/panel/path register.png" alt="" className="absolute left-[-31px] top-0 scale-x-[122%] scale-y-[127%] max-[1000px]:hidden"/>
            <img src="../src/assets/images/panel/register logo.png" alt="" className="absolute left-0 top-[260px] w-[63%] transition-all duration-1000 max-[1485px]:top-[200px] order-2 max-[1256px]:mt-20 max-[1256px]:right-0 max-[1256px]:top-0 max-[1256px]:relative max-[700px]:hidden"/>

            <Formik initialValues={{phoneNumber:"",VerifyCode:"",Password:"",Email:""}} onSubmit={(values) => registerSubmit(values,setFlag,flag)} validationSchema={Validation} >
                <Form className={flag !== 3 ? formClassName : formClassName + "h-[550px]"}>
                    <img src="../src/assets/images/panel/user.png" alt="" className="w-[50px] h-[50px]"/>
                    <div className="text-[26px]">{flag !== 2 ? "ثبت نام" : "کد تایید"}</div>

                    {flag == 1 && <FieldInput name="phoneNumber" type="text" placeholder="شماره موبایل " dir="rtl" border="border border-[#a361a1]" display="text-[#999] text-[15px]" className="placeholder:text-[#ccc]" />}
                    {flag == 2 && <FieldInput name="VerifyCode" type="text" placeholder=" کد تایید  " dir="rtl" border="border border-[#a361a1]" display="text-[#999] text-[15px]" className="placeholder:text-[#ccc]" /> }
                    {flag == 2 && <div className="flex justify-between w-[85%]">
                      <span className="mt-[-10px] text-[15px] self-end cursor-pointer border-b-1 border-b border-b-black hover:text-[#8b61a3] hover:border-b-[#8b61a3]" onClick={editPhoneNumber}>ویرایش شماره همراه</span>
                      <span className="self-start" ref={sendAgainIn}>ارسال مجدد کد در : {codeM}:{codeS} </span>
                      <span className="self-start hidden cursor-pointer" ref={sendAgain} onClick={resendCode}> <span className="text-[#bbb] cursor-default"> کدی دریافت نکردید؟ </span> ارسال مجدد کد </span>
                    </div> }
                    {flag == 3 && <FieldInput name="phoneNumber" type="number" placeholder="شماره موبایل " dir="rtl" border="border border-[#a361a1]" display="text-[#999] text-[15px]" className="placeholder:text-[#ccc]" />}
                    {flag == 3 && <FieldInput name="Password" type="Password" placeholder="رمز عبور" dir="rtl" border="border border-[#a361a1]" display="text-[#999] text-[15px]" className="placeholder:text-[#ccc]" showPasswordCheck={true} />}
                    {flag == 3 && <FieldInput name="Email" type="text" placeholder="جیمیل را وارد کنید" dir="rtl" border="border border-[#a361a1]" display="text-[#999] text-[15px]" className="placeholder:text-[#ccc]" />}

                    
                    <Submit content={submitMessage} className="w-[89%] h-12 my-2" />
                    
                    <LinkComponent content="ورود به حساب کاربری" link="/login" className="text-[#564FCC] text-[20px]" />
                </Form>
            </Formik>
        </div>
        <ToastContainer theme={theme} autoClose={4000} position="top-center" limit={2}  /> 
      </div>
    </>
  )
}

export default Register