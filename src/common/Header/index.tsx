import React from "react";
import Link from "next/link";

export const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Главная</Link>
                    </li>
                    <li>
                        <Link href="/catalog">Каталог</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
