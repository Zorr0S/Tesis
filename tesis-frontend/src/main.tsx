import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfirmProvider } from "material-ui-confirm";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* // <React.StrictMode>
       
      </React.StrictMode> */}
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </QueryClientProvider>
  </Provider>
);
