
import Navbar from "@/components/navbar/navbar";
import Hero from "@/app/ui/hero/hero";
import TechStack from "./ui/techStack/techStack";


import "./page.css";

interface Event {
  id: string;
  name: string;
  startAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL


export default function Home() {

  return (
    <div className="HomeComponent">
      <div className="HomeComponent-in">
        <div className="home-one">
           <Navbar />
        </div>
        <div className="home-two">
            <Hero />
        </div>  
        <div className="home-three">
            <TechStack />
        </div>
      </div>
    </div>
  );
}
