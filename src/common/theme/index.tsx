"use client";

import React, {useContext, useMemo} from "react";
import {ThemeProvider as StyledThemeProvider, ThemeContext} from "styled-components";
import {StyledComponentsRegistry} from "./StyledComponentsRegistry";
import {Theme} from "./types";

/// <reference path="./styled.d.ts" />

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const theme = useMemo<Theme>(
        () => ({
            palette: {
                primary: "blue"
            }
        }),
        []
    );

    return (
        <StyledComponentsRegistry>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </StyledComponentsRegistry>
    );
};

export function useTheme(): Theme {
    const value = useContext(ThemeContext);

    if (!value) {
        throw new Error("useTheme must be used within a ThemeProvider.");
    }

    return value;
}
