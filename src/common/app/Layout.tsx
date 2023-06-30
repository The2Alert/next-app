import React from "react";
import {Header} from "@common/Header";
import {AppProgress} from "./Progress";

export const AppLayout: React.FC<React.PropsWithChildren> = ({children}) => (
    <>
        <Header />
        {children}
        <AppProgress />
    </>
);
