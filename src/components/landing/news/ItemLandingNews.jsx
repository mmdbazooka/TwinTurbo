
const ItemLandingNews = ({ element }) => {
  return (
    <>
      <div dir="rtl" className="dark:bg-gradient-to-l from-[#182239] to-[#314062] w-[95%] h-[120px] px-5 rounded-xl shadow-[0_-5px_5px_#dddf] bg-white dark:shadow-[0_-5px_5px_#2e2e49] max-[600px]:my-2 flex flex-row-reverse justify-around items-center max-[1400px]:[&>p]:text-[18px] max-[600px]:flex-col-reverse max-[600px]:h-[145px]">
          <p className="dark:text-[#fff] text-[#888] text-[20px] mx-3 max-[600px]:truncate max-[600px]:w-[100%] truncate w-[400px]">{element.miniDescribe.slice(0,45) + "..."}</p>
          <img src={element?.currentImageAddressTumb !== null ? element?.currentImageAddressTumb.indexOf("https://") !== -1 ? element?.currentImageAddressTumb : "../src/assets/images/courses/01.png" : "../src/assets/images/courses/01.png"} alt="" className="w-[150px] h-[100px] rounded-[15px] ml-5 mt-2 relative top-[-5px]"/>
      </div>
    </>
  )
}

export default ItemLandingNews