import * as yup from 'yup' 

let loginValidation = yup.object().shape({
    // name : yup.string().required("لطفا نام کاربری را وارد کنید"),
    // password : yup.string().min(8 , "رمز عبور باید حداقل 8 کلمه باشد").required("لطفا رمز عبور را وارد کنید"),
})

export default loginValidation