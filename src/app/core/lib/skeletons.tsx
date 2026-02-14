import Skeleton from "react-loading-skeleton";

export const ProgressSkeleteon = () => {
  const skeletons = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className="w-[100%] h-[.5rem] my-[1.5rem] bg-[#eeeeee] rounded-2xl animate-pulse">
      <Skeleton inline height={"100%"} width={"100%"} />
    </div>
  ));
  return <>{skeletons}</>;
};

export const ProgressDeckSkeleteon = () => {
  const skeletons = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className="w-[100%] h-[7.5rem] bg-[#ffffff] rounded-2xl animate-pulse not-first:mt-[0.8rem]">
      <Skeleton inline height={"100%"} width={"100%"} />
    </div>
  ));
  return <>{skeletons}</>;
};


export const DeckListSkeleton = () => {
  const skeletons = Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className="w-full flex flex-col justify-center gap-y-4 h-[4.6rem] border-b border-[#CCCCCC] last:border-none">
      <div className="h-[0.5rem] w-[55%] bg-[#eeeeee] rounded-2xl animate-pulse">
        <Skeleton height="100%" width="100%" />
      </div>
      <div className="h-[0.5rem] w-[90%] bg-[#eeeeee] rounded-2xl animate-pulse">
        <Skeleton height="100%" width="90%" />
      </div>
    </div>
  ));

  return <>{skeletons}</>;
};



