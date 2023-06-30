import React from "react";

export interface CatalogServerSideData {
    lists: any; // eslint-disable-line
    items: {items: any[]}; // eslint-disable-line
}

export type CatalogServerSideCallback = (data: CatalogServerSideData) => React.ReactElement;

export interface CatalogServerSideProps {
    children: CatalogServerSideCallback;
}

export const CatalogServerSide: React.FC<CatalogServerSideProps> = async ({children: callback}) => {
    const listsResponse = await fetch("https://suitetextile.ru/api/catalog/lists", {
        next: {
            revalidate: 20
        }
    });
    const lists = await listsResponse.json();
    const itemsResponse = await fetch(
        "https://suitetextile.ru/api/catalog/sale-items?goods=all&start=0&perPage=10&disableFilters=0",
        {
            next: {
                revalidate: 20
            }
        }
    );
    const items = await itemsResponse.json();
    const data: CatalogServerSideData = {
        lists,
        items
    };

    return callback(data);
};
