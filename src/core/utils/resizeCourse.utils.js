let view1 ="w-[350px] h-[400px] [&>div:lastChild>:lastChild]:flex-col shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white flex flex-col justify-end overflow-hidden  hover:shadow-[0_0_7px_#999] active:bg-[#eee] cursor-pointer max-[450px]:justify-center max-[450px]:h-[350px] max-[350px]:h-[330px]";
const resizeCourse = (parent) => {
    
    let children = parent.current.children;

    for (let i = 0; i < children.length; i++) {
        const centerDetails = parent.current.children[i].lastChild.lastChild
        const courseImg = children[i].children[0]
        const item = children[i]
        
        if(window.innerWidth < 800 && location.pathname == "/courses") {
            radios1.checked = true
            courseImg.style.marginTop = "10px"
            item.style.height = "400px"
            courseImg.style.height = "180px"
            centerDetails.style.flexDirection = "column"
            centerDetails.style.width = "180px"
            centerDetails.style.bottom = "20px"
            centerDetails.style.right = "0px"
            item.className = view1;
        }
        else if(window.innerWidth > 800 && window.innerWidth < 1350 && radios2.checked && location.pathname == "/courses") {
            item.style.height = "250px"
            centerDetails.style.alignItems = "flex-start"
            courseImg.style.height = "180px"
            courseImg.style.marginTop = "30px"
        } 
        else if(window.innerWidth > 1350 && !radios1.checked) {
            item.style.height = "300px"
            courseImg.style.height = "92%"
            courseImg.style.marginTop = "10px"
        }
        if(radios1.checked && !radios1.checked) {
            item.style.height = "400px"
        }
        if(window.innerWidth > 0 && window.innerWidth < 1350 && !radios1.checked) {
            centerDetails.style.flexDirection = "column"
            centerDetails.style.width = "200px"
            centerDetails.style.bottom = "20px"
            centerDetails.style.alignItems = "flex-start"
        }
        else if(window.innerWidth > 1350 && !radios1.checked) {
            centerDetails.style.flexDirection = "row"
            centerDetails.style.width = "700px"
            centerDetails.style.bottom = "0px"
            centerDetails.style.alignItems = "center"
        }
    }
}

export default resizeCourse