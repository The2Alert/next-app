"use client";

import React, {useContext} from "react";
import {ThemeProvider} from "@common/theme";

export type AppContextValue = {}; // eslint-disable-line

export const AppContext = React.createContext<AppContextValue | null>(null);

export type AppProviderProps = React.PropsWithChildren & AppContextValue;

export const AppProvider: React.FC<AppProviderProps> = ({children, ...value}) => (
    <AppContext.Provider value={value}>
        <ThemeProvider>{children}</ThemeProvider>
    </AppContext.Provider>
);

export function useApp(): AppContextValue {
    const value = useContext(AppContext);

    if (!value) {
        throw new Error("useApp must be used within a ThemeProvider.");
    }

    return value;
}
