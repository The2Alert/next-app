<h1 align="center">Next.js Архитектура by <a href="https://github.com/dev2alert">dev2alert</a> (Версия: 0.1.0) (Экспериментальная) 🚀</h1>
<p>Здесь хранится подробная информация об построении архитектуры Next.js приложения от <a href="https://github.com/dev2alert">dev2alert</a>.<br />
Актуальная версия архитектуры храниться <a href="https://github.com/dev2alert/next-app/blob/main/ARCH.md">тут</a>.</p>
<p>Данный проект <b>должен придерживаться</b> этих паттернов!</p>

<h2>Содержимое</h2>
<ul>
    <li><a href="#корень-проекта">Корень проекта</a></li>
    <li><a href="#компонент">Компонент</a></li>
    <li><a href="#страница">Страница</a></li>
</ul>

<h2>Корень проекта</h2>
<p>В корне должны находится две папки, это <code>./src/app</code> - где <b>App Router</b> и <code>./src/common</code> - где <b>общий функционал/компоненты</b>.</p>

<h2>Компонент</h2>
<h3>Структура папки компонента</h3>
<p>1) <b>Компонент</b> <code>./**/Example/index.tsx</code>:</p>

```typescript
import React, {Suspense} from "react";
import {ExampleClientSide} from "./ClientSide";
import {ExampleProvider} from "./Context";
import {ExampleLoading} from "./Loading";
import {ExampleServerSide} from "./ServerSide";

export interface ExampleProps {
    data3: boolean;
    data4: number;
}

export const Example: React.FC<ExampleProps> = ({data3, data4}) => {
    return (
        <ExampleProvider data4={data4}>
            <Suspense fallback={<ExampleLoading />}>
                <ExampleServerSide>
                    {(data) => (
                        <ExampleClientSide data={data} data3={data3} />
                    )}
                </ExampleServerSide>
            </Suspense>
        </ExampleProvider>
    );
};
```

<p>2) <b>Компонент загрузки</b> <code>./**/Example/Loading.tsx</code>.<br />Отображается в момент, <b>когда</b> асинхронный компонент <b>запрашивает данные</b>:</p>

```typescript
import React from "react";

export const ExampleLoading: React.FC = () => (
    <h1>Loading...</h1>
);
```

<p>3) <b>Серверный компонент</b> <code>./**/Example/ServerSide.tsx</code>.<br />Здесь используется асинхронный компонент, который <b>запрашивает данные</b>, которые запрашиваются <b>на стороне сервера</b> и в конечном итоге отображаются через <b>потоковую передачу</b>:</p>

```typescript
import React from "react";

export interface ExampleServerSideData {
    data1: string;
    data2: number;
}

export type ExampleServerSideCallback = (data: ExampleServerSideData) => React.ReactElement;

export interface ExampleServerSideProps {
    children: ExampleServerSideCallback;
}

export const ExampleServerSide: React.FC<ExampleServerSideProps> = async ({children: callback}) => {
    const data1Response = await fetch("https://example.com/data1");
    const data1 = await data1Response.json();
    const data2Response = await fetch("https://example.com/data2", {
        next: {
            revalidate: 20
        }
    });
    const data2 = await data2Response.json();
    const data: ExampleServerSideData = {
        data1,
        data2
    };

    return callback(data);
};
```

<p>4) <b>Клиентский компонент</b> <code>./**/Example/ClientSide.tsx</code>.<br />Здесь хранится <b>логика</b> компонента.<br />Этот компонент может использоваться и в качестве <b>серверного компонента</b>, главная его роль в <b>отображении разметки</b>:</p>

```typescript
"use client";

import React from "react";
import {useExample} from "./Context";
import {ExampleLayout} from "./Layout";
import {ExampleServerSideData} from "./ServerSide";
import {ExampleText} from "./Styled";

export interface ExampleClientSideProps {
    data: ExampleServerSideData;
    data3: boolean;
}

export const ExampleClientSide: React.FC<ExampleClientSideProps> = ({data, data3}) => {
    const {data1, data2} = data;
    const {data4} = useExample();

    return (
        <ExampleLayout
            data1={
                <ExampleText>
                    <b>Data 1:</b> {data1}
                </ExampleText>
            }
            data2={
                <ExampleText>
                    <b>Data 2:</b> {data2}
                </ExampleText>
            }
            data3={
                <ExampleText>
                    <b>Data 3:</b> {data3}
                </ExampleText>
            }
            data4={
                <ExampleText>
                    <b>Data 4:</b> {data4}
                </ExampleText>
            }
        />
    );
};
```

<p>5) <b>Стилизованные компоненты</b> <code>./**/Example/Styled.tsx</code> от <code>styled-components</code>:</p>

```typescript
"use client";

import {styled} from "styled-components";

export const ExampleStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ExampleBlock = styled.div`
    display: flex;
    gap: 20px;
`;

export const ExampleText = styled.p`
    font: normal 14px sans-serif;
`;
```

<p>6) <b>Компонент компоновки</b> <code>./**/Example/Layout.tsx</code>. Полезен, когда ваш компонент имеет <b>большую структуру</b>:</p>

```typescript
import React from "react";
import {ExampleBlock, ExampleStyled} from "./Styled";

export interface ExampleLayoutProps {
    data1: React.ReactNode;
    data2: React.ReactNode;
    data3: React.ReactNode;
    data4: React.ReactNode;
}

export const ExampleLayout: React.FC<ExampleLayoutProps> = ({data1, data2, data3, data4}) => {
    return (
        <ExampleStyled>
            {data1}
            <ExampleBlock>
                {data2}
                {data3}
            </ExampleBlock>
            {data4}
        </ExampleStyled>
    );
};
```

<p>7) <b>Контекст компонента</b> <code>./**/Example/Context.tsx</code>:</p>

```typescript
"use client";

import React, {useContext} from "react";

export interface ExampleContextValue {
    data4: number;
}

export const ExampleContext = React.createContext<ExampleContextValue | null>(null);

export type ExampleProviderProps = ExampleContextValue & React.PropsWithChildren;

export const ExampleProvider: React.FC<ExampleProviderProps> = ({children, ...value}) => (
    <ExampleContext.Provider value={value}>{children}</ExampleContext.Provider>
);

export function useExample(): ExampleContextValue {
    const value = useContext(ExampleContext);

    if (!value) {
        throw new Error("useExample must be used within a ExampleProvider.");
    }

    return value;
}
```

<p>8) <b>Stories компонента для Storybook</b> <code>./**/Example/index.stories.tsx</code>:</p>

```typescript
import type {Meta, StoryObj} from "@storybook/react";
import {Example} from ".";

export type ExampleMeta = Meta<typeof Example>;

export type ExampleStory = StoryObj<typeof Example>;

export const Basic: ExampleStory = {
    args: {
        data3: true,
        data4: 2023
    }
};

export default {
    title: "Example",
    component: Example
} as ExampleMeta;
```

<p>9) <b>Типизация</b> необходимая для компонента <code>./**/Example/types.ts</code> или <code>./**/Example/types/typeName.ts</code>:</p>

```typescript
export type UserId = number;

export interface UserInfo {
    id: UserId;
    name: string;
    surname: string;
}
```

<p>10) <b>Функции</b> необходимые для компонента <code>./**/Example/utils/functionName.ts</code>:</p>

```typescript
import {UserInfo} from "../types";

export function createUserInfo(): UserInfo {
    return {
        id: 110,
        name: "Artem",
        surname: "Potykun"
    };
}
```

<p>11) <b>Хуки</b> необходимые для компонента <code>./**/Example/hooks/useHookName.ts</code>:</p>

```typescript
import {useMemo} from "react";
import {UserInfo} from "../types";
import {createUserInfo} from "../utils/createUserInfo";

export function useUserInfo(): UserInfo {
    return useMemo(() => createUserInfo(), []);
}
```

<h2>Страница</h2>
<p>Правила:</p>
<p>✅ Страницы должны находится в <code>./common/pages/*</code>.<br />
🚫 Страницы запрещено использовать в <b>других директориях</b>, например в <code>./common/pages/Example/pages/Child</code>.<br />
✅ Следует использовать <code>./common/pages/ExampleChild</code> формируя страницы в <b>одной директории</b> <code>./common/pages/*</code>.</p>
<p>Формирование компонентов страницы аналогично <b>архитектуре компонентов</b>, за исключением того, что на страницах можно использовать:</p>
<p>1) <b>Компонент страницы</b> <code>./common/pages/Example/index.tsx</code>.<br />Название компонента страницы должно заканчиваться на <code>Page</code>, например <code>ExamplePage</code>.<br />Компонент страницы используется для <code>page.tsx</code> в <b>App Router</b>:</p>

```typescript
import React, {Suspense} from "react";
import {ExampleClientSide} from "./ClientSide";
import {ExampleProvider} from "./Context";
import {ExampleLoading} from "./Loading";
import {ExampleServerSide} from "./ServerSide";

export const ExamplePage: React.FC = () => {
    const data3 = true;
    const data4 = 2023;

    return (
        <ExampleProvider data4={data4}>
            <Suspense fallback={<ExampleLoading />}>
                <ExampleServerSide>
                    {(data) => <ExampleClientSide data={data} data3={data3} />}
                </ExampleServerSide>
            </Suspense>
        </ExampleProvider>
    );
};
```

<p>2) <b>Компонент компоновки страницы</b> <code>./common/pages/Example/PageLayout.tsx</code>. <b>Не путать с <code>Layout.tsx</code>!</b><br /><code>PageLayout.tsx</code> используется для <code>layout.tsx</code> в <b>App Router</b>, а <code>Layout.tsx</code> используется <b>внутри</b> компонента страницы:</p>

```typescript
import React from "react";

export interface ExamplePageLayoutProps extends React.PropsWithChildren {
    example2: React.ReactNode;
}

export const ExamplePageLayout: React.FC<ExamplePageLayoutProps> = ({example2, children}) => {
    const isAuthorized = true;

    if (isAuthorized) {
        return children;
    } else {
        return example2;
    }
};
```

<p>*) <b>Остальные компоненты/модули</b> используются в соответствии с архитектурой компонентов. Названия оканчивающееся на <code>Page</code> используются только в вышеуказанных компонентах страницы. Например, если в модулях <code>index.tsx</code> и <code>Layout.tsx</code> используется название <code>ExamplePage</code>, то в других компонентах/модулях уже используется <code>Example</code>.</p>

<h2>Автор</h2>
<p><a href="https://github.com/dev2alert">dev2alert</a></p>
