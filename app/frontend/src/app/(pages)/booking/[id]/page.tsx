"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Navbar from '@/components/navbar/navbar';
import { useRouter, useParams } from 'next/navigation'

import './page.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function SeatLayout() {

  const [seats, setSeats] = useState<any[]>([]);

  const params = useParams();
  const eventId = params.id;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/booking/${eventId}/seats`);

        if (response.status !== 200) {
          console.error('Failed to fetch seats:', response.statusText);
          return;
        }

        const data = response.data;
        setSeats(data);
      } catch (error) {
        console.error('Error generating seats:', error);
      }
    };
    fetchSeats();
  }, [eventId]);

  function getRowLabel(seatNo: string) {
    return seatNo.match(/^[A-Z]+/)?.[0] || "";
  }


  const groupedSeats = React.useMemo(() => {
    const map: Record<string, any[]> = {};

    seats.forEach((seat: any) => {
      if (!seat.seatNo) return;

      const row = getRowLabel(seat.seatNo);
      if (!map[row]) map[row] = [];

      map[row].push(seat);
    });

    Object.values(map).forEach((rowSeats) =>
      rowSeats.sort(
        (a, b) =>
          Number(a.seatNo.replace(/\D/g, "")) -
          Number(b.seatNo.replace(/\D/g, ""))
      )
    );

    return Object.entries(map).sort(([a], [b]) =>
      a.localeCompare(b, "en", { numeric: true })
    );
  }, [seats]);


  const handleSeatClick = (seatId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat: any) =>
        seat.id === seatId
          ? {
              ...seat,
              status:
                seat.status === "AVAILABLE"
                  ? "SELECTED"
                  : seat.status === "SELECTED"
                  ? "AVAILABLE"
                  : seat.status,
            }
          : seat
      )
    );
  }


  return (
    <div className="BookingComponent">
      <div className="BookingComponent-in">

        <div className="booking-one">
          <Navbar />
        </div>
        <div className="booking-two">

          <div className="booking-two-one">
            <Image
              src="/Screen.png"
              alt="screen"
              width={400}
              height={100}
            />
          </div>
          <div className="booking-two-two">
            <div className="booking-two-two-in">
              {groupedSeats.map(([rowLabel, rowSeats]) => (
                <div key={rowLabel} className="seat-row">
                  <div className="row-label">{rowLabel}</div>

                  <div className="seats-container">
                    {rowSeats.map((seat: any) => (
                      <div
                        key={seat.id}
                        className={`seat ${seat.status.toLowerCase()}`}
                        onClick={() => handleSeatClick(seat.id)}
                      >
                        {seat.seatNo.replace(/^[A-Z]+/, "")}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="booking-two-three">
            <div className="booking-two-three-one">
              <span className='available'></span>
              <p>Available</p>
            </div>
            <div className="booking-two-three-two">
              <span className="selected"></span>
              <p>Selected</p>
            </div>
            <div className="booking-two-three-three">
              <span className="occupied"></span>
              <p>Occupied</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}