import { Header } from '../components/common/'
import { Outlet } from 'react-router-dom'
import PanelQuickAccess from '../components/panel/PanelQuickAccess'
import { useEffect, useState } from 'react'
import customAxios from '../core/services/interceptor'
import { useSelector } from 'react-redux'
import Loading from '../components/common/Loading'

export let selTok;
export let setMyInf;
const Panel = () => {

    let sel = useSelector(state => state.user.token)

    selTok = sel
    const [myInfo, setMyInfo] = useState()

    const getInfo = async () => {
        if(sel !== "") {
            let result = await customAxios.get("/SharePanel/GetProfileInfo")
            setMyInfo(result)
        }
        else {
            let result = await customAxios.get("/SharePanel/GetProfileInfo")
            setMyInfo(result)
        }
    }

    useEffect(() => {
      getInfo()
      setMyInf = getInfo
    }, [])

  return (
    <>
        <Loading time={500} />
        <div className="w-[1920px] mx-auto my-0 max-[1919px]:w-full relative">

            <Header src="avatar.png" color="#5A0BA9" hClass="fixed" iconClassName="max-[1260px]:invisible" />
            <div className="w-full flex justify-between mt-8">

                <Outlet/>

                <div className="max-[1020px]:hidden bg-white z-[101] w-[400px] rounded-2xl max-[1260px]:w-[70px] max-[1260px]:hover:w-[400px] max-[1260px]:[&:hover>div>img]:w-[50px] max-[1260px]:top-[-108px] relative overflow-hidden transition-all duration-500">

                    <div className="h-[150px] flex justify-around items-center px-3 max-[1260px]:h-[80px]">
                        <div className='text-[25px] truncate w-60' id='usename'>{myInfo?.fName} {myInfo?.lName}</div>
                        <img src={myInfo?.currentPictureAddress} alt="" id='picprofile' className='h-[80px] w-[80px] rounded-[50%] max-[1260px]:h-[50px] transition-all duration-500' />
                    </div>

                    <PanelQuickAccess />

                </div>

            </div>
        </div>

    </>
  )
}

export default Panel