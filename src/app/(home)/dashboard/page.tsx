"use client";
import Image from "next/image";
import {
  fly,
  booklight,
  miniorbit,
  dashboardFeatures,
  streakfire,
  studytime,
  summarystreak,
  search,
} from "@/app/core/lib/utils";
import React from "react";
import { useTheme } from "next-themes";
import DecksList, {
  StudyDeck,
} from "@/app/components/DecksList";
import CircularProgress from "@/app/components/CircularProgress";
import {
  getAlDeckActions,
  getProgressActions,
  getDeckInprogressActions,
} from "@/app/core/services/actions/userActions";
import { useQuery } from "@tanstack/react-query";
import {
  ProgressDeckSkeleteon,
  ProgressSkeleteon,
} from "@/app/core/lib/skeletons";
import { getUserData } from "@/app/core/services/storage/cookie";
import { capitalize } from "@/app/core/lib/helpers";
import { useModal } from "@/app/core/contexts/ModalContext";
import {  useRouter } from "next/navigation";
function Dashboard() {
  const { openFlashcard } = useModal();
  // const pathname = usePathname();
  const router = useRouter();

  const {
    // error: deckError,
    data: allDecks = [],
    refetch,
  } = useQuery({
    queryKey: ["all-decks"],
    queryFn: getAlDeckActions,
  }); 
  console.log(allDecks, "getAlDeckActions");
  const userData = getUserData();

  const {
    // error: deckinProgressError,
    data: deckInProg = [] } = useQuery({
    queryKey: ["in-progress"],
    queryFn: getDeckInprogressActions,
  });
  console.log(deckInProg, "deckData");

  const {
    // error: progressError,
    data: progressData } = useQuery({
    queryKey: ["progressData"],
    queryFn: getProgressActions,
  });
  console.log(progressData, "progressData");

  const handleTabClick = (
      e: React.MouseEvent<HTMLDivElement>,
      text: string,
      header: string,
      id: number
    ) => {
      e.preventDefault();

      if (id === 1) {
        
        openFlashcard();
      } else {
        return router.push("/summary");
      }
     
    };
  
  const { resolvedTheme } = useTheme();
  return (
    <main className="flex flex-col lg:flex-row items-start justify-center gap-x-[2rem] ">
      <div className="flex lg:hidden border border-[#CCCCCC] bg-[white] dark:bg-[#1E1E1E] rounded-[12px] h-[48px] w-full mb-[2rem]">
        <Image src={search} alt="avatar" className="ml-4" />
        <input
          type="text"
          placeholder="Search decks..."
          className="w-full placeholder:text-[#858585] dark:placeholder:text-[#CDCDCD]"
        />
      </div>
      <div className="w-full lg:w-[75%] flex flex-col gap-y-[2rem]">
        <div className="relative bg-brand-gradient rounded-2xl w-full h-[7.2rem] md:h-[10.25rem] py-[1.5rem] pl-[1.5rem] md:pl-[2rem] lg:pl-[3rem]">
          <h1 className="text-white font-medium  text-base md:text-[1.3125rem] lg:text-[1.5rem] xl:text-[2.15rem]">
            Welcome back,{" "}
            {userData?.first_name ? capitalize(userData.first_name) : "User"}
            👋
          </h1>
          <div className="font-light text-[0.65rem] md:text-[0.75rem] lg:text-[0.8rem] text-white mt-1 lg:mt-2">
            First time here? Let’s set you up for success{" "}
            <br className="xl:hidden" /> —explore{" "}
            <br className="hidden xl:flex" />
            flashcards, summaries, and <br className="xl:hidden" /> more!
          </div>
          <Image
            src={fly}
            alt="fly-icon"
            className="absolute -top-0.5 left-0.5 "
          />
          <Image
            src={miniorbit}
            alt="miniorbit-icon"
            className="absolute top-19.5 right-32 md:top-24 md:right-44 xl:top-23 lg:right-63 w-[2rem] lg:w-[3rem]"
          />
          <Image
            src={booklight}
            alt="booklight-icon"
            className="w-[25%] md:w-[30%] xl:w-fit absolute bottom-0 right-[5%]"
          />
        </div>

        <div className="flex items-center gap-x-3 md:gap-x-[1.5rem] w-full h-fit md:h-[10.25rem]">
          {dashboardFeatures.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleTabClick(e, item.header, item.text, item.id)}
              className="white-container  dark:hover:bg-red-600 flex flex-col items-start w-1/2 h-full cursor-pointer">
              <div className="bg-[#F0FEFFEE] dark:bg-transparent dark:border dark:border-[#FFFFFF80] rounded-sm w-[1.5rem] h-[1.5rem] md:w-[2.5rem] md:h-[2.5rem] flex justify-center items-center">
                <Image
                  src={
                    resolvedTheme === "dark" ? item.darkicon : item.lighticon
                  }
                  alt="booklight-icon"
                  className="w-[1rem] h-[1rem]"
                />
              </div>
              <h1 className="text-xs md:text-base font-semibold mt-[0.8rem] dark:text-[#0BB9CD]">
                {item.header}
              </h1>
              <p className="text-[0.5rem] md:text-xs text-[#303030] dark:text-[#CDCDCD] mt-1 w-[80%] md:w-[85%] lg:w-[65%]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full hidden">
          {deckInProg && deckInProg?.length > 0 ? (
            <>
              {deckInProg.map((item: StudyDeck) => (
                <div key={item.id} className="white-container-small">
                  <div className="flex items-center">
                    <div className="w-[70%] flex flex-col gap-y-1 items-start border-r-[0.5px] border-[#CCCCCC]">
                      <p className="font-medium text-sm mb-[.5rem]">
                        {item.title}
                      </p>
                      <div className="w-full flex justify-between items-center pr-2">
                        <p className="font-semibold text-[10px]">Total cards</p>
                        <span className="font-semibold text-xs">
                          {item.total_cards}
                        </span>
                      </div>
                      <div className="w-full flex justify-between items-center pr-2">
                        <p className="font-semibold text-[10px]">
                          Cards Studied
                        </p>
                        <span className="font-semibold text-xs">
                          {item.studied_cards}
                        </span>
                      </div>
                      <div className="w-full flex justify-between items-center pr-2">
                        <p className="font-semibold text-[10px]">
                          Cards Remaining
                        </p>
                        <span className="font-semibold text-xs">
                          {item.card_remaining}
                        </span>
                      </div>
                    </div>
                    <div className="w-[35%] flex justify-center items-center">
                      <CircularProgress value={item.percentage_studied} />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full h-full">
              <ProgressDeckSkeleteon />
            </div>
          )}
        </div>

          {/* here is where to paste  */}
          <div className="lg:hidden">
            

            <div className="w-[100%] mt-6 lg:mt-0 lg:w-[25%] lg:h-[13rem] flex flex-col gap-y-[2rem]">
              <div className="white-container">
                <p className="font-semibold text-base mb-[1.2rem]">Your Progress</p>
                {progressData && progressData?.progress ? (
                  <div className="flex flex-col gap-y-[1.2rem]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-2">
                        <Image
                          src={streakfire}
                          alt="streakfire-icon"
                          className="w-4.5"
                        />
                        <p className="font-semibold text-xs">Study Streaks</p>
                      </div>
                      <span className="font-semibold text-base">
                        {progressData?.progress?.study_streaks}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-2">
                        <Image
                          src={studytime}
                          alt="streakfire-icon"
                          className="w-4.5"
                        />
                        <p className="font-semibold text-xs">Study Time</p>
                      </div>
                      <span className="font-semibold text-base">
                        {progressData?.progress?.study_time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-2">
                        <Image
                          src={summarystreak}
                          alt="streakfire-icon"
                          className="w-4.5"
                        />
                        <p className="font-semibold text-xs">Card Studied</p>
                      </div>
                      <span className="font-semibold text-base">
                        {progressData?.progress?.card_studied}
                      </span>
                    </div>
                  </div>
                ) : (
                  <ProgressSkeleteon />
                )}
              </div>

              <div className="">
                <p className="font-semibold text-base mb-[0.5rem]">
                  Continue Studying
                </p>

                <div className="flex flex-col gap-y-[0.9rem]  h-[7.6rem] pr-3 overflow-y-auto scrollbar-custom">
                  {deckInProg && deckInProg?.length > 0 ? (
                    <>
                      {deckInProg.map((item: StudyDeck) => (
                        <div key={item.id} className="white-container-small">
                          
                          <div className="flex items-center">
                            <div className="w-[70%] flex flex-col gap-y-1 items-start border-r-[0.5px] border-[#CCCCCC]">
                              <p className="font-medium text-sm mb-[.5rem]">
                                {item.title}
                              </p>
                              <div className="w-full flex justify-between items-center pr-2">
                                <p className="font-semibold text-[10px]">
                                  Total cards
                                </p>
                                <span className="font-semibold text-xs">
                                  {item.total_cards}
                                </span>
                              </div>
                              <div className="w-full flex justify-between items-center pr-2">
                                <p className="font-semibold text-[10px]">
                                  Cards Studied
                                </p>
                                <span className="font-semibold text-xs">
                                  {item.studied_cards}
                                </span>
                              </div>
                              <div className="w-full flex justify-between items-center pr-2">
                                <p className="font-semibold text-[10px]">
                                  Cards Remaining
                                </p>
                                <span className="font-semibold text-xs">
                                  {item.card_remaining}
                                </span>
                              </div>
                            </div>
                            <div className="w-[35%] flex justify-center items-center">
                              <CircularProgress value={item.percentage_studied} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="w-full h-full">
                      <ProgressDeckSkeleteon />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* end */}
          
        <div>
          <p className="font-semibold text-base mb-[1rem]">My decks</p>
          <>
            {allDecks ? (
              <DecksList refetch={refetch} allDecks={allDecks} />
            ) : (
              ""
            )}
          </>
        </div>
      </div>

      <div className="w-[100%] mt-6 lg:mt-0 lg:w-[25%] lg:h-[13rem] flex flex-col gap-y-[2rem] hidden lg:block">
        <div className="white-container">
          <p className="font-semibold text-base mb-[1.2rem]">Your Progress</p>
          {progressData && progressData?.progress ? (
            <div className="flex flex-col gap-y-[1.2rem]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={streakfire}
                    alt="streakfire-icon"
                    className="w-4.5"
                  />
                  <p className="font-semibold text-xs">Study Streaks</p>
                </div>
                <span className="font-semibold text-base">
                  {progressData?.progress?.study_streaks}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={studytime}
                    alt="streakfire-icon"
                    className="w-4.5"
                  />
                  <p className="font-semibold text-xs">Study Time</p>
                </div>
                <span className="font-semibold text-base">
                  {progressData?.progress?.study_time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={summarystreak}
                    alt="streakfire-icon"
                    className="w-4.5"
                  />
                  <p className="font-semibold text-xs">Card Studied</p>
                </div>
                <span className="font-semibold text-base">
                  {progressData?.progress?.card_studied}
                </span>
              </div>
            </div>
          ) : (
            <ProgressSkeleteon />
          )}
        </div>

        <div className="hidden lg:block mt-6">
          <p className="font-semibold text-base mb-[0.5rem]">
            Continue Studying
          </p>

          <div className="flex flex-col gap-y-[0.9rem]">
            {deckInProg && deckInProg?.length > 0 ? (
              <>
                {deckInProg.map((item: StudyDeck) => (
                  <div key={item.id} className="white-container-small">
                    <div className="flex items-center">
                      <div className="w-[70%] flex flex-col gap-y-1 items-start border-r-[0.5px] border-[#CCCCCC]">
                        <p className="font-medium text-sm mb-[.5rem]">
                          {item.title}
                        </p>
                        <div className="w-full flex justify-between items-center pr-2">
                          <p className="font-semibold text-[10px]">
                            Total cards
                          </p>
                          <span className="font-semibold text-xs">
                            {item.total_cards}
                          </span>
                        </div>
                        <div className="w-full flex justify-between items-center pr-2">
                          <p className="font-semibold text-[10px]">
                            Cards Studied
                          </p>
                          <span className="font-semibold text-xs">
                            {item.studied_cards}
                          </span>
                        </div>
                        <div className="w-full flex justify-between items-center pr-2">
                          <p className="font-semibold text-[10px]">
                            Cards Remaining
                          </p>
                          <span className="font-semibold text-xs">
                            {item.card_remaining}
                          </span>
                        </div>
                      </div>
                      <div className="w-[35%] flex justify-center items-center">
                        <CircularProgress value={item.percentage_studied} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full h-full">
                <ProgressDeckSkeleteon />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
