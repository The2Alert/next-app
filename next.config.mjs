import withPWAInit from "@ducanh2912/next-pwa";

export const withPWA = withPWAInit({
    dest: "./public"
});

export default withPWA({
    images: {
        domains: ["api.suitetextile.ru"]
    }
});
