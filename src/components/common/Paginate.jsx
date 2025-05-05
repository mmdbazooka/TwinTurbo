import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import { settingPageNumber } from '../map/CoursesMap';
import { settingPageNumberBlog } from '../map/BlogsMap';
import customAxios from '../../core/services/interceptor';
import { useEffect } from 'react';
import { settingPageNumberCoursePanel } from '../map/ListCousePanelMap';

export let settingDbCourse;
export let settingDbBlog;

const Paginate = ({ itemsPerPage })=>  {

  let location = useLocation()
  const [itemOffset, setItemOffset] = useState(0);
  const [dbCourse, setDbCourse] = useState()
  const [dbBlog, setDbBlog] = useState()
  const [dbCoursePanel, setDbCoursePanel] = useState()

  let pageCount;
  
  const getDbLength = async () => {
      if(location.pathname.indexOf("/courses") !== -1) {
          let result = await customAxios.get(`/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=4&SortType=DESC`) 
          setDbCourse(result.totalCount)
      }
      else if(location.pathname.indexOf("/blogs") !== -1)  {
          let result = await customAxios.get(`/News?PageNumber=1&RowsOfPage=1&SortType=DESC`);
          setDbBlog(result.totalCount)
      }
      else if(location.pathname.indexOf("/panel/ListOfCourse") !== -1) {
        let result = await customAxios.get(`/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=1&SortType=DESC`);
        setDbCoursePanel(result.totalCount) 
      }
      
  }
  
  useEffect(() => {
    settingDbCourse = setDbCourse
    settingDbBlog = setDbBlog
    getDbLength()
  }, [])


  // const num = itemOffset + itemsPerPage;
  // const dbSliced = db?.slice(itemOffset, num);
  if(location.pathname.indexOf("/courses") !== -1) pageCount = Math.ceil(dbCourse / itemsPerPage);
  else if(location.pathname.indexOf("/blogs") !== -1)  pageCount = Math.ceil(dbBlog / itemsPerPage);
  else if(location.pathname.indexOf("/panel/ListOfCourse") !== -1)  pageCount = Math.ceil(dbCoursePanel / itemsPerPage);
  


  const handlePageClick = (e) => {
      let newOffset;
      if(location.pathname.indexOf("/courses") !== -1) newOffset = (e.selected * itemsPerPage) % dbCourse; 
      else if(location.pathname.indexOf("/blogs") !== -1) newOffset = (e.selected * itemsPerPage) % dbBlog; 
      else if(location.pathname.indexOf("/panel/ListOfCourse") !== -1) newOffset = (e.selected * itemsPerPage) % dbCoursePanel; 
      setItemOffset(newOffset);  


      if(location.pathname.indexOf("/courses") !== -1) settingPageNumber(e.selected+1)
      else if(location.pathname.indexOf("/blogs") !== -1) settingPageNumberBlog(e.selected+1) 
      else if(location.pathname.indexOf("/panel/ListOfCourse") !== -1) settingPageNumberCoursePanel(e.selected+1)
    };

  return (
    <>
      <ReactPaginate
        className='my-3 flex justify-around items-center [&>*]:p-[15px] [&>*]:rounded-[50px] [&>*]:w-[50px] [&>*]:h-[50px] [&>*>a]:px-[20px] [&>*>a]:py-[15px] [&>*>a]:rounded-3xl [&>*]:flex [&>*]:justify-center [&>*]:items-center'
        activeClassName='bg-[#a361a1] text-white hover:bg-[#a361a2] dark:hover:bg-[#a361a2]'
        pageClassName='hover:bg-[#999] hover:text-white dark:text-white dark:hover:bg-[#555e76]'
        nextClassName='hover:bg-[#999] hover:text-white dark:text-white dark:hover:bg-[#555e76]'
        previousClassName='hover:bg-[#999] hover:text-white dark:text-white dark:hover:bg-[#555e76]'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        marginPagesDisplayed="10px"
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Paginate