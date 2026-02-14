import { SideBarPropsType } from "../types/global";
import { DASHBOARD, FLASHCARD, SUMMARY } from "./routes";

// LANDING PAGE
export { default as navbarlogo } from "../../../../public/assets/navbarlogo.svg";
export { default as footerlogo } from "../../../../public/assets/footerlogo.svg";
export { default as usecaseimg1 } from "../../../../public/assets/usecaseimg1.svg";
export { default as summary1 } from "../../../../public/assets/summary1.svg";
export { default as summary2 } from "../../../../public/assets/summary2.svg";
export { default as flashcard1 } from "../../../../public/assets/flashcard1.svg";
export { default as flashcard2 } from "../../../../public/assets/flashcard2.svg";
export { default as flashcard3 } from "../../../../public/assets/flashcard3.svg";
export { default as flashcard4 } from "../../../../public/assets/flashcard4.svg";
export { default as autosummimg1 } from "../../../../public/assets/autosummimg1.svg";
export { default as autoflashimg1 } from "../../../../public/assets/autoflashimg1.svg";
export { default as navbarimg1 } from "../../../../public/assets/navbarimg1.svg";
export { default as navbarimg2 } from "../../../../public/assets/navbarimg2.svg";
export { default as studymanimg } from "../../../../public/assets/studymanimg.svg";
export { default as studylaptop } from "../../../../public/assets/studylaptop.svg";
export { default as studyphone } from "../../../../public/assets/studyphone1.png";

// LOGOS
export { default as logowhite } from "../../../../public/assets/aqila-logowhite.svg";
export { default as logoblue } from "../../../../public/assets/aqila-logoblue.svg";

//NAV-ICONS
export { default as orbit } from "../../../../public/assets/knowledge-img.svg";
export { default as google } from "../../../../public/assets/google-icon.svg";
export { default as sun } from "../../../../public/assets/lighticon.svg";
export { default as openpassword } from "../../../../public/assets/passwordopen.svg";
export { default as closepassword } from "../../../../public/assets/passclose.svg";
export { default as checkmail } from "../../../../public/assets/checkmail.svg";
export { default as reset } from "../../../../public/assets/reset.svg";
export { default as moon } from "../../../../public/assets/darkicon.svg";
export { default as bell } from "../../../../public/assets/bell.svg";
export { default as belllight } from "../../../../public/assets/belllight.svg";
export { default as search } from "../../../../public/assets/Search.svg";
export { default as avatar } from "../../../../public/assets/avatar.svg";
export { default as pro } from "../../../../public/assets/pro.svg";
export { default as settingsdark } from "../../../../public/assets/settingsdark.svg";
export { default as settingslight } from "../../../../public/assets/settingslight.svg";
export { default as contactwhite } from "../../../../public/assets/contactwhite.svg";
export { default as contactblack } from "../../../../public/assets/contactblack.svg";
export { default as feedbackwhite } from "../../../../public/assets/feedbackwhite.svg";
export { default as feedbackblack } from "../../../../public/assets/feedbackblack.svg";
export { default as logoutlight } from "../../../../public/assets/logoutlight.svg";
export { default as logoutdark } from "../../../../public/assets/logoudark.svg";
//sidebar icons
export { default as fly } from "../../../../public/assets/fly.svg";
export { default as miniorbit } from "../../../../public/assets/minorbit.svg";
export { default as booklight } from "../../../../public/assets/booklight.svg";
export { default as more } from "../../../../public/assets/more.svg";
export { default as moredark } from "../../../../public/assets/checkdarkmode.svg";
export { default as replay } from "../../../../public/assets/replay.svg";
export { default as replaydark } from "../../../../public/assets/replaydarkmode.svg";
export { default as play } from "../../../../public/assets/play.svg";
export { default as playdark } from "../../../../public/assets/playdarkmode.svg";
export { default as check } from "../../../../public/assets/flashcardcheck.svg";
export { default as checkdark } from "../../../../public/assets/playflascarddarkmode.svg";
export { default as streakfire } from "../../../../public/assets/firestreak.svg";
export { default as studytime } from "../../../../public/assets/studytime.svg";
export { default as summarystreak } from "../../../../public/assets/summaryprogress.svg";
export { default as userprileav } from "../../../../public/assets/userprileav.svg";
export { default as deleteicon } from "../../../../public/assets/delete.svg";
export { default as warning } from "../../../../public/assets/warning.svg";

// summary icons
export { default as uploadicon} from "../../../../public/assets/uploadfileicon.svg";
export { default as pasteicon} from "../../../../public/assets/pasteicon.svg";
export { default as copyicon} from "../../../../public/assets/copyicon.svg";
export { default as uploadiconblue } from "../../../../public/assets/uploadiconblue.svg";

// flashcard modal icons
export { default as closemodalblack } from "../../../../public/assets/closemodalblack.svg";
export { default as closemodalwhite } from "../../../../public/assets/closemodalwhite.svg";
export { default as flashuploadblack } from "../../../../public/assets/flashuploadblack.svg";
export { default as flashpasteblack } from "../../../../public/assets/flashpasteblack.svg";

// contact us icons
export { default as contactusiconwhite } from "../../../../public/assets/contactusiconwhite.svg";
export { default as contactusiconblack } from "../../../../public/assets/contactusiconblack.svg";

import dashboardlight from "../../../../public/assets/dashboardlight.svg";
import dashboarddark from "../../../../public/assets/dashboarddark.svg";
import cardlight from "../../../../public/assets/cardlight.svg";
import carddark from "../../../../public/assets/carddark.svg";
import summarylight from "../../../../public/assets/summarylight.svg";
import summarydark from "../../../../public/assets/summarydark.svg";
import createsumlight from "../../../../public/assets/createsum.svg";
import creatsummdark from "../../../../public/assets/summblue.svg";
import flashcarddark from "../../../../public/assets/flashcardblue.svg";
import flashcardlight from "../../../../public/assets/genflash.svg";

export const sideBarRoutes: SideBarPropsType[] = [
  {
    label: "Dashboard",
    lighticon: dashboardlight,
    darkicon: dashboarddark,
    link: DASHBOARD,
  },
  {
    label: "Create Flashcard",
    lighticon: cardlight,
    darkicon: carddark,
    link: FLASHCARD,
  },
  {
    label: "Summary",
    lighticon: summarylight,
    darkicon: summarydark,
    link: SUMMARY,
  },
];

export const dashboardFeatures = [
  {
    lighticon: flashcardlight,
    darkicon: flashcarddark,
    link: FLASHCARD,
    header: "Generate Flashcards",
    text: "Turn your notes into bite-sized cards instantly",
    id: 1,
  },
  {
    lighticon: createsumlight,
    darkicon: creatsummdark,
    link: SUMMARY,
    header: "Create Summary",
    text: "Instant summaries from PDFs, articles & notes",
    id: 2,
  },
];
