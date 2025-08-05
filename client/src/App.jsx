import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import PasteView from "./pages/PasteView.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PasteView />} />
      </Routes>
    </>
  );
}
