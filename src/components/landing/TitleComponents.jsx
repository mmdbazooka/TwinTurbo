import { useEffect , useState } from "react";
export let setttttttt;

const TitleComponents = ({title,content,className}) => {

  let theme = localStorage.getItem("theme")
  if(theme == "light") theme = "courses-title"
  else theme = "courses-title-dark"
  const [imageSrc, setImageSrc] = useState(`../src/assets/images/landingCourse/${theme}.png`)
  setttttttt = setImageSrc
  
  let images = document.querySelectorAll(".img")

  useEffect(() => {
      images.forEach(el => {
        el.src = imageSrc
      })
  }, [imageSrc])
  
  return (
    <div className={"w-[530px] max-[530px]:w-[410px]  max-[500px]:w-[380px] max-[400px]:w-[350px] max-[500px]:h-[185px]  h-[228px] relative mx-[auto] transition-all flex justify-center items-center   " + className}>

          <div className=" relative top-[25px] z-10 text-center [&>div:last-child]:text-[#9c6dcb] [&>div:first-child]:text-[#5a0ba9] [&>div:first-child]:text-[28px] [&>div]:my-[8px] dark:[&>div:first-child]:text-[#fff] dark:[&>div:last-child]:text-[#f9f9f9]">
              <div>{title}</div>
              <div>{content}</div>
          </div>
          <img src={imageSrc} alt="" className="img titleLand drop-shadow-[0px_3px_6px_#5757574f] w-full h-full absolute left-0 top-0"/>
          
    </div>
  )
}

export default TitleComponents