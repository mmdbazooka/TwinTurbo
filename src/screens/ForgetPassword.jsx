import { Formik , Form } from "formik"
import forgetSubmit from "../core/validations/submit/forgetSubmit";
import { LinkComponent , FieldInput , Header, Submit } from '../components/common';
import forgetPasswordValidation from "../core/validations/forgetPasswordValidation";
import { useEffect } from "react";
import { useState } from "react";
import customAxios from "../core/services/interceptor";
import { ToastContainer } from "react-toastify";
import Loading from "../components/common/Loading";


const ForgetPassword = () => {

    let theme = localStorage.getItem("theme")
    const [flag, setFlag] = useState(1)
    

    const get = async ()=> {
    
      let ConfigValue = location.pathname.slice(location.pathname.lastIndexOf("/")+1)
      let res = await customAxios.get("/Sign/Reset/" + ConfigValue)
      
      sessionStorage.setItem("userId",res.id)
      sessionStorage.setItem("userMessage",res.message)
  
    }

    useEffect(() => {

      if(location.pathname !== "/forgetPassword" ) {
          setFlag(flag+1)
          get()
      }

      
  }, [])
  
  return (
    <>
      <Loading time={100} />
      <div className='w-full h-[1345px] bg-gradient-to-r from-[#66008C] to-[#9F0099]'>
        <Header className="hidden" ml="25px" src="avatar-1.png" color="#fff"/>

        <div className='w-[1920px] max-[1919px]:w-full mx-auto h-full relative overflow-hidden flex flex-col justify-start items-center max-[1256px]:mt-28'>
            
            <img src="../src/assets/images/panel/path forget.png" alt="" className='absolute left-[-31px] top-0 scale-x-[122%] scale-y-[120%] max-[1000px]:hidden'/>
            <img src="../src/assets/images/panel/forget logo woman.png" alt="" className='absolute left-[0] top-[260px] w-[65%] transition-all duration-1000 max-[1485px]:top-[200px] order-2 max-[1256px]:mt-20 max-[1256px]:right-0 max-[1256px]:top-0 max-[1256px]:relative max-[700px]:hidden '/>

            <Formik initialValues={{email: "",newPassword:"",bool:false}} onSubmit={(values) => forgetSubmit(values)} validationSchema={forgetPasswordValidation}>
              

              {(form)=>(
                  <Form className="w-[450px] h-[480px] order-1 bg-white absolute right-[16%] top-[340px] transition-all duration-1000 shadow-[0_0_7px_#ccc] rounded-[15px] flex flex-col items-center justify-center max-[550px]:scale-[80%] max-[430px]:scale-[70%] max-[340px]:scale-[65%] max-[1256px]:right-0 max-[1256px]:top-0 max-[1256px]:relative">
        
                    <img src="../src/assets/images/panel/key.png" alt="" className='w-[50px]'/>
                    <p className='py-[35px] text-[26px]'>فراموشی رمز عبور</p>
                    <div className='w-full h-[160px] flex flex-col items-center justify-center [&>*]:my-[5px]'>
    
                      {flag == 1 && <FieldInput name="email" content="" placeholder="ایمیل" dir="rtl" border="border border-[#a361a1]" display="text-[#b9b7b7] text-[15px]" className="rounded-[14px] h-[70px]" />}
                      {flag == 2 && <FieldInput name="newPassword" content="" placeholder="رمز جدید" dir="rtl" border="border border-[#a361a1]" display="text-[#b9b7b7] text-[15px]" className="rounded-[14px] h-[70px]" />}
                      {flag == 2 ? form.values.bool = true : false}
                      <Submit content="ادامه" className="w-[85%] h-[80px]" />
                    
                    </div>
                    <div className='w-[33%] h-7 flex justify-around items-center [&>*]:text-[#564FCC] mt-2'>
                      <LinkComponent content="ثبت نام" link="/register" className='text-[18px]' />
                      <p>|</p>
                      <LinkComponent content="ورود" link="/sign-in" className='text-[18px]' />
                    </div>
    
                </Form>
            
              )}

            </Formik>

        </div>
        <ToastContainer theme={theme} autoClose={4000} position="top-center" limit={2}  /> 
      </div>
    </>
  )
}

export default ForgetPassword