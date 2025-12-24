import React from 'react'

import "./techStack.css"

const Icons = ['/icons/TypeScript.png', '/icons/bun.svg', '/icons/Nextjs.svg', '/icons/Redis.svg', '/icons/MySQL.svg', '/icons/Docker.svg']

const techStack = () => {
    return (
        <div className="techStackComponent">
            <div className="techStackComponent-in">
                <div className="techStack-one">
                    <h1> <span>$</span> Tech Stack</h1>
                </div>
                <div className="techStack-two">
                    <div className="techStack-two-one">
                        <p>Powered by modern</p>
                        <p>production-ready technologies</p>
                    </div>
                    <div className="techStack-two-two">
                        {Icons.map((icon, index) => (
                            <div key={index} className="techStack-icon">
                                <img src={icon} alt={`Tech Icon ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default techStack