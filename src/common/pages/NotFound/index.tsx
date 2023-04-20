import React, {useEffect} from "react";
import {useRouter} from "next/router";

export const NotFoundPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/");
    }, []);

    return <></>;
};
