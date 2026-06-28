import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import aurora from "../assets/aurora.jpg"; // Change if your image is elsewhere
import Features from "../components/landing/Features";
import About from "../components/landing/About";
export default function Landing() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${aurora})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#050A12]/65 z-0" />

      {/* Soft Green Ambient Glow */}
      <div className="absolute left-1/2 top-0 z-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[180px]" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

<Hero />

<Features />

<About />
      </div>
    </div>
  );
}