
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Register GSAP plugins globally
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(<App />);
  