const FooterList = ({content1,content2,content3,content4,content5,title,hidden1,hidedn2}) => {
  return (
    <>
        <ul dir="rtl" className="w-[250px] pt-[30px] max-[1300px]:scale-[85%] max-[1000px]:scale-[75%] max-[1000px]:mt-[-20px] max-[820px]:scale-[80%] max-[600px]:scale-[70%] h-ful p-3 [&>li]:text-[#81858b] [&>li]:my-[15px] [&>li]:mr-[5px] [&>li]:text-[20px] dark:[&>li]:text-[#ddd]">
            <p className="text-[25px] text-[#3f4064] dark:text-white">{title}</p>
            <li>{content1}</li>
            <li>{content2}</li>
            <li>{content3}</li>
            <li className={hidden1}>{content4}</li>
            <li className={hidedn2}>{content5}</li>
        </ul>
    </>
  )
}

export default FooterList