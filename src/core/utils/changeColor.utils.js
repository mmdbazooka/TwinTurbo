const change = (bool,setFlag) => {
  let theme = localStorage.getItem("theme")
  setFlag(bool);

  if (bool == true) {
    btn2.style.background = "transparent";
    if(theme == "light")  btn1.style.background = "#f1ebf8";
    else btn1.style.background = "#3c4e78";
  } else if (bool == false) {
    btn1.style.background = "transparent";
    if(theme == "light")  btn2.style.background = "#f1ebf8";
    else btn2.style.background = "#3c4e78"; 
  }
};
export default change