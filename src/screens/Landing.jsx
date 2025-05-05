import { useEffect } from "react";
import Footer from "../components/common/Footer";
import {Category , Courses , Masters , Navigation , News , Recommands , Services , HeroSection} from '../components/landing'
import landingScrollLogic from "../core/utils/landingScroll.utils";
import Loading from "../components/common/Loading";

const Landing = () => {
  
  useEffect(() => {
      document.addEventListener("scroll",()=> landingScrollLogic())
  }, [])

  return (
    <>
      <Loading time={500} />
      <div className="w-[1920px] mx-auto my-0 overflow-hidden max-[1919px]:w-full relative">
        <div className="h-[5px] bg-[#9f009a] fixed top-0 left-0 z-[1000] dark:bg-[#fff]" style={{width:"0px"}} id="scrollNav"></div>
        <Navigation />
        <HeroSection />
        <Services />
        <Category />
        <Courses />
        <Masters />
        <News />
        <Recommands />
        <Footer />

      </div>
    </>
  );
};

export default Landing;
