"use client"
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";

interface Event {
  id: string;
  name: string;
  startAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL


export default function Home() {

  const  [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      if (!response.ok) {
        console.error('Failed to fetch events:', response.statusText);
        return;
      }
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };    

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="HomeComponent">
      <div className="HomeComponent-in">
        <div className="home-one">
           <Navbar />
        </div>
        <div className="home-two">
          <div className="home-two-in">
            
          </div>
        </div>
      </div>
    </div>
  );
}
