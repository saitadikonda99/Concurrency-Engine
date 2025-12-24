import React from 'react'
import { Computer, Github, BookText } from "lucide-react";

import "./hero.css"

const hero = () => {
    return (
        <div className="HeroComponent">
            <div className="HeroComponent-in">
                <div className="hero-one">
                    <p>High-Concurrency Ticket Reservation Engine <Computer color="#0046FF" /></p>
                </div>
                <div className="hero-two">
                    <h1>Built to understand how <span>concurrency</span> works.</h1>
                    <p>A backend system that safely handles simultaneous booking requests.
                        Focused on concurrency control and consistency under load.</p>
                </div>
                <div className="hero-three">
                    <button className="Github"> <Github /> View on GitHub</button>
                    <button className="ReadMore"> <BookText /> Read more</button>
                </div>
            </div>
        </div>
    )
}

export default hero