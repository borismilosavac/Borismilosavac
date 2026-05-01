export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#d9d9d9] h-[32px] left-0 rounded-br-[1000px] rounded-tr-[1000px] top-0 w-[64px]" />
      <div className="absolute flex h-[72px] items-center justify-center left-[72px] top-0 w-[32px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="bg-[#d9d9d9] h-[32px] rounded-br-[1000px] rounded-tr-[1000px] w-[72px]" />
        </div>
      </div>
      <div className="absolute bg-[#d9d9d9] h-[32px] left-0 rounded-br-[1000px] rounded-tr-[1000px] top-[40px] w-[64px]" />
      <div className="absolute flex h-[72px] items-center justify-center left-[112px] top-0 w-[32px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="bg-[#d9d9d9] h-[32px] rounded-br-[1000px] rounded-tr-[1000px] w-[72px]" />
        </div>
      </div>
    </div>
  );
}