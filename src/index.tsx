import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  WebviewType,
  ANDROID,
  Platform,
} from "@vkontakte/vkui";
import App from "./App";
import { RootContext } from "./RootContext";
import "@vkontakte/vkui/dist/vkui.css";

const Root = () => {
  const [platform, setPlatform] = useState<Platform>(ANDROID);
  const [webviewType, setWebviewType] = useState<WebviewType>(
    WebviewType.INTERNAL
  );
  return (
    <RootContext.Provider
      value={{
        setPlatform: (p) => setPlatform(p),
        webviewType,
        setWebViewType: (w) => {
          console.log(w);
          setWebviewType(w);
        },
      }}
    >
      <ConfigProvider
        isWebView={true}
        webviewType={webviewType}
        platform={platform}
      >
        <AdaptivityProvider>
          <AppRoot>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </RootContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
