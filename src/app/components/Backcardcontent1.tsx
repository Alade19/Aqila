import React from 'react';
import SlideButtons from './SlideButtons';
import { useModal } from "../core/contexts/ModalContext";

type BackCardproptype = {
  text : string
  setFlipped : (val: boolean) => void
  index: number
  next: () => void
  sildercontents: { id: number; question: string; answer: string; }[]
}

const Backcardcontent1 = ({ setFlipped, text, index, next, sildercontents }: BackCardproptype) => {
  const { openSuccessModal } = useModal();


  return (
    <div className="h-full">
      <div className="h-full w-full flex flex-col items-center justify-center gap-y-4 md:gap-y-8 lg:gap-y-7">
        <p className="text-[#303030] w-[90%] lg:text-center  dark:text-[#ffffff] text-[16px] lg:text-[24px] font-[400]">
          {text}
        </p>
        
        <div className="flex flex-col md:flex-row gap-y-[12px] md:gap-x-12 lg:gap-y-0 lg:gap-x-[48px] ">
          <div onClick={() => setFlipped(false)} className="w-[251px] h-[38px] md:w-[130px]  lg:w-[211px] lg:h-[47px]">
            <SlideButtons
              text="Try again"
              bordercolor="red"
              textcolor="red"
              icon="cancel"
              
            />
          </div>
          <div  
          onClick={() => {
            if (index === sildercontents.length - 1) openSuccessModal();
            else{
              next()
            }
            
          }}
            className="w-[251px] h-[38px] md:w-[130px] lg:w-[211px] lg:h-[47px]">
            <SlideButtons
              text="I knew it"
              bordercolor="green"
              textcolor="green"
              icon="check"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backcardcontent1;
