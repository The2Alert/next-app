"use client";

import React from "react";
import ProgressBar from "next-nprogress-bar";
import {useTheme} from "@common/theme";

export const AppProgress: React.FC = () => {
    const theme = useTheme();

    return (
        <ProgressBar color={theme.palette.primary} options={{showSpinner: false}} appDirectory />
    );
};
