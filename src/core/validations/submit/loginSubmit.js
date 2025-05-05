import customAxios from "../../services/interceptor"

const loginSubmit = async (values,navigate,dispatch,onTokenchange) => {
    let result = await customAxios.post("/Sign/Login" , {
        phoneOrGmail : values.phoneOrGmail,
        password : values.password,
        rememberMe : values.rememberMe
    })
    if(result.success) {
        navigate("/panel/userpanel")
        localStorage.setItem("token",result.token)
        dispatch(onTokenchange(result.token))
    }
    else alert(result.message)
}

export default loginSubmit