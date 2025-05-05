import { Link, useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import customAxios from '../../core/services/interceptor'
import TopDashboard from './TopDashboard'
import { Calendar } from 'react-multi-date-picker'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashBoard = () => {

  let navigate = useNavigate()

  const [myInfo, setMyInfo] = useState()

  const getInfo = async () => {
      let result = await customAxios.get("/SharePanel/GetProfileInfo")
      console.log(result);
      setMyInfo(result)
  }


  useEffect(() => {
    navigate('/panel/userpanel')
    getInfo()
  }, [])

  return (
    <div id='dashBoard' className="w-[79%] max-[1260px]:w-[94%] bg-[#f5f5f5] relative flex flex-col ">
        <div className='h-[200px] max-[1500px]:h-[300px] bg-[#f5f5f5] flex flex-wrap justify-around items-start relative top-[-13px] [&>div>div:first-child]:rounded-lg [&>div>div:first-child]:bg-[#EDF4FF] [&>div>div:last-child]:h-[80%] [&>div>div:last-child]:flex [&>div>div:last-child]:flex-col [&>div>div:last-child]:justify-evenly [&>div>div:last-child]:items-center'>
          <TopDashboard src="testPassed.svg" title="تست های قبول شده" content="10" />
          <TopDashboard src="testAttended.svg" title="تست های شرکت شده" content="16" />
          <TopDashboard src="allProjects.svg" title="پروژه ها" content="79" />
          <TopDashboard src="allCourses.svg" title="دوره ها" content="120" />
        </div>
        <div className='flex justify-between h-[80%] p-5'>
          <div className='w-[30%] flex-col rounded-t-2xl'>
            <Calendar className='dashboardCalender' />
          </div>
          <div className='w-[70%] flex-col'>
            <div className='w-[90%] h-[240px] bg-white mx-auto rounded-2xl relative'>
              <h1 className='absolute right-4 top-4 text-[20px]'>مشخصات فردی</h1>
              <div className="w-[100px] h-[100px] absolute right-10 bottom-20 text-[#a472a4]">
                <CircularProgressbar value={myInfo?.profileCompletionPercentage} text={`${myInfo?.profileCompletionPercentage}%`} />
                <span className="absolute bottom-[-40px]">تکمیل پروفایل</span>
              </div>
              <div className="w-[75%] h-full pt-3 flex flex-col flex-wrap px-2 [&>div]:flex [&>div]:flex-col [&>div>span:first-child]:mb-1 [&>div]:my-2 " dir="rtl">
                <div>
                  <span className='text-[#9b9b9b]'>نام و نام خانوادگی</span>
                  <span>{myInfo?.fName} {myInfo?.lName}</span>
                </div>
                <div>
                  <span className='text-[#9b9b9b]'>تاریخ تولد</span>
                  <span>{myInfo?.birthDay.slice(0,10).replaceAll("-" , "/")}</span>
                </div>
                <div>
                  <span className='text-[#9b9b9b]'>ایمیل</span>
                  <span>{myInfo?.email}</span>
                </div>
                <div>
                  <span className='text-[#9b9b9b]'>کد ملی</span>
                  <span>{myInfo?.nationalCode}</span>
                </div>
                <div>
                  <span className='text-[#9b9b9b]'>شماره همراه</span>
                  <span>{myInfo?.phoneNumber}</span>
                </div>
              </div>
              <Link to="/panel/editprofile">
                <span className="px-5 py-2 rounded-xl text-white absolute bottom-4 left-6 bg-[#36c54e] hover:bg-[#38b24c]">ویرایش اطلاعات</span>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DashBoard