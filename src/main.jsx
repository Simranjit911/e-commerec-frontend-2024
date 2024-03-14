import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <DarkModeProvider>
        <App />
        <Toaster toastOptions={{ duration: 2000 }} />
      </DarkModeProvider>
    </BrowserRouter>
  </Provider>
);
