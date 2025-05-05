import { NavLink } from 'react-router-dom'
import raiseUp from '../../core/utils/raiseUp.utils'

const Linkes = ({src,to,content,acceptedClassName,ejectedClassName,imgClassName,acceptedStyle,ejectedStyle}) => {
  return (
    <NavLink to={to} className={({isActive})=> (isActive? acceptedClassName : ejectedClassName)} style={({isActive})=>({borderBottom : isActive ? acceptedStyle : ejectedStyle})} onClick={()=> raiseUp(undefined,"",false)} >

        <img src={"../src/assets/images/" + src } alt="" className={"ml-[15px] " + imgClassName} />
        {content}
    
    </NavLink>
  )
}

export default Linkes