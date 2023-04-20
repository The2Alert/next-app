import React from "react";
import styled from "styled-components";
import {Page} from "@common/Page";

export const Title = styled.h1`
    color: #8be0ea;
`;

export const HomePage: React.FC = () => {
    return (
        <Page title="Home">
            <Title>Hello, world!</Title>
        </Page>
    );
};
