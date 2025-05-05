let view1 ="w-[350px] h-[400px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex flex-col justify-end overflow-hidden max-[450px]:justify-center max-[450px]:h-[350px] max-[350px]:h-[330px]";

const resizeBlog = (parent) => {

    let children = parent.current.children;

    if(window.innerWidth < 800 && location.pathname == "/blogs") {
        for (let i = 0; i < children.length; i++) {
            children[i].className = "";
            children[i].className = view1;
        }
        radios1.checked = true
    }
    else if(window.innerWidth > 800 && window.innerWidth < 1350 && radios2.checked && location.pathname == "/blogs") {
        for (let i = 0; i < children.length; i++) {
            children[i].style.height = "250px"
            children[i].children[0].style.height = "180px"
            children[i].children[0].style.marginTop = "30px"
        }
    } 
    else if(window.innerWidth > 1350) {
        for (let i = 0; i < children.length; i++) {
            children[i].style.height = "300px"
            children[i].children[0].style.height = "92%"
            children[i].children[0].style.marginTop = "10px"
        }
    }
    if(radios1.checked) {
        for (let i = 0; i < children.length; i++) {
            children[i].style.height = "400px"
        }
    }
}

export default resizeBlog