const PasswordNeeds = ({ title , content}) => {
  return (
    <div className="flex flex-col justify-around items-center w-[120px] bg-[#eee] m-2 py-2 rounded-2xl">
        <span className="text-[25px]">{title}</span>
        <span className="text-[20px]">{content}</span>
    </div>
  )
}

export default PasswordNeeds