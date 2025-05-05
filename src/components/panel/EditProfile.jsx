import React , { useEffect, useRef, useState } from 'react'
import {Formik,Form, Field} from 'formik'
import EditProfileItem from './EditProfileItem'

import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import editProfileValidation from '../../core/validations/editProfileValidation';
import { showModalPic, editProfileSubmit , upLoadPicture} from '../../core/validations/submit/editProfileSubmit';
import customAxios from '../../core/services/interceptor'
import { ToastContainer } from 'react-toastify'
import user from '../../redux/user'
import Loading from '../common/Loading'
import PicturesProfileMap from '../map/PicturesProfileMap'

export let settingCounter;
const EditProfile = () => {
    let pos = 0;
    let theme = localStorage.getItem("theme")
    let userImage = useRef()
    let img = useRef()
    const [myInfo, setMyInfo] = useState()
    const datePicker = useRef()
    const [counter, setCounter] = useState(4)

    const getInfo = async () => {
        let result = await customAxios.get("/SharePanel/GetProfileInfo")
        setMyInfo(result)
        console.log(result.userImage);
    }


    const goDirection = (e) => {
        if(e.target.className.indexOf("left") !== -1) {
            if(pos == 0){
                pos = -myInfo?.userImage.length * myInfo?.userImage.length*2
                gallery.style.left = pos + "%" 
            }
            else {
                pos = pos + myInfo?.userImage.length * 5;
                gallery.style.left = pos + "%"
            }
        }
        else if( e.target.className.indexOf("right") !== -1) {
            if(pos == -myInfo?.userImage.length * myInfo?.userImage.length*2){
                pos = 0
                gallery.style.left = pos + "%" 
            }
            else {
                pos = pos - myInfo?.userImage.length * 5;
                gallery.style.left = pos + "%"
            }
        }
    }


    useEffect(() => { 
        getInfo() 
        settingCounter = setCounter
    }, [])
    

    const inHovering = ()=> img.current.src = "../src/assets/images/panel/camera hover.png"
    const outHovering = ()=> img.current.src = "../src/assets/images/panel/camera.png"
    

    return (
        <div id="editProfile" className="h-[1550px] max-[1200px]:h-[2850px] w-[79%] max-[1300px]:w-full relative">

            <div className="h-[250px] justify-center items-center max-[1200px]:h-[15%]">
                <div className="relative w-[50%] mx-auto h-full flex flex-col justify-center items-center">
                    <div className='cursor-pointer overflow-hidden [&:hover>div]:bottom-0 w-[120px] h-[120px] rounded-[50%] mb-[25px] relative' onClick={(e)=> showModalPic(e)}>
                        <img src={myInfo?.currentPictureAddress} alt="" className='rounded-[50%] w-[120px] h-[120px]' id="userImage" />
                        {/* <input type="file" className='hidden'  id='fileInput' />
                        <label htmlFor="fileInput" className='border border-black w-[34px] h-[34px] bg-[#db9cdb] cursor-pointer flex justify-center items-center text-[#fff] text-[20px] rounded-[50%] absolute right-[-2px] top-[80px]' onMouseOver={inHovering} onMouseOut={outHovering} ><img src="../src/assets/images/panel/camera.png" alt="" className='w-[20px] h-[15px]' ref={img} /></label> */}
                        <div className='absolute bottom-[-100%] bg-[#cccccc96] w-full h-[30px] transition-all duration-300 flex justify-center items-center'><img src="../src/assets/images/panel/camera.png" alt="" className='w-[25px] h-[20px]' /></div>
                    </div>
                </div>
            </div>
            <div id="modalPicture" className='overflow-hidden absolute top-[-100%] h-[700px] w-[650px] bg-[#fff] rounded-[15px] z-[100] shadow-[0_0_50px_5px_#777] transition-all duration-700 right-[24%]'>
                <div className='h-[10%] py-[5px] flex items-center justify-between px-[20px]'>
                    <img src="../src/assets/images/close.svg" alt="" className='w-[40px] h-[40px] cursor-pointer' onClick={()=> { modalPicture.classList.remove("top-[12%]"); modalPicture.classList.add("top-[-100%]") }} />
                    <span className='text-[20px]'>انتخاب عکس گالری</span>
                </div>
                <div className='flex h-[90%]  pt-[5px]  flex-wrap content-start'>
                    
                <div className='w-full h-[30%] overflow-hidden' >
                    <div id='gallery' className="h-full transition-all duration-700 relative left-0 flex justify-around items-center" style={{width:myInfo?.userImage.length * 200 + "px"}}>
                        <PicturesProfileMap />
                    </div>
                </div>
                <div className='mx-auto flex justify-center relative'>
                    <div className={`${myInfo?.userImage.length < counter ? "hidden" : ""} left mx-[auto] w-[40px] h-[40px] rounded-[50%] border flex justify-center items-center cursor-pointer`} onClick={(e)=> goDirection(e)}>L</div>
                    <div className={`${myInfo?.userImage.length < counter ? "hidden" : ""} right mx-auto w-[40px] h-[40px] rounded-[50%] border flex justify-center items-center cursor-pointer`} onClick={(e)=> goDirection(e)}>R</div>
                </div>
                <div className='w-full h-[63%] flex justify-center items-center'>
                    <input type="file" name="" id="file" className='hidden' onInput={(e)=> upLoadPicture(e)} />
                    <label htmlFor='file' className='w-[80%] h-[80%] rounded-lg cursor-pointer flex justify-center items-center' style={{border:"1px dashed black"}}>
                        <span className='text-[18px]'>برای آپلود عکس اینجا کلیک کنید</span>
                        <img src="../src/assets/images/panel/uploadPic.png" alt="" className='w-[90px] h-[60px] ml-[25px]' />
                    </label>
                </div>
                    
                </div>
            </div>
            <Formik initialValues={{lName:"",fName:"",userAbout:"",linkdinProfile:"",telegramLink:"",receiveMessageEvent:false,homeAdderess:"",nationalCode:"",gender:true,birthDay:""}} onSubmit={(values)=> editProfileSubmit(values,userImage)} validationSchema={editProfileValidation}>
                {(form)=> (
                    <Form dir='rtl' className="items-start max-[1200px]:flex-col max-[1200px]:[&>div]:w-full py-[10px] w-[95%] flex mx-auto bg-[#f4f4f4] mt-[-10px] rounded-[25px] [&>div]:w-[50%] [&>div]:flex [&>div]:flex-col [&>div>div]:my-[15px] [&>div>div]:w-[95%] [&>div>div]:h-[200px] [&>div>div]:rounded-[15px] [&>div>div]:mx-auto [&>div>div]:bg-[#fff] [&>div>div>div]:m-[20px] ">
                        <div>

                            <EditProfileItem content="نام" name="fName" placeholder="نام را وارد کنید ..." border="border border-[#ccc]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl"  />
                            <EditProfileItem content="درباره من" name="userAbout" placeholder="مشخصات را وارد کنید ..." border="border border-[#ccc]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl"  />
                            <EditProfileItem content="کد ملی" name="nationalCode" placeholder="کد ملی را وارد کنید ..." border="border border-[#ccc]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl"  />
                            <div>
                                <div>جنسیت</div>
                                <div className='flex pt-[20px] [&>div]:w-[150px] [&>div]:h-[100px] [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div>*]:m-[15px] [&>div>*]:cursor-pointer [&>div>*]:text-[20px]'>
                                    <div>
                                        <input type="radio" name="gendedr" id="radio1" className='w-[20px] h-[20px]' onChange={() => form.values.gender = true}/>
                                        <label htmlFor="radio1">مرد</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gendedr" id="radio2" className='w-[20px] h-[20px]' onChange={() => form.values.gender = false}/>
                                        <label htmlFor="radio2">زن</label>
                                    </div>
                                </div>
                            </div>
                                
                                <div className='[&>div:last-child]:w-[85%] [&>div:last-child>input]:h-[50px] [&>div:last-child>input]:border [&>div:last-child>input]:border-[#ccc] [&>div:last-child>input]:relative [&>div:last-child>input]:top-[-20px] [&>div:last-child>input]:text-[#5A0BA9]'>
                                    <div>تاریخ تولد</div>
                                    <DatePicker
                                        ref={datePicker}
                                        onChange={() => {
                                        setTimeout(() => {
                                            form.values.birthDay = datePicker.current.children[0].value
                                        }, 10);
                                        }}
                                        placeholder="تاریخ تولد را وارد کنید ..."
                                        minDate="1900/1/1"
                                        maxDate={new Date}
                                        // calendar={persian}
                                        // locale={persian_fa}
                                        arrow={false}
                                        calendarPosition="left"
                                        inputClass='text-[18px] pr-[15px] w-full placeholder:text-[#5a0ba951] text-[#5A0BA9]  border-[rgba(112,112,112,0.14)] outline-none rounded-lg h-12 pl-5 placeholder:text-[#b9b7b7]'
                                    />
                                </div>


                        </div>
                        <div>

                            <EditProfileItem content="نام خانوادگی" name="lName" placeholder="نام خانوادگی را وارد کنید ..." border="border border-[#ccc]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl"  />
                            <EditProfileItem content="پروفایل لینکدین" name="linkdinProfile" placeholder=" لینک لینکدین را وارد کنید ..." border="border border-[#ccc]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl"  />
                            <EditProfileItem content="لینک تلگرام" name="telegramLink" placeholder="لینک تلگرام  را وارد کنید ..." border="border border-[#ccc]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl"  />
                            <div>
                                <div>آیا مایل به دریافت خبر هستید؟</div>
                                <div className='flex pt-[20px] [&>div]:w-[150px] [&>div]:h-[100px] [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div>*]:m-[15px] [&>div>*]:cursor-pointer [&>div>*]:text-[20px]'>
                                    <div>
                                        <input type="radio" name="receiveMessageEvent1" id="radio3" className='w-[20px] h-[20px]' onChange={() => form.values.receiveMessageEvent = true}/>
                                        <label htmlFor="radio3" className='px-5 relative right-[-30px] '>بله</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="receiveMessageEvent1" id="radio4" className='w-[20px] h-[20px]' onChange={() => form.values.receiveMessageEvent = false}/>
                                        <label htmlFor="radio4" className='px-5 relative right-[-30px] '>خیر</label>
                                    </div>
                                </div>
                            </div>
                            <EditProfileItem content="ادرس منزل" name="homeAdderess" placeholder="ادرس منزل را وارد کنید ..." border="border border-[#ccc]" display="hidden" className="placeholder:text-[#b9b7b7]" dir="rtl"  />

                        </div>

                        <div className='absolute bottom-0 left-0 flex justify-center items-center' style={{height:"100px",width:"100%"}}>
                            <button type='submit' className='w-[150px] bg-[#922492] active:bg-[#922492dd] text-[#fff] scale-[105%] px-[15px] h-[45px] rounded-[30px] right-[44%]' >ثبت تغییرات</button>
                        </div>  

                    </Form>
                    
                )}
            </Formik>
            
            <ToastContainer theme={theme} autoClose={4000} position="top-center" limit={2}  /> 

        </div>
    )
}

export default EditProfile