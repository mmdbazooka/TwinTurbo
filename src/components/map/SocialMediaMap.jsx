import { useState , useEffect } from "react";

export let reRend ;

const SocialMediaMap = () => {
    
  let theme = localStorage.getItem("theme")
  const [reRender, setReRender] = useState(theme == "light" ? true : false)

  useEffect(() => {
    reRend = setReRender
  }, [reRender])

  const changeSocialIcon = (img)=> {img.src = img.src.replace(".png" , "-light.png")}
  const changeSocialIconDefault = (img)=> {img.src = img.src.replace("-light.png" , ".png")}
  
  let rel = [
    {src : "aparat" , beforeClass : "before:bg-[#ee1b60]"},
    {src : "insta" , beforeClass : "instagram"},
    {src : "whatsapp" , beforeClass : "before:bg-[#51cc5e]"},
    {src : "telegram" , beforeClass : "before:bg-[#36AEE0]"},
  ]

  return (
    rel.map((el,index) => {
        return (
            <div key={index} className={"socialMediaIcons relative -z-1 overflow-hidden border border-[#ccc] rounded-[9px] " + el.beforeClass} onMouseOver={theme == "light" ? (e)=> changeSocialIcon(e.target.firstChild || e.target) : undefined} onMouseOut={theme == "light" ? (e)=> changeSocialIconDefault(e.target.firstChild || e.target) : undefined}>
                <img src={theme == "light" && reRender == true ? "../src/assets/images/footer/" + el.src + ".png" : "../src/assets/images/footer/" + el.src + "-light.png"} alt="" className="scale-[70%] z-10 relative w-16" />
            </div>
        )
    })
  )
}

export default SocialMediaMap