import * as yup from 'yup' 

let recommandsValidation = yup.object().shape({
    name : yup.string().required("لطفا نام کاربری را وارد کنید"),
    email : yup.string().email("لطفا ایمیل را به درستی وارد کنید").matches(/^[\w-\.]+@([gmail-]+\.)+[com-]{2,4}$/ , "لطفا ایمیل را به درستی وارد کنید").required("لطفا ایمیل را وارد کنید"),
    textarea : yup.string().required("لطفا متن را وارد کنید"),
})    

export default recommandsValidation