import type {Meta, StoryObj} from "@storybook/react";
import {Title} from "@common/Title";
import {AppStoryDecorator} from "@common/app/StoryDecorator";

export type TitleMeta = Meta<typeof Title>;

export type TitleStory = StoryObj<typeof Title>;

export const Basic: TitleStory = {
    args: {
        children: "Hello, world!"
    }
};

export default {
    title: "UI/Title",
    component: Title,
    decorators: [AppStoryDecorator()],
    argTypes: {
        children: {type: "string"}
    }
} as TitleMeta;
