function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[64px] top-0">
      <div className="flex h-[72px] items-center justify-center relative shrink-0 w-[36px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="bg-[#d9d9d9] h-[36px] rounded-br-[64px] rounded-tr-[64px] w-[72px]" />
        </div>
      </div>
      <div className="flex h-[72px] items-center justify-center relative shrink-0 w-[36px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="bg-[#d9d9d9] h-[36px] rounded-br-[64px] rounded-tr-[64px] w-[72px]" />
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#d9d9d9] h-[32px] left-0 rounded-br-[64px] rounded-tr-[64px] top-0 w-[56px]" />
      <div className="absolute bg-[#d9d9d9] h-[32px] left-0 rounded-br-[64px] rounded-tr-[64px] top-[40px] w-[56px]" />
      <Frame1 />
    </div>
  );
}