"use client";

import React from "react";
import {Main} from "@common/Main";
import {Title} from "@common/Title";
import {CatalogServerSideData} from "./ServerSide";

export interface CatalogClientSideProps {
    data: CatalogServerSideData;
}

export const CatalogClientSide: React.FC<CatalogClientSideProps> = ({data}) => {
    const {lists, items} = data;

    return (
        <Main>
            <section>
                <Title>Списки</Title>
                <ul>
                    {Object.keys(lists)
                        .filter((code) => code !== "result")
                        .map((code, index) => (
                            <li key={index}>{code}</li>
                        ))}
                </ul>
            </section>
            <section>
                <Title>Товары</Title>
                <ul>
                    {items.items.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </section>
        </Main>
    );
};
