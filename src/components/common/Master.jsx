const Master = ({name,ability,src}) => {
  return (
    <div className="w-[340px] scale-[107%] h-[120px] border my-7 rounded-[15px] shadow-[0px_0px_6px_#ccc] dark:shadow-none relative pr-8 bg-white dark:bg-[#26324D]">
        <img src={src == null ? "../src/assets/images/landingMaster/teacher.png" : src.indexOf("http") !== -1 ? src : "../src/assets/images/landingMaster/teacher.png"} alt="" className="h-[90px] w-[90px] absolute right-[8px] top-[-35px] rounded-[15px] max-[1023px]:top-[15px] max-[700px]:scale-[85%]"/>
        <p className="text-[22px] mb-2 max-[650px]:text-[18px] truncate w-[150px] text-center dark:text-[#fff]" >{name}</p>
        <p className="text-[17px] text-[#444] ml-[13px] max-[650px]:text-[14px] dark:text-[#f9f9f9]">{ability}</p>
    </div>
  )
}

export default Master