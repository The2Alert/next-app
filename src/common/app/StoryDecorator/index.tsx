import {StoryFn} from "@storybook/react";
import React from "react";
import {App} from "@common/app";

export const AppStoryDecorator = () =>
    function AppStoryDecorator(Story: StoryFn): React.ReactElement {
        return (
            <App disableLayout>
                <Story />
            </App>
        );
    };
