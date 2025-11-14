import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import './App.css'
import { DarkModeProvider } from "./context/DarkModeContext";
function App() {

  return (
    <>
    <DarkModeProvider>
      <Routes>
          <Route index element={<HomePage/>} />
      </Routes>
     </DarkModeProvider>
    </>
  )
}

export default App
