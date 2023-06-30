import React from "react";
import {TitleStyled} from "./Styled";

export const Title: React.FC<React.PropsWithChildren> = ({children}) => (
    <TitleStyled>{children}</TitleStyled>
);
