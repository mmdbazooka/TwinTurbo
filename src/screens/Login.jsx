import { Formik , Form , Field } from "formik"
import loginSubmit from "../core/validations/submit/loginSubmit";
import { LinkComponent , FieldInput , Header , Submit } from "../components/common";
import loginValidation from "../core/validations/loginValidation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onTokenchange } from "../redux/user"
import Loading from "../components/common/Loading";

const login = () => {

  const dispatch = useDispatch()

  let navigate = useNavigate()

  return (
    <>
      <Loading time={100} />
      <div className="w-full h-[1345px] bg-gradient-to-r from-[#66008C] to-[#9F0099]">
        <Header className="hidden" ml="25px" src="avatar-1.png" color="#fff" />
        <div className="w-[1920px] max-[1919px]:w-full mx-auto h-full relative overflow-hidden flex flex-col justify-start items-center">

            <img src="../src/assets/images/panel/path forget.png" alt="" className="absolute left-[-31px] top-[15px] scale-x-[122%] scale-y-[127%] max-[1000px]:hidden"/>
            <img src="../src/assets/images/panel/login.png" alt="" className="absolute left-0 top-[260px] w-[61%] transition-all duration-1000 max-[1485px]:top-[200px] order-2 max-[1256px]:mt-20 max-[1256px]:right-0 max-[1256px]:top-0 max-[1256px]:relative max-[700px]:hidden"/>

            <Formik initialValues={{phoneOrGmail : "" , password : "" , rememberMe : false}} onSubmit={(values)=> loginSubmit(values,navigate,dispatch,onTokenchange)} validationSchema={loginValidation}>
                <Form className="w-[450px] h-[500px] bg-white absolute right-[300px] top-[335px] shadow-[0_0_7px_#ccc] rounded-[15px] flex flex-col justify-around items-center py-4 transition-all duration-1000 max-[1800px]:top-[300px] max-[1700px]:top-[270px] max-[1700px]:right-[200px] max-[1530px]:top-[200px] max-[1460px]:scale-90 max-[1400px]:top-[150px] max-[550px]:scale-[80%] max-[430px]:scale-[70%] max-[340px]:scale-[65%] max-[1256px]:mt-20 max-[1256px]:right-0 max-[1256px]:top-0 max-[1256px]:relative">
                  <img src="../src/assets/images/panel/log-in.png" alt="" className="w-[50px] h-[50px]"/>
                  <div className="text-[26px]">ورود</div>

                  <FieldInput name="phoneOrGmail" content="ورود" placeholder="شماره تلفن یا ایمیل" border="border border-[#a361a1]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl" />
                  <FieldInput name="password" type="password" content="رمز ورود" placeholder="رمز ورود" border="border border-[#a361a1]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl" showPasswordCheck={true} />
                  
                  <div className="flex items-center self-end mr-10">
                    <label htmlFor="checkbox" className="mx-2 text-[#564FCC] text-[17px] cursor-pointer">مرا به خاطر بسپار</label>
                    <Field name="rememberMe" type="checkbox" id="checkbox" className="appearance-none border border-[#564FCC] w-4 h-4 rounded-[7px] cursor-pointer checked:bg-[#564FCC]"/>
                  </div>
                  <Submit content="ورود" className="w-[89%] h-12 " />
                  <LinkComponent content="فراموشی رمز عبور" link="/forgetPassword" className="text-[#564FCC] text-[20px]" />
                  <div className="text-[#00000092]">برای ثبت نام <LinkComponent content="اینجا" link="/register" className="text-[#564FCC]" /> کلیک کنید</div>
                </Form>
            </Formik>
        </div>
      </div>
    </>
  )
}

export default login