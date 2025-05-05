let view1 ="w-[350px] h-[400px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex flex-col justify-end overflow-hidden  hover:shadow-[0_0_7px_#999] active:bg-[#eee] cursor-pointer";
let view2 ="w-[95%] h-[300px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex overflow-hidden hover:shadow-[0_0_7px_#999] active:bg-[#eee] cursor-pointer [&>div:nth-child(2)>div:first-child]:h-[20%] [&>div:nth-child(2)>div:first-child]:h-[80%] [&>div:nth-child(2)>div:first-child]:w-full [&>div:nth-child(2)>div:first-child]:pt-[30px] [&>div:nth-child(2)]:h-full [&>div:nth-child(2)>div:first-child>p]:text-[28px] [&>div:nth-child(2)]:w-[65%] [&>div:nth-child(2)>div:first-child>div]:my-[40px] [&>div:first-child]:w-[31%] [&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:pr-[15px] [&>div:first-child]:h-[92%] [&>div:nth-child(2)>:first-child]:top-[45px] [&>div:first-child>img]:h-[85%] [&>div:last-child>div:last-child]:items-center";

const changeViewCourses = (parent) => {
  let children = parent.current.children;
  for (let i = 0; i < children.length; i++) {
    
    let centerDetails = parent.current.children[i].lastChild.lastChild
    let courseImg = children[i].children[0]
    let item = children[i]

    if(radios1.checked) {
      centerDetails.style.flexDirection = "column"
      item.lastChild.children[2].style.top = "70px" 
      item.lastChild.children[1].style.top = "4px" 
      item.lastChild.children[1].style.left = "4px" 
    }
    else if (radios2.checked) {
      centerDetails.style.flexDirection = "row"
      item.lastChild.children[2].style.top = "28px" 
      item.lastChild.children[1].style.top = "28px" 
      item.lastChild.children[1].style.left = "56px" 
    }
    if (radios1.checked) {
      centerDetails.style.flexDirection = "column"
      item.style.height = "400px"
      courseImg.style.marginTop = "10px"
      courseImg.style.height = "180px"
      centerDetails.style.alignItems = "flex-start"
      centerDetails.style.width = "180px"
      centerDetails.style.bottom = "20px"
      centerDetails.style.right = "0px"
      item.className = view1;

    } 
    if (!radios1.checked && window.innerWidth > 1350) {
      item.lastChild.children[2].style.top = "28px" 
      item.lastChild.children[1].style.top = "28px" 
      item.lastChild.children[1].style.left = "56px" 
      courseImg.style.height = "92%"
      item.style.height = "300px"
      centerDetails.style.flexDirection = "row"
      centerDetails.style.alignItems = "center"
      centerDetails.style.width = "700px"
      centerDetails.style.bottom = "0px"
      centerDetails.style.right = "0px"
      item.className = view2;
      
    }
    else if(window.innerWidth > 800 && window.innerWidth < 1350 && !radios1.checked) {
      centerDetails.style.width = "700px"
      centerDetails.style.right = "0px"
      centerDetails.style.bottom = "20px"
      centerDetails.style.alignItems = "flex-start"
      centerDetails.style.flexDirection = "column"
      flag = true

      item.className = view2;
      item.style.height = "250px"
      courseImg.style.height = "180px"
      courseImg.style.marginTop = "30px"
    }
    else if(window.innerWidth > 0 && window.innerWidth < 1350 && !radios1.checked) {
      centerDetails.style.width = "200px"
      centerDetails.style.bottom = "25px"
      centerDetails.style.alignItems = "center"
    }
  }
};

export default changeViewCourses;
