"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';

import Navbar from '@/components/navbar/navbar';

import "./page.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Event {
    id: string;
    name: string;
    startAt: string;
}

const events = () => {

    const [events, setEvents] = useState<Event[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/events`);

            if (response.status !== 200) {
                console.error('Failed to fetch events:', response.statusText);
            }

            const data: Event[] = response.data;
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        console.log('Fetching events from API...');
        fetchEvents();
    }, []);

    return (
        <div className="EventsComponent">
            <div className="EventComponent-in">
                <div className="event-one">
                    <Navbar />
                </div>
                <div className="event-two">
                    <h1>Movies For you</h1>
                </div>
                <div className="event-three">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-card-one">
                                <img src="/event.jpeg" alt="Event Icon" width={50} height={50} />
                            </div>
                            <div className="event-card-two">
                                <h1>{event.name}</h1>
                                <p>{new Date(event.startAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default events