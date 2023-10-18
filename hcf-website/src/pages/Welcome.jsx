import React, {useState} from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import CollapsibleItem from "../components/Collapsible";

const Welcome = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return(
        <div id="welcome_page">
            <div className="hcf-hero">
                <Navigation/>
                <div className="text-side">
                    <h1>
                        Individual instant loans that are <span>fast</span> in services.
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus reiciendis necessitatibus fugiat dicta.
                    </p>
                    <Link to="/" className="call-to-action">Apply Now</Link>
                </div>
                <div className="cards-side">
                    <div className="nice-card"></div>
                </div>
            </div>

            <div className="how-it-works">
                <div className="text-side">
                    <div className="title-sec">
                        <h2>How to Apply for a loan with HCF</h2>
                        <p>Here are is how you can quickly apply for a loan. In just few steps!</p>
                    </div>

                    <div className="process-list">
                        <CollapsibleItem identifier="01" title="Choose Platform" index={0} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eveniet at nostrum impedit. Nesciunt maxime.</p>
                        </CollapsibleItem>
                        <CollapsibleItem identifier="02" title="Choose Your Company" index={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                            <p>Laboriosam ad amet saepe minus rerum error, odio ducimus itaque, doloribus quibusdam debitis! Porro, tempora!</p>
                        </CollapsibleItem>
                        <CollapsibleItem identifier="03" title="Enter Your Details as Requested" index={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                            <p>Laboriosam ad amet saepe minus rerum error, odio ducimus itaque, doloribus quibusdam debitis! Porro, tempora!</p>
                        </CollapsibleItem>
                        <CollapsibleItem identifier="04" title="Wait For Information Validation" index={3} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                            <p>Laboriosam ad amet saepe minus rerum error, odio ducimus itaque, doloribus quibusdam debitis! Porro, tempora!</p>
                        </CollapsibleItem>
                        <CollapsibleItem identifier="05" title="Receive Money" index={4} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                            <p>Laboriosam ad amet saepe minus rerum error, odio ducimus itaque, doloribus quibusdam debitis! Porro, tempora!</p>
                        </CollapsibleItem>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Welcome;