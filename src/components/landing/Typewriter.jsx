import useTypewriter from "../customHook/Typewriter";

const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return (
    <p className=" text-[20px] w-[600px] text-[#777] max-[1500px]:text-[16px] max-[1020px]:mx-auto max-[599px]:w-[300px] dark:text-[#eee]" dir="rtl" id="paragraph">
      {displayText}
    </p>
  );
};

export default Typewriter;
