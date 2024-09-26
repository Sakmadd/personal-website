import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./pages/home.tsx"
import "./assets/css/input.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
