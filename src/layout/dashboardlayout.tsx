import { dashboardCards } from "../config/dashboard";
import NavbarComponent from "../components/navbar";
import Cards from "../components/card";
import bgVideo from '../assets/medicalbackgirundherovideo.mp4'; // add your video
import { Outlet } from "react-router-dom";

const DashboardHome = () => {
    const cards = dashboardCards["SUPERADMIN"] || [];

    return (
        <div className="video-wrapper">

            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="background-video"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="video-overlay"></div>

            {/* Navbar */}
            <NavbarComponent />

            {/* Dashboard Content */}
            <div className="dashboard-content">
                {cards.map((card, index) => (
                    <Cards key={index} card={card} />
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default DashboardHome;
