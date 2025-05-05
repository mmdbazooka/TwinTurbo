import { toast } from 'react-toastify';
import { setMyInf } from '../../../screens/Panel';
import customAxios from '../../services/interceptor';
import { setLoad } from '../../../components/common/Loading';
import { gettingInfo } from '../../../components/map/PicturesProfileMap';

let input ;
let token = localStorage.getItem("token")
const showModalPic = (e)=> {
        
    modalPicture.classList.remove("top-[-100%]"); 
    modalPicture.classList.add("top-[12%]");

    // userImage.current.src = URL.createObjectURL(e.target.files[0])
    
    
}
const upLoadPicture = async (e) => {
    input = e.target.files[0]
    if(input) {
        setLoad(false)
        let imageData = new FormData()
        imageData.append("formFile", input)
        await customAxios.post("/SharePanel/AddProfileImage",imageData)
        await gettingInfo()
        setLoad(true)
        toast.success("عکس با موفقیت اضافه شد")
    }
}
const changePic = async (element)=> {
    userImage.src = element.puctureAddress
    userImage.setAttribute("data-id",element.id)
}

const editProfileSubmit = async (values) => {
    if(input) {
        picprofile.src = userImage.getAttribute("src")
        pictureHeader.src = userImage.getAttribute("src")
        let formDataOne = new FormData()
        formDataOne.append("ImageId",userImage.getAttribute("data-id"))
        let result = customAxios.post("/SharePanel/SelectProfileImage",formDataOne)
    }

    // 
        

        // await customAxios.delete("/SharePanel/DeleteProfileImage",imageData)
        
    // }
    
    let res = await customAxios.get("/SharePanel/GetProfileInfo")

    let formData = new FormData();
    formData.append("LName" , values.lName !== "" ? values.lName : res.lName)
    formData.append("FName" , values.fName !== "" ? values.fName : res.fName)
    formData.append("UserAbout" , values.userAbout !== "" ? values.userAbout : res.userAbout)
    formData.append("LinkdinProfile" , values.linkdinProfile !== "" ? values.linkdinProfile : res.linkdinProfile)
    formData.append("TelegramLink" , values.telegramLink !== "" ? values.telegramLink : res.telegramLink)
    formData.append("ReceiveMessageEvent" , values.receiveMessageEvent )
    formData.append("HomeAdderess" , values.homeAdderess !== "" ? values.homeAdderess : res.homeAdderess)
    formData.append("NationalCode" , values.nationalCode !== "" ? values.nationalCode : res.nationalCode)
    formData.append("Gender" , values.gender )
    formData.append("BirthDay" , values.birthDay ? values.birthDay : res.birthDay)
    formData.append("Latitude" , "12.3")
    formData.append("Longitude" , "14.6")

    let update = await customAxios.put("/SharePanel/UpdateProfileInfo",formData,
        {headers : {"Authorization" : "Bearer " + token}}
    )
    if(update.success) {
        let newRes = await customAxios.get("/SharePanel/GetProfileInfo")
        setMyInf(newRes)
        toast.success("عملیات با موفقیت انجام شد")
    }
    else {
        toast.error(update?.errors[0])
    }

}

export {showModalPic , editProfileSubmit , changePic , upLoadPicture}