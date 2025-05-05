import { LinkComponent , Footer } from "../components/common";

const Page404 = () => {
  return (
    <div className="w-[1920px] mx-[auto] max-[1920px]:w-full">
        <div className="w-full h-[400px] flex flex-col items-center justify-center mb-10">
          <div className="relative w-[450px] h-[400px] flex justify-center items-center transition duration-1000 max-[600px]:scale-[90%] max-[500px]:scale-[80%] max-[400px]:scale-[70%] max-[350px]:scale-[60%]">
            <img src="../src/assets/images/404.png" alt="" />
            <img src="../src/assets/images/sircle.png" alt="" className='scale-[70%] absolute right-[45px] top-[140px]' id='sircle1' />
            <img src="../src/assets/images/sircle.png" alt="" className='scale-[70%] absolute left-[45px] top-[105px]' id='sircle2' />
          </div>
          <LinkComponent content="بازگشت به صفحه اصلی" link="/" className="w-[200px] h-[52px] rounded-[15px] bg-[#A644C1] flex justify-center items-center text-[#fff] cursor-pointer hover:bg-[#8e2aae] transition-all duration-300 max-[400px]:scale-[90%] max-[350px]:scale-[80%]" />
        </div>
        <Footer />
    </div>
  )
}

export default Page404