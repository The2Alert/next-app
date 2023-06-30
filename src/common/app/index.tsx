import React from "react";
import {AppProvider} from "./Context";
import {AppGlobalStyled} from "./GlobalStyled";
import {AppLayout} from "./Layout";

export interface AppProps extends React.PropsWithChildren {
    disableLayout?: boolean;
}

export const App: React.FC<AppProps> = ({children, disableLayout = false}) => {
    return (
        <AppProvider>
            {disableLayout ? children : <AppLayout>{children}</AppLayout>}
            <AppGlobalStyled />
        </AppProvider>
    );
};

export * from "./Context";
