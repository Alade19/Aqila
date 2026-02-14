import React from 'react'

type FrontCardproptype = {
  text : string
}
 
const Frontcardcontent1 = ({text} : FrontCardproptype) => {
  return (
    <div className=' h-full'>
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <h1 className='text-[#303030] dark:text-[#ffffff] font-[500] text-[16px] lg:text-[32px] w-[90%] lg:text-center'>{text}</h1>
            
        </div>
    </div>
  )
}

export default Frontcardcontent1
