"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import {  useRouter } from "next/navigation";
import {
  check,
  checkdark,
  more,
  moredark,
  play,
  playdark,
  replay,
  replaydark,
} from "../core/lib/utils";
import { roundUp } from "../core/lib/helpers";
import ClickAwayListener from "react-click-away-listener";
import { useTheme } from "next-themes";
import { DeckListSkeleton } from "../core/lib/skeletons";
import { deleteDeckAction } from "@/app/core/services/actions/userActions";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";



const popUpComponent = (deckId: number, handleDelete: (id: number) => void) => {
  return (
    <div className="absolute z-[100] top-[100%] right-0 rounded-lg bg-[white] shadow-lg w-[6rem] h-[6rem] text-[#4A4A4A] text-textbase flex flex-col justify-center transition-generalTransiton">
      {popupItems.map((popupItem, index) => (
        <p
          key={index}
          onClick={() => handleDelete(deckId)}
          className={`pl-4 text-left capitalize font-medium cursor-pointer ${
            index === 0 ? "border-b border-[#D6D6D6] pb-3" : "pt-3"
          }`}>
          {popupItem}
        </p>
      ))}
    </div>
  );
};

function DecksList({ allDecks, refetch }: DeckListPropTypes) {
  const { resolvedTheme } = useTheme();
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const router = useRouter();

  

  const deleteDeckMutation = useMutation({
    mutationFn: (deckId: number) => deleteDeckAction(deckId),
    mutationKey: ["deleteDeck"],
    onSuccess: (data) => {
      console.log(data)
      toast.success(data)
      refetch()
    },
    onError: (error: Error) => {
          toast.error(error.message);
          console.error(error);
        },
        onSettled: () => {
          
        },
  });
  
  const handleDelete = (deckId: number) => {
  if (!deckId || isNaN(deckId)) {
    toast.error("Invalid deck ID");
    return;
  }

  deleteDeckMutation.mutate(deckId);
};
  return (
    <div className="">
      <div className="white-container-overflow">
        <div className="border-b-[0.5px] border-[#CCCCCC] pb-[1rem] mx-[1.5rem]">
          <p className="bg-[#F0FEFF] dark:bg-[#DEFCFF] dark:text-[#001A0B] font-medium flex justify-center items-center text-sm w-[4.0625rem] h-[1.69rem] rounded-xl ">
            Decks
          </p>
        </div>
        {allDecks && allDecks.length > 0 ? (
          <div className="flex flex-col max-h-[290px] overflow-y-auto custom-scroll px-[2rem]">
            {allDecks.map((item, index) => (
              <div
                key={item.id}
                className={`flex justify-between items-center min-h-[4.6rem] ${
                  index - 1 === list.length
                    ? "border-b-0"
                    : "border-b-[0.5px] border-[#CCCCCC]"
                }`}>
                <div className="w-[65%]">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold tex-[#001F22] dark:txt-white capitalize">
                      {item.title}
                    </p>
                    <span className="font-normal text-[#303030] dark:text-white text-xs">
                      {`${item.studied_cards} of ${item.total_cards} unique cards studied`}
                    </span>
                  </div>
                  <div className="flex gap-x-[1rem] items-center">
                    <div className="h-[5px] w-full">
                      <ProgressBar
                        progress={item.percentage_studied}
                        color="#0BB9CD"
                      />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={resolvedTheme === "dark" ? checkdark : check}
                        alt="mark-button"
                        className=""
                      />
                      <p className="text-[#303030] dark:text-[#CDCDCD] text-xs font-normal">
                        {`${roundUp(Number(item.percentage_studied)).toFixed(
                          0
                        )}`}
                        %
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  {item.studied_cards > 0 && (
                    <Image
                      // onClick={() => handleDeckActionType(item, "reset")}
                      src={resolvedTheme === "dark" ? replaydark : replay}
                      alt="reset-button"
                      className="cursor-pointer"
                    />
                  )}
                  {item.percentage_studied < 99 && (
                    <Image
                      //   onClick={() => handleDeckActionType(item, "play")}
                      onClick={
                        () => {
                          router.push(`/flashcards?deckId=${item.id}`);
                        }
                      }
                      src={resolvedTheme === "dark" ? playdark : play}
                      alt="play-button"
                      className="cursor-pointer"
                    />
                  )}
                  <div className="relative">
                    <Image
                      onClick={() =>
                        setOpenItemId(openItemId === item.id ? null : item.id)
                      }
                      src={resolvedTheme === "dark" ? moredark : more}
                      alt="ecclipse-button"
                      className="cursor-pointer"
                    />
                    {openItemId === item.id && (
                      <ClickAwayListener
                        onClickAway={() => setOpenItemId(null)}>
                        {popUpComponent(item.id, handleDelete)}
                      </ClickAwayListener>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full w-full px-[1.5rem]">
            <DeckListSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}

export default DecksList;

const list = [
  {
    id: Math.random(),
    title: "work study1",
    compt: "0 of 30 unique cards studied",
    progress: 90,
  },
  {
    id: Math.random(),
    title: "work study2",
    compt: "0 of 30 unique cards studied",
    progress: 10,
  },
  {
    id: Math.random(),
    title: "work study3",
    compt: "0 of 30 unique cards studied",
    progress: 0,
  },
  {
    id: Math.random(),
    title: "work study4",
    compt: "0 of 30 unique cards studied",
    progress: 90,
  },
  {
    id: Math.random(),
    title: "work study5",
    compt: "0 of 30 unique cards studied",
    progress: 70,
  },
  {
    id: Math.random(),
    title: "work study5",
    compt: "0 of 30 unique cards studied",
    progress: 70,
  },
];

const popupItems: string[] = ["delete"];

export type StudyDeck = {
  id: number;
  title: string;
  status: "in_progress" | "completed" | "not_started";
  percentage_studied: number;
  studied_cards: number;
  total_cards: number;
  card_remaining: number;
};

export type DeckListPropTypes = {
  allDecks: StudyDeck[];
  refetch: () => void;
};
