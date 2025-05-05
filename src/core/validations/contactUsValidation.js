import * as yup from 'yup'

let contactUsValidation = yup.object().shape({
    name : yup.string().required("لطفا نام کاربری را وارد کنید"),
    email : yup.string().email("لطفا ایمیل را به درستی وارد کنید").matches(/^[\w-\.]+@([gmail-]+\.)+[com-]{2,4}$/ , "لطفا ایمیل را به درستی وارد کنید").required("لطفا ایمیل را وارد کنید"),
    phone : yup.string().matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4|0]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ , "لطفا شماره را به درستی وارد کنید").max(10 , "لطفا شماره را به درستی وارد کنید").required("لطفا شماره همراه را وارد کنید"),
    textarea : yup.string().required("لطفا متن را وارد کنید"),
})

export default contactUsValidation