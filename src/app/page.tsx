
import Mics from '@/components/module/Chat_Application/Mics';
import '@/styles/globals.css';

export default function Home() {
  // return (
  //   <div>
  //     {/* <Chat_Application/> */}
  //      <Mics/>
  //   </div>
  // );
  return (
    <main className="p-6">
      <h1 className="text-white text-2xl mb-4">Audio Reactive Particles</h1>
      <Mics/>
    </main>
  );

}
