import React from "react";
import {App} from "..";

export const AppRootLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <html lang="ru">
            <body>
                <App>{children}</App>
            </body>
        </html>
    );
};
