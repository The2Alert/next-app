import React, {Suspense} from "react";
import {CatalogClientSide} from "./ClientSide";
import {CatalogLoading} from "./Loading";
import {CatalogServerSide} from "./ServerSide";

export const CatalogPage: React.FC = () => {
    return (
        <Suspense fallback={<CatalogLoading />}>
            <CatalogServerSide>{(data) => <CatalogClientSide data={data} />}</CatalogServerSide>
        </Suspense>
    );
};
