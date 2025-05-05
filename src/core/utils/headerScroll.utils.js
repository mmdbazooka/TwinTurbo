const headerScroll = () => {
    if (pageYOffset > 600 && location.pathname == "/") {
        if(location.pathname !== "/sign-in" && location.pathname !== "/forgetPassword" && location.pathname !== "/forgetpassword") {
            headerHolder.style.boxShadow = "0 0 7px #ddd" ;
            headerHolder.style.background = "#fff";
            header.firstChild.style.paddingLeft = "25px"
            if(document.documentElement.className == "dark") {
                headerHolder.style.background = "#182239";
                headerHolder.style.boxShadow = "0 0 7px transparent" ;
            } 
        }
        else header.style.background = "linear-gradient(97deg, rgba(90,11,169,1) 0%, rgba(192,3,178,1) 100%)";
        header.style.position = "fixed";
    }
    else {
        headerHolder.style.boxShadow = "0 0 7px transparent" ;
        headerHolder.style.background = "transparent";
        header.firstChild.style.paddingLeft = 0
        header.style.position = "static";
    }
}

export default headerScroll