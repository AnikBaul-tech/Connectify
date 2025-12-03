import AppRoutes from "./pages/Routes/AppRoutes";
import "./App.css";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <DarkModeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </DarkModeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
