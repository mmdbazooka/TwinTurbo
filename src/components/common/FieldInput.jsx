import {Field,ErrorMessage} from 'formik'
import showPassword from '../../core/utils/showPassword.utils'

const FieldInput = ({as,type,content,name,placeholder,border,display,className,dir,showPasswordCheck}) => {
  return (
    <>
        <div dir={dir} className={"dark:bg-[#26324D] relative w-[85%] flex justify-between items-center rounded-lg pr-[15px] overflow-hidden " + border }>

          <Field name={name} as={as} type={type} className={"dark:bg-transparent dark:placeholder:text-white dark:text-white text-[18px] w-full placeholder:text-[#5a0ba951] text-[#5A0BA9]  border-[#70707024] outline-none rounded-lg h-12 pl-5 focus:border-[#5A0BA9] transition-all duration-300 " + className } placeholder={placeholder} />
          <img src="../../src/assets/images/panel/view.svg" className={showPasswordCheck == true ? "w-7 ml-3 cursor-pointer" : "hidden"} onClick={(e)=> showPassword(e)} />
          <div className={"text-[#67008F] transiition-all duration-[.5s] whitespace-nowrap dark:text-white " + display }> {content} </div>
        
        </div>
        <div className="self-end mr-14 h-7">
          <ErrorMessage component="div" name={name} className='text-[#B00020] ErrorMessage dark:text-[#ff3c60]' />
        </div>
    </>

  )
}

export default FieldInput