
import { GOLClipart } from "../../public/clipart";
import { CoinUndraw, ComplateRoutineUndraw, GOLConsole, InspirationUndraw, TrainingUndraw } from '../../public/undraw'
import GameFieldBtn from "@/components/gameFieldBtn.component";
import { Dancing_Script, Imprima } from "next/font/google";
import LpProgressionLineChart from "@/components/lp-progression-line-chart.component";

const DancingScript = Dancing_Script({ subsets: ["latin"] });
const ImprimaFont = Imprima({
  subsets: ["latin"],
  weight: "400"
})

export const dynamic = 'force-static'
export default function Home() {
  return (
    <>
    <main className='w-full min-h-lvh text-2xl'> 
      <div className='w-full h-[var(--height-lp-section)] flex flex-col justify-center relative bg-green-700' >
            <div className='w-full h-full absolute z-0 rounded-oval bg-gray-50' />
            <div className='w-1/2 h-1/2 absolute top-0  right-0  bg-gray-50' />
            <div className='w-1/2 h-1/2 absolute bottom-0 bg-gray-50' />
            <div className="p-1 z-[5] m-5 md:m-10 flex flex-col items-center md:items-start">
              <div className="flex justify-around w-full m-2">
                <GOLClipart className={"w-full md:w-1/2 " + ImprimaFont.className}/>
                <GOLConsole className="hidden md:inline w-5/12 h-auto pr-4" />
              </div>
              <GameFieldBtn/>
            </div>
      </div>
      <div className="h-[var(--height-lp-section)] flex justify-center items-center relative z-[-1] bg-gray-50">
        <div className='w-full h-full absolute z-[-1] rounded-oval bg-green-700' />
        <div className="w-1/2 h-1/2 absolute top-0 z-[-1] right-0 bg-green-700" />
        <div className="w-1/2 h-1/2 absolute bottom-0 left-0 z-[-1] bg-green-700" />
        <div className="m-5 text-gray-50 text-center ">
            <p className={`${DancingScript.className} text-4xl m-2`}>"You only live once, but if you do it right, once is enough."</p>
            <p className='text-end'>― Mae West</p>
        </div>
    </div>
    <div className="grid sm:grid-cols-2 sm:gap-5 sm:items-center sm:justify-items-center md:m-8 md:mr-16">
      <div className='flex flex-col w-full p-5 sm:col-span-2 sm:flex-row-reverse sm:items-center sm:gap-5'>
        <ComplateRoutineUndraw className='sm:flex-1 w-full h-auto mb-5 max-w-[28rem]' />
        <div className='sm:flex-1'>
            <h2 className='text-3xl font-semibold text-gray-800'>Complete your routine</h2>
            <p className='text-gray-800 text-justify'>Our website offers a unique approach to organizing daily routines, with the aim of improving your life and increasing your efficiency at work.</p>
        </div>
      </div>
      <div className="flex flex-col w-full p-5">
          <CoinUndraw className='w-full h-auto mb-5 max-w-[28rem]' />
          <div className=''>
              <h2 className='text-3xl font-semibold text-gray-800'>Earn coins</h2>
              <p className="text-gray-800 text-justify">You can input your daily tasks and earn coins for completing them. You can also skip a task using coins, which can be earned from completed routines.</p>
          </div>
      </div>
      <div className="flex flex-col w-full p-5">
          <InspirationUndraw className='w-full h-auto mb-5 max-w-[28rem] sm:mx-auto' />
          <div className=''>
              <h2 className='text-3xl font-semibold text-gray-800'>Video Games inspired</h2>
              <p className="text-gray-800 text-justify">Inspired by video games, our approach is designed to keep you motivated to complete your daily routines.</p>
          </div>
      </div>
      <div className="flex flex-col w-full  sm:col-span-2">
          <h1 className='text-5xl mb-2 p-5 font-semibold text-gray-800'>Remember</h1>
          <div className="text-gray-800 p-5 md:pr-20 sm:mr-[-4rem] sm:ml-[-2rem] bg-green-700 sm:flex sm:flex-row sm:gap-5 sm:justify-between sm:items-center ">
              <TrainingUndraw className='w-full h-auto mb-5 sm:mb-0 sm:p-16 max-w-[28rem] sm:w-1/2'/>
              <p className='text-gray-50 text-justify sm:text-end sm:w-2/6'>
                  Every completed <span className='text-yellow-300'>task</span> brings you one step closer to achieving your <span className='text-red-300'>goals</span>. Keep up the <span className='text-green-300'>good</span> work and stay <span className='text-blue-300'>motivated</span>!
              </p>
          </div>
      </div>
      <LpProgressionLineChart/>
    </div>
    </main>
    <footer className="h-80 bg-green-700">
      
    </footer>
    </>
  );
}
