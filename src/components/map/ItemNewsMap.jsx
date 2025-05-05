import customAxios from '../../core/services/interceptor';
import ItemLandingNews from '../landing/news/ItemLandingNews'
import { useEffect, useState } from 'react';

const ItemNewsMap = ({newValue}) => {
  
  const [blogsItem, setBlogsItem] = useState([])

  const getBlogs = async () => {
    if(newValue == true) {
      let result = await customAxios.get(`/News?PageNumber=3&RowsOfPage=3&SortType=DESC`);
      setBlogsItem(result.news)
    }
    else {
      let result = await customAxios.get(`/News?PageNumber=1&RowsOfPage=3&SortType=DESC`);
      setBlogsItem(result.news)
    }
  }
  useEffect(() => {
    getBlogs()
  }, [])
  

  return (
    <>
      {
        blogsItem.map((element,index) => {
            return <ItemLandingNews key={index} element={element} />
        })
      }
    </>
  );
};

export default ItemNewsMap;
