import customAxios from "../services/interceptor";
let view1 ="[&>div:last-child>div:last-child>div:last-child]:mb-[10px] [&>div:last-child>div:last-child>div:first-child]:mb-[10px] w-[350px] h-[400px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex flex-col justify-end overflow-hidden";
let view2 ="w-[95%] h-[300px] shadow-[0_0_7px_#ddd] m-[25px] rounded-[25px] relative px-[15px] bg-white dark:bg-[#26324d] flex overflow-hidden [&>div:nth-child(2)>div:first-child]:h-[20%] [&>div:nth-child(2)>div:first-child]:h-[80%] [&>div:nth-child(2)>div:first-child]:w-full [&>div:nth-child(2)>div:first-child]:pt-[30px] [&>div:nth-child(2)]:h-full [&>div:nth-child(2)>div:first-child>p]:text-[28px] [&>div:nth-child(2)]:w-[60%] [&>div:nth-child(2)>div:first-child>div]:my-[40px] [&>div:first-child]:w-[31%]";

const changeViewBlog = async (parent) => {

  let result = await customAxios.get("/News?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC") 
  let children = parent.current.children;

  for (let i = 0; i < children.length; i++) {
    if (radios1.checked) {
      parent.current.children[i].lastChild.firstChild.lastChild.innerHTML = result.news[i].miniDescribe.slice(0,97) + "...";
      children[i].className = "";
      children[i].className = view1;
      children[i].style.height = "400px"
    } 
    else if (!radios1.checked) {
      parent.current.children[i].lastChild.firstChild.lastChild.innerHTML = result.news[i].miniDescribe.length >= 140 ? result.news[i].miniDescribe.slice(0) + "..." : result.news[i].miniDescribe;
      children[i].className = "";
      children[i].className = view2;
      if(window.innerWidth > 800 && window.innerWidth < 1350 && radios2.checked && location.pathname == "/blogs") {
          for (let i = 0; i < children.length; i++) {
              children[i].style.height = "250px"
              children[i].children[0].style.height = "180px"
              children[i].children[0].style.marginTop = "30px"
            }
      }
      if(window.innerWidth > 1350 && location.pathname == "/blogs") {
          for (let i = 0; i < children.length; i++) {
              children[i].style.height = "300px"
              children[i].children[0].style.height = "92%"
              children[i].children[0].style.marginTop = "10px"
          }
      }
    }
  }
};

export default changeViewBlog;
