let showPassFlag = false

const showPassword = (e) => {
    if(showPassFlag == false) {
        e.target.previousElementSibling.type = "text"
        e.target.src = "../../src/assets/images/panel/closeView.png"
        showPassFlag = true
    }
    else {
        e.target.previousElementSibling.type = "password"
        e.target.src = "../../src/assets/images/panel/view.svg"
        showPassFlag = false
    }
}

export default showPassword