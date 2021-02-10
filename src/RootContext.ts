import { createContext } from "react";
import { Platform, WebviewType } from "@vkontakte/vkui/dist";

export interface RootContextInterface {
  setPlatform: (platform: Platform) => void;
  webviewType: WebviewType;
  setWebViewType: (webViewType: WebviewType) => void;
}

export const RootContext = createContext<RootContextInterface>({
  setPlatform: (p) => {},
  webviewType: WebviewType.INTERNAL,
  setWebViewType: (w) => {},
});
