import React from "react";
import ReactDOM from "react-dom";
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  WebviewType,
} from "@vkontakte/vkui";
import App from "./App";
import "@vkontakte/vkui/dist/vkui.css";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider isWebView={true} webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
