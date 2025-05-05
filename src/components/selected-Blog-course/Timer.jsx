import { useEffect, useState } from "react";
import counter from "../../core/utils/timer.utils";

const Timer = ({month , day , hour , minute , second}) => {

    let [secondState, setSecondState] = useState(second)
    let [minuteState, setMinuteState] = useState(minute)
    let [hourState, setHourState] = useState(hour)
    let [dayState, setDayState] = useState(day)
    let [monthState, setMonthState] = useState(month)

    useEffect(() => {
      counter(secondState , setSecondState , minuteState , setMinuteState , hourState , setHourState, dayState , setDayState , monthState , setMonthState)
    }, [secondState])
    
  return (
    <>
      <div className="self-center text-[20px] m-2">مهلت استفاده از تخفیف</div>
      <div className="flex justify-around items-center h-32 [&>div]:w-[70px] [&>div]:h-20 [&>div]:rounded-3xl [&>div]:bg-[#f5f5f5] [&>div]:flex  [&>div]:flex-col [&>div]:justify-center [&>div]:items-center [&>div]:text-[#444] max-[1360px]:[&>div]:h-16  max-[1360px]:[&>div]:w-[50px] max-[1360px]:[&>div>div]:text-[16px]">
        <div>
          <div className="text-[22px]">{monthState}</div>
          <div>ماه</div>
        </div>
        <div>
          <div className="text-[22px]">{dayState}</div>
          <div>روز</div>
        </div>
        <div>
          <div className="text-[22px]">{hourState}</div>
          <div>ساعت</div>
        </div>
        <div>
          <div className="text-[22px]">{minuteState}</div>
          <div>دقیقه</div>
        </div>
        <div>
          <div className="text-[22px]">{secondState}</div>
          <div>ثانیه</div>
        </div>
      </div>
    </>
  );
};

export default Timer;
