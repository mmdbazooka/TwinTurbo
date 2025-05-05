import { Formik ,Form } from "formik"
import customAxios from "../../core/services/interceptor"
import { ToastContainer, toast } from "react-toastify"
import { FieldInput, Submit } from "../common"
import PasswordNeeds from "./PasswordNeeds"

const ChangePassword = () => {

    let theme = localStorage.getItem("theme")
    const ChangePass = async (values) => {

        if(values.newPass == values.repeatnewPass) {
            try {
                let res = await customAxios.post("/SharePanel/ChangePassword",
                {
                    oldPassword : values.oldPass,
                    newPassword : values.newPass,
                })
                if(res.success) toast.success(res.message)
                else toast.error(res.message)
                
            } catch (error) {
                console.log(error);
            }

        }
        else {
            toast.error("رمز مطابقت ندارد")
        }
        
    }

  return (
    <>
        <div id='dashBoard' className="w-[79%] max-[1260px]:w-[94%] bg-white [&>div:last-child]:w-[49%] [&>div:last-child]:h-[90%] [&>div:last-child]:rounded-[25px] flex flex-col items-center justify-center px-[30px] mr-2 max-[1350px]:[&>div:last-child]:w-full max-[1350px]:[&>div:last-child:first-child]:h-[50%] max-[1023px]:[&>div:last-child:first-child]:h-[100%] max-[1350px]:[&>div:last-child]:my-2 max-[1020px]:w-full max-[1020px]:rounded-none max-[1020px]:shadow-none max-[1020px]:mr-0 max-[1020px]:[&>div:last-child]:bg-white max-[1020px]:px-0 max-[1020px]:[&>div:last-child]:rounded-none">
            <div className="w-[70%] flex flex-col justify-center items-center p-8 rounded-3xl border max-[860px]:scale-[90%] max-[1260px]:mt-5">
                <span className="text-[22px] self-end" dir="rtl"> رمز عبور حداقل باید شامل دو مورد از موارد زیر باشد :</span>
                <div className="flex justify-evenly items-center flex-wrap">
                    <PasswordNeeds title="+8" content="تعداد حروف" />
                    <PasswordNeeds title="ABC" content="حروف بزرگ" />
                    <PasswordNeeds title="abc" content="حروف کوچک" />
                    <PasswordNeeds title="123" content="اعداد" />
                    <PasswordNeeds title="@$#" content="نماد" />
                </div>
            </div>
            <Formik initialValues={{oldPass:"",newPass:"",repeatnewPass:""}} onSubmit={(values) => ChangePass(values)}  >
                <Form className="h-[550px] w-full max-[900px]:scale-[90%] max-[550px]:scale-[80%] flex flex-col items-center justify-center [&>div>input]:outline-none [&>div]:w-[400px] [&>div>img]:absolute [&>div>img]:left-0 [&>div>input]:w-[400px] [&>div>input]:h-[70px] [&>div>input]:border [&>div>input]:rounded-[15px] [&>div>input]:my-[8px] [&>div>input]:pr-[15px]">

                    <FieldInput name="oldPass" placeholder="رمز قدیمی" dir="rtl"  />
                    <FieldInput name="newPass" type="password" showPasswordCheck={true} placeholder="رمز جدید" dir="rtl" /> 
                    <FieldInput name="repeatnewPass" type="password" showPasswordCheck={true} placeholder="تکرار رمز جدید " dir="rtl" /> 
                    <Submit content="تغییر رمز عبور" className="w-[360px] h-[60px] bg-[green] text-[19px] rounded-[15px] flex justify-center items-center text-[#fff] mt-[10px] mr-[15px]" />
                    <ToastContainer theme={theme} autoClose={4000} position="top-center" limit={2}  /> 
                    
                </Form>
            </Formik>
        </div>
    </>
  )
}

export default ChangePassword