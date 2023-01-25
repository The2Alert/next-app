import React, {useEffect} from "react";
import {useRouter} from "next/router";

export default function NotFoundPage(): React.ReactElement {
    const router = useRouter();

    useEffect(() => {
        router.push("/");
    }, []);

    return <></>;
}
