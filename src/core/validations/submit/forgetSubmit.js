import { toast } from "react-toastify";
import customAxios from "../../services/interceptor";

const postEmail = async (email,baseUrl) => {

    
    let res = await customAxios.post("/Sign/ForgetPassword",
    {
        email: email,
        baseUrl: baseUrl
    })
    console.log(res);
    toast.success("لطفا ایمیل خود را چک کنید")

}

const postNewPass = async (values)=> {
    let userId = sessionStorage.getItem("userId")
    let userMessage = sessionStorage.getItem("userMessage")

    userId = Math.ceil(userId)

    await customAxios.post("/Sign/Reset",
    {
      userId: userId,
      newPassword: values.newPassword,
      resetValue: userMessage
    })

}


const forgetSubmit = (values) => {

    if(!values.bool) {
        postEmail(values.email,location.href)
    }
    else if (values.bool) {
        if(values.newPassword.length >= 8){
            postNewPass(values)
            toast.success("عملیات با موفقیت انجام شد")
            location.pathname = '/sign-in'
        }
        else toast.error("رمز باید بیشتر از 8 کلمه باشد")
    }

}

export default forgetSubmit