import FieldInput from '../common/FieldInput'

const EditProfileItem = ({name,placeholder,border,display,className,dir,content,type}) => {
  return (
        <div className='h-[100px]'>
            <div>{content}</div>
            <FieldInput name={name} type={type} placeholder={placeholder} border={border} display={display} className={className} dir={dir} />
        </div>
  )
}

export default EditProfileItem