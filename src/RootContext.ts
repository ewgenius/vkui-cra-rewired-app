import { createContext } from "react";
import { Platform } from "@vkontakte/vkui/dist";

export interface RootContextInterface {
  setPlatform: (platform: Platform) => void;
}

export const RootContext = createContext<RootContextInterface>({
  setPlatform: (p) => {},
});
