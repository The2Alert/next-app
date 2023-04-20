import React from "react";
import NextDocument, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps
} from "next/document";
import {ServerStyleSheet} from "styled-components";

export default class Document extends NextDocument {
    public static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
                });

            let initialProps: DocumentInitialProps = await NextDocument.getInitialProps(ctx);
            initialProps = {
                ...initialProps,
                styles: [initialProps.styles, sheet.getStyleElement()]
            };

            return initialProps;
        } finally {
            sheet.seal();
        }
    }

    public render(): React.ReactElement {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
