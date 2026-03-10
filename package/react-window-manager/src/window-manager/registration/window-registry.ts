import { StoreApi, UseBoundStore } from "zustand";
import { WindowStore } from "../model/window-types";

/** @howToUse use the syntax `windowRegistry[<winId>]()` to access a store */
export const windowRegistry: Record<string, UseBoundStore<StoreApi<WindowStore>>> = {}