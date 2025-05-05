import { useEffect, useState } from "react"
import customAxios from "../../core/services/interceptor";
import { changePic } from '../../core/validations/submit/editProfileSubmit';
import { settingCounter } from "../panel/EditProfile";

export let gettingInfo;

const PicturesProfileMap = () => {

    const [userImageArray, setUserImageArray] = useState([])

    const getInfo = async () => {
        let result = await customAxios.get("/SharePanel/GetProfileInfo")
        setUserImageArray(result.userImage)
    }

    const deleteProfile = async (element) => {
        let formdata = new FormData()
        formdata.append("DeleteEntityId",element.id)
        await customAxios.delete("/SharePanel/DeleteProfileImage",{data:formdata})
        getInfo()
        settingCounter(4)
    }

    useEffect(() => {
        getInfo()
        gettingInfo = getInfo
    }, [])
    
    return (
        userImageArray?.map((element,index)=> {
            return (
                <div className='w-[150px] h-[120px] rounded-lg overflow-hidden mx-[2px] [&:hover>div]:bottom-0 relative'>
                    <img src={element.puctureAddress} className='w-full h-full' alt="" onClick={ ()=> changePic(element) } />
                    <div className='w-full h-[35px] flex justify-center items-center px-[10px] bg-[#cccccc96] transition-all duration-400 absolute bottom-[-45%] left-0'>
                        <span onClick={()=> deleteProfile(element)} className='text-[20px] cursor-pointer' >حذف</span> 
                    </div> 
                </div>
            )
        })
    )
}

export default PicturesProfileMap