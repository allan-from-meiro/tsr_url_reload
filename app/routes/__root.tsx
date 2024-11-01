import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import {
  Body,
  createServerFn,
  Head,
  Html,
  Meta,
  Scripts,
} from "@tanstack/start";
import * as React from "react";
import appCss from "../styles/app.css?url";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { queryClient } from "../utils/quryClient";

type RouterContext = {
  user?: {
    email: string;
  };
  queryClient: QueryClient;
};

const fetchUser = createServerFn("GET", async () => {
  const email = await new Promise((r) =>
    setTimeout(() => r("some@email.com"), 500),
  );

  return {
    email: email,
  };
});

export const Route = createRootRouteWithContext<RouterContext>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStack",
    },
  ],
  links: () => [{ rel: "stylesheet", href: appCss }],
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      user,
    };
  },
  pendingComponent: () => <div>Loading...</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </Body>
    </Html>
  );
}
