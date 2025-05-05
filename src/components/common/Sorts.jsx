import { settingSort } from "../map/BlogsMap";


const Sorts = ({id,htmlFor,text,defaultChecked,type}) => {
  const caller = (e) => {
      if(location.pathname.indexOf("/courses") !== -1) Rows(e.target.value)
      else if(location.pathname.indexOf("/blogs") !== -1) settingSort(type)
  }
  
  return (
    <>
        <input type="radio" name="radio" id={id} defaultChecked={defaultChecked} />
        <label htmlFor={htmlFor} data-type={type} onClick={(e)=> caller(e)} >{text}</label>
    </>
  )
}

export default Sorts