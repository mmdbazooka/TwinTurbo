import Button from "../common/Button";
import LandingCatMap from "../map/LandingCatMap";
import TitleComponents from "./TitleComponents"

const Category = () => {

  return (
    <div className="w-full flex flex-col justify-around items-center relative">
      <TitleComponents title="دسته بندی ها" content="گسترده وسیعی از موضوعات" src="courses-title.png" />
      <div className="w-[80%] my-10 flex flex-wrap justify-center [&>div]:bg-[#fff] dark:[&>div]:bg-[#1e293b] max-[1000px]:[&>div]:transtion max-[1000px]:[&>div]:duration-1000 [&>div]:m-5 [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:justify-around  [&>div]:rounded-[15px] [&>div]:shadow-[0px_0px_2px_#5757574f] text-[27px] max-[1000px]:text-[20px] max-[350px]:[&>div]:my-[-5px]">
          <LandingCatMap />
      </div>
      <Button content="بیشتر" link="/courses" />
      <img src="../src/assets/images/landingCategory/n.png" alt="" className="absolute top-[180px] max-[700px]:top-[250px] left-[800px] h-[85px] z-[-2] transition-all duration-[2s]" id="planet1" />
      <img src="../src/assets/images/landingCategory/n.png" alt="" className="absolute bottom-[150px] right-[800px] h-[65px] z-[-2] transition-all duration-[2s]" id="planet2" />
    </div>

  );
};

export default Category;
