import type {StorybookConfig} from "@storybook/nextjs";

export default {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: {
        name: "@storybook/nextjs",
        options: {}
    },
    docs: {
        autodocs: true
    }
} as StorybookConfig;
