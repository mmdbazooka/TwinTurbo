import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Typewriter from "./Typewriter";
import { useRef } from "react";
import { useEffect } from "react";

const HeroSection = () => {
  let navigate = useNavigate();
  let btn = useRef()
  let parentText = useRef()
  const parent = useRef()
  
  return (
    <div className="w-full h-[900px] relative max-[1650px]:h-[800px] max-[1500px]:h-[700px] max-[1270px]:h-[650px]" ref={parent} id="heroSection">
      <img src="../src/assets/images/heroSection/bg-top.png" alt="" className="max-[1020px]:hidden w-full h-full absolute left-0 -top-[2px] scale-x-[107%] scale-y-[117%] -z-10 max-[1140px]:scale-x-[115%] max-[1122px]:scale-x-[120%]"/>
      <img src="../src/assets/images/heroSection/woman.png" alt="" className="absolute scale-[72%] left-[-10px] top-[80px] z-10 max-[1500px]:scale-[60%] max-[1500px]:left-[-100px] max-[1020px]:hidden max-[1350px]:scale-[50%] max-[1350px]:left-[-200px]" id="heroSectionWoman"/>
      <img src="../src/assets/images/heroSection/bg-top.png" alt="" className="scale-[130%] object-cover absolute top-0 left-0 w-full h-[90%] max-[1020px]:block hidden -z-[15]"/>

      <Header src="avatar.png" color="#5A0BA9" hClass="fixed" />
        <div dir="rtl" className="max-[1020px]:top-[170px] w-[650px] h-[400px] max-[1020px]:w-full max-[1350px]:scale-[85%] max-[1350px]:right-[50px] max-[1057px]:right-0 max-[1020px]:items-center max-[1280px]:mx-auto flex flex-col justify-evenly absolute right-[150px] top-[200px] max-[1270px]:top-[150px]">
            <h1 className="z-10 text-[36px] text-[#666] mr-[45px] max-[1020px]:mr-0 dark:text-[#fff]">پژوهشگاه سپهر</h1>
            <div className="z-10 relative w-full" ref={parentText}>
                <Typewriter
                  text="پ ژوهشگاه سپهر با هدف تولید و انتشار محتوای با کیفیت اموزشی و همچنین
                  آشنایی جامعه با فضای کسب و کار در فضای مجازی ایجاد شده و امید داریم
                  بتوانیم با راه کار های نوین و استفاده از پتانسیل فضای مجازی ایجاد فرصت
                  کنیم برای افرادی که خواهان پیشرفت خود و کشورشان هستند"
                  speed={40}
              />
            </div>
            <button ref={btn} className="z-10 transition-all duration-500 bg-gradient-to-r max-[1020px]:mx-auto from-[#5A0BA9] to-[#C003B2] hover:bg-gradient-to-l rounded-[25px] w-[200px] h-[55px] whitespace-nowrap  text-[19px]  text-[#fff]" onClick={() => navigate("/courses")}>
              شروع یادگیری
            </button>

        </div>
    </div>
  );
};

export default HeroSection;
