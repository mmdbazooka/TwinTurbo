import TitleComponents from "../TitleComponents";
import ItemNews from "../../map/ItemNewsMap";
import TitleItemNews from './TitleItemNews'
import Button from "../../common/Button";


const News = () => {
  return (
    <div className="w-full flex flex-col items-center">

      <div className="w-[32%] h-[180px] relative max-[1279px]:scale-x-[120%] max-[1023px]:hidden">
        <img src="../src/assets/images/Group 135.png" alt="" className="w-full h-full" id="landingNewsTitle"/>
        <p className="text-[#5a0ba9] dark:text-[#fff] absolute top-[25%] right-[38%] text-[24px]">اخبار و مقالات</p>
      </div>

      <TitleComponents title="اخبار و مقالات" src="courses-title.png" className="max-[1023px]:flex min-[1023px]:hidden mb-[40px]" />

      <div className="w-[90%] flex gap-20 [&>div]:w-[50%] [&>div]:shadow-[0px_0px_20px_#5757574f] dark:[&>div]:shadow-none [&>div]:mx-3 [&>div]:relative [&>div]:rounded-[15px] [&>div]:flex [&>div]:pt-[35px] max-[600px]:[&>div]:pt-[20px] [&>div]:items-center [&>div]:flex-col [&>div]:h-[470px] max-[600px]:[&>div]:h-[550px] max-[1200px]:flex-col max-[1200px]:[&>div]:mx-auto max-[1200px]:[&>div]:w-[85%] max-[1200px]:[&>div]:my-[10px] max-[600px]:w-[95%] max-[600px]:[&>div]:w-[400px] max-[450px]:[&>div]:w-full [&>div]:bg-white dark:[&>div]:bg-[#26324D] ">
          <div>
              <TitleItemNews content="اخبار"/>
              <ItemNews newValue={false} />
              <Button content="بیشتر" className="scale-[90%] absolute left-4 bottom-2" link="/blogs" />
          </div>
          <div>
              <TitleItemNews content="مقالات"/>
              <ItemNews newValue={true} />
              <Button content="بیشتر" className="scale-[90%] absolute left-4 bottom-2" link="/blogs" />
          </div>
      </div>
    </div>
  );
};

export default News;
