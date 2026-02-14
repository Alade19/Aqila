"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes';
import { contactblack, contactwhite } from "../../core/lib/utils";
import GradientButton from "../../components/GradientButton";


export default function Page() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const [selectedPurpose, setSelectedPurpose] = useState('');
  const categories = [
    [1, 'General inquiry'],
    [2, 'Technical support'],
    [3, 'Billing question'],
    [4, 'Partnership opportunity'],
    [5, 'Other']
  ];

  return (
    <div className=' lg:px-6'>
      <h1 className='md:hidden text-[#001F22] dark:text-[#ffffff] font-[600] text-[24px] mt-[8px] mb-[32px]'>Contact Us</h1>
      <div className='white-container'>
        <div className='lg:px-2 py-4 lg:py-0 '>
          <div className='flex gap-1'>
            <Image src={isDark ? contactwhite : contactblack} alt="Contact Us" className='w-[14px] h-[14px] my-auto' />
            <p className='text-[#001F22] dark:text-[#ffffff] font-[600] text-[16px] h-fit my-auto'>Contact Us</p>
          </div>
          <p className='text-[#001F22] dark:text-[#ffffff] font-[400] text-[14px] lg:text-[16px] my-4 lg:my-3 lg:leading-6'>Got a question? Send it our way!  The Aqila <br className='lg:hidden' /> team <br className='hidden lg:block' />will get back to you as soon as possible.</p>
          <p className='text-[#001F22] dark:text-[#ffffff] font-[400] text-[14px] lg:text-[16px]'>We'll respond to you at: <span className='font-[600]'>johndoe@gmail.com</span></p>

          <div className='w-full flex flex-col gap-1 mt-6'> 
            <label htmlFor="message-purpose" className='text-[#303030] dark:text-[#ffffff] text-[10px] lg:text-[12px] font-[600]'>Kindly specify the purpose of your message.</label>
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
            <label htmlFor="" className='text-[#303030] dark:text-[#ffffff] text-[10px] lg:text-[12px] font-[600]'>Your message</label>
            <textarea name="" id="" placeholder='Tell us how we can help you....'
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
