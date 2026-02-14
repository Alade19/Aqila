"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import ClickAwayListener from "react-click-away-listener";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import FlashCardModal from "../components/FlashCardModal";
import SuccessModal from "../components/SuccessModal";
import { ModalProvider } from "../core/contexts/ModalContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const getSidebarToggleState = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  return (
    <ModalProvider>
      <div className="layout w-full mx-auto relative">
        <ClickAwayListener onClickAway={() => setIsSideBarVisible(false)}>
          <div
            className={`dark:border-r dark:border-r-[rgba(255,255,255,0.3)] sidebar ${
              isSideBarVisible ? "show" : "hide"
            }`}
          >
            <SideBar getSidebarToggleState={getSidebarToggleState} />
          </div>
        </ClickAwayListener>

        <div className="dark:border-b dark:border-l dark:border-[rgba(255,255,255,0.3)] navbar ml-0.5">
          <NavBar
            isSideBarVisible={isSideBarVisible}
            getSidebarToggleState={getSidebarToggleState}
          />
        </div>

        <main className="main bg-[#EEEEEE] dark:bg-black">{children}</main>

        {/* Global FlashCard Modal */}
        <FlashCardModal />
        <SuccessModal />
      </div>
    </ModalProvider>
  );
}