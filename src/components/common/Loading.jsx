import { useEffect, useState } from "react"

export let setLoad;
const Loading = ({ time }) => {

  const [isLoaded, setisLoaded] = useState(false)

  useEffect(() => {
    setLoad = setisLoaded
    setTimeout(() => {
        setisLoaded(true)
    }, time);
  }, [])
  
  return (
    <div className={isLoaded ? "hidden" : "fixed flex justify-center items-center z-[99999] w-full h-full bg-[#00000090]"}>
        <span className="loader "></span>
    </div>
  )
}

export default Loading