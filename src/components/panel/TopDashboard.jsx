const TopDashboard = ({src , title , content}) => {
  return (
    <div className="bg-white rounded-xl w-[22%] h-[110px] my-3 flex justify-around items-center transition-all duration-200 max-[1500px]:w-[48%] [&>div:last-child]:w-[50%]">
        <div className="w-16 h-16 flex justify-center items-center">
            <img src={"../src/assets/images/dashboard/" + src} alt="" />
        </div>
        <div className='[&>span:last-child]:text-[24px] '>
            <span className="whitespace-nowrap">{title}</span>
            <span>{content}</span>
        </div>
    </div>
  )
}

export default TopDashboard