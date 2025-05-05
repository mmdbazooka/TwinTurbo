import * as yup from 'yup' 

let registerValidation = yup.object().shape({

    // PhoneNumberOrGmail : yup.string().matches(/(0)?([ ]|-|[()]){0,2}9[1|2|3|4|5|9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ , "لطفا شماره را به درستی وارد کنید").max(10 , "لطفا شماره را به درستی وارد کنید").required("لطفا شماره همراه را وارد کنید"),
    // VerifyCode : yup.string().min(5 , "کد تایید باید 5 عدد باشد").max(5).required("کد تایید را وارد کنید"),
    // Password : yup.string().min(8 , "رمز عبور باید حداقل 8 کلمه باشد").required("لطفا رمز عبور را وارد کنید"),
    // Email : yup.string().email("لطفا ایمیل را به درستی وارد کنید").matches(/^[\w-\.]+@([gmail-]+\.)+[com-]{2,4}$/ , "لطفا ایمیل را به درستی وارد کنید").required("لطفا ایمیل را وارد کنید"),
   
})

export default registerValidation