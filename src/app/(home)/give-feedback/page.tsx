"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes';
import { contactusiconblack, contactusiconwhite } from "../../core/lib/utils";
import GradientButton from "../../components/GradientButton";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";


export default function Page() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [onestar, setonestar] = useState(false);
  const [twostar, settwostar] = useState(false);
  const [threestar, setthreestar] = useState(false);
  const [fourstar, setfourstar] = useState(false);
  const [fivestar, setfivestar] = useState(false);

  const categories = [
    [1, 'General feedback'],
    [2, 'Bug report'],
    [3, 'Features request'],
    [4, 'Performance Issues'],
    [5, 'UI/UX Suggestions'],
    [6, 'Other']
  ];

  return (
    <div className=' lg:px-6'>
      <h1 className='md:hidden text-[#001F22] dark:text-[#ffffff] font-[600] text-[24px] mt-[8px] mb-[32px]'>Feedbacks</h1>
      <div className='white-container'>
        <div className='lg:px-2 py-4 lg:py-0 '>
          <div className='flex gap-1'>
            <Image src={isDark ? contactusiconwhite : contactusiconblack} alt="Contact Us" className='w-[14px] h-[14px] my-auto' />
            <p className='text-[#001F22] dark:text-[#ffffff] font-[600] text-[16px] h-fit my-auto'>Feedbacks</p>
          </div>
          <p className='text-[#001F22] dark:text-[#ffffff] font-[400] text-[14px] lg:text-[16px] my-4 lg:my-3 lg:leading-6'>Your feedback helps us build a smarter, more <br />supportive Aqila for students like you</p>
          <p className='text-[#001F22] dark:text-[#ffffff] font-[700] text-[14px] lg:text-[16px]'>How would you rate your experience?</p>
          <div className='flex gap-[4px] mt-1'>
            { onestar ? <FaStar onClick={() => setonestar(false)} className='text-yellow-500 dark:text-yellow-500 text-[24px] cursor-pointer' /> : <FaRegStar onClick={() => setonestar(true)} className='text-[#858585] dark:text-[#ffffff] text-[24px] cursor-pointer' /> }
            { twostar ? <FaStar onClick={() => settwostar(false)} className='text-yellow-500 dark:text-yellow-500 text-[24px] cursor-pointer' /> : <FaRegStar onClick={() => settwostar(true)} className='text-[#858585] dark:text-[#ffffff] text-[24px] cursor-pointer' /> }
            { threestar ? <FaStar onClick={() => setthreestar(false)} className='text-yellow-500 dark:text-yellow-500 text-[24px] cursor-pointer' /> : <FaRegStar onClick={() => setthreestar(true)} className='text-[#858585] dark:text-[#ffffff] text-[24px] cursor-pointer' /> }
            { fourstar ? <FaStar onClick={() => setfourstar(false)} className='text-yellow-500 dark:text-yellow-500 text-[24px] cursor-pointer' /> : <FaRegStar onClick={() => setfourstar(true)} className='text-[#858585] dark:text-[#ffffff] text-[24px] cursor-pointer' /> }
            { fivestar ? <FaStar onClick={() => setfivestar(false)} className='text-yellow-500 dark:text-yellow-500 text-[24px] cursor-pointer' /> : <FaRegStar onClick={() => setfivestar(true)} className='text-[#858585] dark:text-[#ffffff] text-[24px] cursor-pointer' /> }
          </div>
          <div className='w-full flex flex-col gap-1 mt-6'> 
            <label htmlFor="message-purpose" className='text-[#303030] dark:text-[#ffffff] text-[10px] lg:text-[12px] font-[600]'>Please select the category of your feedback</label>
            <select id="message-purpose"
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)} 
              className='border-[0.5px] border-[#CCCCCC] dark:border-[#FFFFFF]/50 bg-white dark:bg-[#1E1E1E] w-full h-[35px] lg:h-[42px] rounded-[4px] lg:rounded-[8px] px-2 dark:text-[#ffffff] text-[#303030] text-[10px] lg:text-[12px] font-[400]'>
                <option value="">Select category</option>
                {categories.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
                
            </select>
          </div>

          <div className='w-full flex flex-col gap-1 mt-6 lg:mt-4'> 
            <label htmlFor="" className='text-[#303030] dark:text-[#ffffff] text-[10px] lg:text-[12px] font-[600]'>Your feedback</label>
            <textarea name="" id="" placeholder='Tell us how what you think....'
            className='border-[0.5px] border-[#CCCCCC] dark:border-[#FFFFFF]/50 bg-white dark:bg-[#1E1E1E] w-full h-[160px] lg:h-[231px] rounded-[4px] lg:rounded-[8px] p-3
            text-[#303030] dark:text-[#ffffff] text-[10px] lg:text-[12px] font-[400] placeholder:text-[#303030] dark:placeholder:text-[#ffffff] placeholder:text-[10px] lg:placeholder:text-[12px] placeholder:font-[400]'>
            </textarea>
          </div>

          <div className='w-full mt-8 lg:mt-6  flex place-content-end'>
            <div className="w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]">
              <GradientButton text={"Send message"} type="button" />
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
