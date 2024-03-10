const LoadingSkeleton = () => {
  return Array(5)
    .fill("")
    .map((_, index) => {
      return (
        <label
          key={index + 1}
          className={`flex items-center p-2 border-b gap-2  border-slate-400 cursor-pointer hover:bg-slate-100 transition-colors has-[input:focus]:bg-slate-100`}
        >
          <input type="checkbox" className=" accent-blue-600 size-4" />
          <div className="size-10 bg-slate-200 animate-pulse rounded-xl" />
          <div className="flex flex-col items-start flex-1 gap-1">
            <div className="w-1/2 h-4 bg-slate-200 animate-pulse" />
            <div className="w-10 h-2 bg-slate-200 animate-pulse" />
          </div>
        </label>
      );
    });
};

export default LoadingSkeleton;
