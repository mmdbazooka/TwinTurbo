import {Header,Footer, Submit} from '../components/common'
import {Form,Formik,Field,ErrorMessage} from 'formik'
import FieldInput from "../components/common/FieldInput"
import contactUsValidation from '../core/validations/contactUsValidation'
import contactUsSubmit from '../core/validations/submit/contactUsSubmit'
import Loading from '../components/common/Loading'

const ContactUs = () => {
    return (
        <>
            <Loading time={100} />
            <div className='w-[1920px] mx-[auto] max-[1920px]:w-full'>
                <Header src="avatar.png" ml="25px" color="#5A0BA9" />
                    <div className='w-[80%] mx-auto flex items-center justify-around max-[1260px]:flex-wrap my-10'>
                        <Formik initialValues={{name:"",email:"",phone:"",textarea:""}} onSubmit={(values)=> contactUsSubmit(values)} validationSchema={contactUsValidation}>
                            <Form className="min-w-[600px] h-[750px] shadow-[0_0_7px_#ddd] bg-white dark:bg-gradient-to-tr from-[#4b5f8e] to-[#263659] rounded-3xl flex flex-col max-[1260px]:order-2 items-center justify-evenly transition-all duration-1000 max-[1300px]:scale-[90%] max-[750px]:scale-[80%] max-[540px]:scale-[70%] max-[460px]:min-w-[540px] max-[410px]:scale-[60%] max-[350px]:scale-[50%] max-[540px]:mt-[-100px] max-[350px]:mt-[-150px]" id="recommandsForm">
                                <div className="text-[30px] dark:text-white">تماس با ما</div>

                                <FieldInput name="name" type="text" content="نام و نام خانوادگی" placeholder="name" border="border"/>

                                <FieldInput name="email" type="text" content="ایمیل" placeholder="email" border="border"/>

                                <FieldInput name="phone" type="number" content="شماره موبایل" placeholder="phone call" border="border"/>

                                <div className="relative w-full flex justify-center">

                                    <Field as="textarea" name="textarea" className="dark:bg-[#26324D] placeholder:text-[#5a0ba951] text-[#5A0BA9] dark:text-white border border-[#70707023] outline-none rounded-lg w-[85%] h-60 pl-5 pt-10 px-[5px] resize-none"/>
                                    <div className="text-[20px] text-[#67008F] dark:text-white absolute right-[58px] top-3 transiition-all duration-[.5s]">متن پیام</div>

                                </div>
                                <div className="self-end mr-14 h-5">
                                    <ErrorMessage component={"div"} name="textarea" className='text-[#B00020] dark:text-[#ff3c60] ErrorMessage' />
                                </div>
                                <Submit content="ارسال پیام" className="w-[85%] h-14 max-[500px]:scale-90" />
                            </Form>
                        </Formik>
                        <ul className="min-w-[450px] h-[500px] flex flex-col max-[1260px]:order-1  justify-around items-end self-start transition-all duration-1000 max-[1300px]:scale-[90%] max-[640px]:scale-[80%] max-[640px]:mt-[-50px] max-[640px]:m-[-100px] max-[340px]:mt-[-150px] max-[400px]:scale-[70%] max-[400px]:mr-[-30px]">
                            <li className="flex items-center ">
                                <div className="flex flex-col items-end">
                                    <div className="text-[24px] text-[#666] dark:text-[#f5f5f5]">تماس بگیرید</div>
                                    <div className="text-[18px] text-[#aaa] dark:text-[#ccc]">09336669933</div>
                                </div>
                                <img src="../src/assets/images/contactUs/call.png" alt="" className="ml-5" />
                            </li>
                            <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                    <div className="text-[24px] text-[#666] dark:text-[#f5f5f5]">مکاتبه ایمیلی</div>
                                    <div className="text-[18px] text-[#aaa] dark:text-[#ccc]" dir="rtl">asgharpalang@gmail.com از طریق ایمیل</div>
                                </div>
                                <img src="../src/assets/images/contactUs/message.png" alt="" className="ml-5" />
                            </li>
                            <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                    <div className="text-[24px] text-[#666] dark:text-[#f5f5f5]">ساعت کاری</div>
                                    <div className="text-[18px] text-[#aaa] dark:text-[#ccc]">شنبه تا چهارشنبه 10 تا 20</div>
                                    <div className="text-[18px] text-[#aaa]">پنجشنبه ها 8 تا 12</div>
                                </div>
                                <img src="../src/assets/images/contactUs/time.png" alt="" className="ml-5" />
                            </li>
                            <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                    <div className="text-[24px] text-[#666] dark:text-[#f5f5f5]">نشانی</div>
                                    <div className="text-[18px] text-[#aaa] dark:text-[#ccc]">ساری خیابان فرهنگ روبروی حافظ</div>
                                </div>
                                <img src="../src/assets/images/contactUs/location.png" alt="" className="ml-5" />
                            </li>
                        </ul>

                    </div>
                <Footer />
            </div>
        </>
    )

}

export default ContactUs