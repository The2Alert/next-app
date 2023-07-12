import {Metadata} from "next";
import {AppRootLayout} from "@common/app/RootLayout";
import {siteName, siteUrl} from "@common/config";

export const metadata: Metadata = {
    title: {
        default: siteName,
        template: "%s / " + siteName
    },
    description: "Next.js Startup Application by dev2alert.",
    metadataBase: new URL(siteUrl),
    openGraph: {
        title: "Next.js Startup Application",
        description: "Next.js Startup Application by dev2alert.",
        url: siteUrl,
        siteName,
        images: [
            {
                url: "/icon-512x512.png",
                width: 512,
                height: 512,
                alt: "Site logo"
            }
        ],
        locale: "ru",
        type: "website"
    },
    robots: {
        index: false,
        googleBot: {
            index: false
        }
    },
    icons: {
        shortcut: "/favicon.ico",
        apple: "/favicon.ico"
    },
    themeColor: "blue",
    manifest: "/manifest.json",
    verification: {
        google: "NUlWiYGFYApadyxTLeh5zlsPe6-T9rsdC9_HdGxF6BU",
        yandex: "36f472004a011c9f"
    }
};

export default AppRootLayout;
