
import { GOLClipart } from "../../public/clipart";
import GameFieldBtn from "@/components/gameFieldBtn.component";

export default function Home() {
  return (
    <main className='w-full min-h-lvh'> 
      <div className='w-full h-[var(--height-lp-section)] flex flex-col justify-center relative bg-green-700' >
            <div className='w-full h-full absolute  rounded-oval bg-gray-100' />
            <div className='w-1/2 h-1/2 absolute top-0 right-0  bg-gray-100' />
            <div className='w-1/2 h-1/2 absolute bottom-0 bg-gray-100' />
            <div className="p-5 h-min z-10">
              <GOLClipart className="m-5"/>
              <GameFieldBtn/>
            </div>
        </div>
    </main>
  );
}
