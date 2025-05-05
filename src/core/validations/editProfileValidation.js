import * as yup from 'yup' 

let registerValidation = yup.object().shape({
    name : yup.string().max(30 , "نام کاربری نباید بیش از 40 حروف باشد"),
    email : yup.string().email("لطفا ایمیل را به درستی وارد کنید").matches(/^[\w-\.]+@([gmail-]+\.)+[com-]{2,4}$/ , "لطفا ایمیل را به درستی وارد کنید"),
    phone : yup.string().matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ , "لطفا شماره را به درستی وارد کنید").max(10 , "لطفا شماره را به درستی وارد کنید"),
    nationalCode : yup.string().min(10 , "لطفا کد ملی را درست وارد کنید").max(10 , "لطفا کد ملی را درست وارد کنید"),
})

export default registerValidation