import React from "react";
import {redirect} from "next/navigation";

export const NotFoundPage: React.FC = () => {
    redirect("/");
};
