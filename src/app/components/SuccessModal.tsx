"use client";
import { useModal } from '../core/contexts/ModalContext';
import { useEffect, useState } from 'react';
import Button from './Button';
import GradientButton from './GradientButton';
import CircleProgress from './CircleProgress'; // 👈 make sure it's imported

export default function SuccessModal() {
  const { isSuccessModalOpen, closeSuccessModal } = useModal();
  const [localVisible, setLocalVisible] = useState(false); // 👈 new

  useEffect(() => {
    if (isSuccessModalOpen) {
      // Delay a little to ensure modal fully mounts before animating
      setTimeout(() => setLocalVisible(true), 5);
    } else {
      setLocalVisible(false);
    }
  }, [isSuccessModalOpen]);

  const clearmodal = () => {
    closeSuccessModal();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeSuccessModal();
    }
  };

  if (!isSuccessModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 dark:bg-black/60 flex items-center justify-center"
      onClick={handleBackdropClick}>
      <div
        className="w-[327px] h-[316px] lg:w-[496px] lg:h-[474px] flex flex-col justify-center items-center bg-white dark:bg-[#1E1E1E] dark:border-[1px] dark:border-[#FFFFFF]/50 rounded-[24px] p-4 lg:p-6 cursor-default"
        onClick={(e) => e.stopPropagation()}>
        
        <div className='w-[98px] h-[98px] lg:w-[151px] lg:h-[151px]'>
          <CircleProgress percentage={78} isVisible={localVisible} />
        </div>

        <h1 className='text-[#001F22] dark:text-[#0BB9CD] text-[16px] w-[214px] mt-[26px] lg:text-[20.25px] lg:w-[215px] lg:mt-[37px] text-center font-[600]'>
          You killed it scholar 🎉
        </h1>
        <p className='text-[#303030] dark:text-[#ffffff] text-[12px] w-[214px] lg:text-[16px] lg:w-[355px] mt-[16px] font-[400] leading-4 lg:leading-6 text-center'>
          You have successfully learned this material. To reinforce your knowledge, you can review your flashcards again
        </p>

        <div className='flex mt-[32px] gap-x-[91px] lg:gap-x-[105px] lg:mt-[49px]'>
          <div onClick={clearmodal} className='w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]'>
            <Button text={"Back"} bg={"graybtn"} />
          </div>
          <div className='w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]'>
            <GradientButton text={"Review cards"} />
          </div>
        </div>
      </div>
    </div>
  );
}
