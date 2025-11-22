import AppRoutes from './pages/Routes/AppRoutes';
import './App.css'
import { DarkModeProvider } from "./context/DarkModeContext";
function App() {

  return (
    <>
    <DarkModeProvider>
      <AppRoutes />
     </DarkModeProvider>
    </>
  )
}

export default App
