import { useEffect, useRef , useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../common";
import customAxios from "../../core/services/interceptor";
import { settingDbBlog } from "../common/Paginate";

let setBlog;
let Rowsing;
let settingPageNumberBlog;
let settingSort;
let setingInput;

const BlogsMap = () => {
    let view1 ="w-[350px] h-[400px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex flex-col justify-end max-[450px]:justify-center overflow-hidden"
    let view2 ="w-[95%] h-[300px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex overflow-hidden [&>div:nth-child(2)>div:first-child]:h-[20%] [&>div:nth-child(2)>div:first-child]:h-[80%] [&>div:nth-child(2)>div:first-child]:w-full [&>div:nth-child(2)>div:first-child]:pt-[30px] [&>div:nth-child(2)]:h-full [&>div:nth-child(2)>div:first-child>p]:text-[28px] [&>div:nth-child(2)]:w-[60%] [&>div:nth-child(2)>div:first-child>div]:my-[40px] [&>div:first-child]:w-[31%]";

    let state = sessionStorage.getItem("newsClass")
    let location = useLocation();
    let item = useRef();
    let content = useRef();

    const [blogsItem, setBlogsItem] = useState([])
    const [input, setInput] = useState("")
    const [rowsOfPage, setRowsOfPage] = useState(6)
    const [PageNumber, setPageNumber] = useState(1)
    const [sort, setSort] = useState("Active")

    const getBlogs = async () => {
      let result = await customAxios.get(`/News?PageNumber=${PageNumber}&RowsOfPage=${rowsOfPage}&SortingCol=${sort}&SortType=DESC&${input ? `&Query=${input}` : ""}`);
      setBlogsItem(result.news)
      settingDbBlog(result.totalCount)
    }
    useEffect(() => {getBlogs()}, [input])

    useEffect(() => {getBlogs()}, [rowsOfPage])

    useEffect(() => {getBlogs()}, [PageNumber])

    useEffect(() => {getBlogs()}, [sort])
    

    
    useEffect(() => {
      setBlog = blogsItem
      Rowsing = setRowsOfPage
      settingPageNumberBlog = setPageNumber
      settingSort = setSort
      setingInput = setInput
      getBlogs()

    }, [])
  
    return (
        blogsItem.map((element, index) => {
            return (
              <div key={index} className={state == "grid" ? view1 : view2} ref={item}> 
                <div className="w-full h-170px overflow-hidden my-[10px]">  
                
                  <img src={element?.currentImageAddressTumb !== null ? element?.currentImageAddressTumb.indexOf("https://") !== -1 ? element?.currentImageAddressTumb : "../src/assets/images/courses/03.png" : "../src/assets/images/courses/03.png"} alt="" className=" mx-auto h-full w-full rounded-[20px]"   /> 
                
                </div>
                <div dir="rtl" className="w-full h-[210px] mx-auto">
                  <div className="w-[95%] h-[150px] mx-auto"> 

                    <p className="truncate text-[24px] dark:text-white text-right max-[450px]:text-center">{element.title}</p> 
                    <div className="text-[#777] dark:text-[#eee] w-full mt-[15px] leading-6 max-[450px]:text-center" ref={content}>{sessionStorage.getItem("courseClass") == "grid" ? element.miniDescribe.slice(0,97) + "..." : element.miniDescribe.slice(0,97) + "..."}</div>
                  
                  </div>
                <div className="w-full h-[50px] pb-2 flex justify-between items-center">
                <div className="text-[#777] mr-[10px]">بازدید : {element.currentView}</div>
                <Button content="ادامه مطلب" className="whitespace-nowrap text-[16px] scale-[80%]" link={`${location.pathname}/${element.id}`}     />   </div> </div>
              </div>
            );
        })
    )
}

export {setBlog , Rowsing,settingPageNumberBlog , settingSort, setingInput}
export default BlogsMap