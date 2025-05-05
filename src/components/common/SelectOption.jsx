import { settingCountBlog } from '../../screens/Blogs';
import { settingCountCourse } from '../../screens/Courses';
import { Rowsing } from '../map/BlogsMap';
import { Rows } from '../map/CoursesMap'

const SelectOption = () => {

  const caller = (e) => {
      if(location.pathname.indexOf("/courses") !== -1) {
        settingCountCourse(e.target.value)
        Rows(e.target.value)
      }
      else if(location.pathname.indexOf("/blogs") !== -1) {
        settingCountBlog(e.target.value)
        Rowsing(e.target.value)
      }
  }

  return (
    <select name="" id="" className="w-[80px] h-[60px] bg-white dark:text-white dark:bg-[#26324d] p-[5px] rounded-[18px] text-[25px] shadow-[0_0_7px_#ccc] max-[600px]:hidden max-[770px]:scale-[90%]">
      <option value="3" onClick={(e)=> caller(e)}>3</option>
      <option value="4" onClick={(e)=> caller(e)}>4</option>
      <option value="5" onClick={(e)=> caller(e)}>5</option>
      <option value="6" selected onClick={(e)=> caller(e)}>6</option>
    </select>
  );
};

export default SelectOption;
