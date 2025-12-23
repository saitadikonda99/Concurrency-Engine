"use client"
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";

import { Computer, Github, BookText } from "lucide-react";


import "./page.css";

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
              <div className="home-two-one">
                <p>High-Concurrency Ticket Reservation Engine <Computer color="#0046FF" /></p>
              </div>
              <div className="home-two-two">
                <h1>Built to understand how <span>concurrency</span> works.</h1>
                <p>A backend system that safely handles simultaneous booking requests.
Focused on concurrency control and consistency under load.</p>
              </div>
              <div className="home-two-three">
                <button className="Github"> <Github /> View on GitHub</button>
                <button className="ReadMore"> <BookText /> Read more</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
