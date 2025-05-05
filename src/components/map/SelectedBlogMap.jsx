import { useLocation, useNavigate } from "react-router-dom";
import findPath from '../../core/utils/findPath.utils'
import { useState , useEffect } from "react";
import customAxios from "../../core/services/interceptor";

const SelectedBlog = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);  
  
    const getBlogs = async () => {
      let result = await customAxios.get("/News?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC") 
      setBlogs(result.news)
    }
  
    useEffect(() => {
      getBlogs()
    }, [])
  

    return blogs.map((element, index) => {
        return (
        <div key={index} className="w-full h-[120px] flex cursor-pointer   max-[1355px]:h-[100px]" onClick={() => findPath(element.id,location,navigate)}>
            <div className="w-[170px] h-full flex items-center justify-center">
                <img src={element?.currentImageAddressTumb !== null ? element?.currentImageAddressTumb : "../src/assets/images/courses/03.png"} alt="" className="w-[90%] h-[110px] rounded-[15px] max-[1355px]:h-[85px]"/>
            </div>
            <div className="w-[70%] h-full py-[5px] px-[15px] flex flex-col justify-center">
                <p className="text-[25px] max-[1355px]:text-[22px]">{element.addUserFullName}</p>
                <p className="text-[#777] w-[90%] truncate max-[1355px]:text-[13px]">{element.newsCatregoryName}</p>
            </div>
        </div>
        );
    });
};

export default SelectedBlog;
