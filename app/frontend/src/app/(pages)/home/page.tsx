"use client";

import React from 'react';
import Image from 'next/image';
import { generateSeats } from '@/data/seat';
import { seatRows } from '@/data/seat';
import Navbar from '@/components/navbar/navbar';

import './page.css';


export default function SeatLayout() {

  const [seats, setSeats] = React.useState(generateSeats());

  const handleSeatClick = (seatId: string) => {

  }

  return (
    <div className="HomeComponent">
      <div className="Homecomponent-in">

        <div className="home-one">
          <Navbar />
        </div>
        <div className="home-two">
          <Image 
            src="/Screen.png"
            alt="screen"
            width={400}
            height={100}
          />
        </div>
        <div className="home-three">
          <div className="home-three-in">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                <div className="row-label">{seatRows[rowIndex]}</div>
                {row.map((seat) => (
                  <div
                    key={seat.id}
                    className={`seat ${seat.status}`}
                    onClick={() => handleSeatClick(seat.id)}
                  >
                    <p>{seat.number}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}