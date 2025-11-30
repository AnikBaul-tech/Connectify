import AppRoutes from "./pages/Routes/AppRoutes";
import "./App.css";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <DarkModeProvider>
        <AppRoutes />
      </DarkModeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
