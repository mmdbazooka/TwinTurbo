const CourseDetail = ({ content , title , logo , contentStyle , discountPercent , discount , noLogo , dir , className}) => {
  return (
    <div className={'flex w-full justify-between text-[22px] text-[#666] py-[10px] px-4 dark:text-white ' + className}>
        <div dir={!dir ? "rtl" : "ltr"} className={contentStyle + "dark:text-white"}>{content}</div>
        <div className="flex whitespace-nowrap items-center dark:text-[#f3f3f3]"><div className={discount == true ? "visible py-1 px-2 text-[18px] flex justify-center items-center bg-[#36C54E] text-white rounded-2xl mr-2" : "invisible"}>{discountPercent}%</div> {title} &nbsp; <img src={"../src/assets/images/selectedCourse/" + logo} className={`w-9 h-9 ${noLogo}`}/></div>
    </div>
  )
}

export default CourseDetail