import React from 'react';

const Submit = ({content , className , onClick }) => {
  return (
    <>
        <button type='submit' onClick={onClick} className={"flex justify-center items-center bg-[#36C54E] text-white rounded-2xl text-[22px] hover:bg-[#38b24c] transition-all duration-300 " + className}>
            {content}
        </button>
    </>
  )
}

export default Submit