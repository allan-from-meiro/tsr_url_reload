import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "vinxi";
import {
  DeferredQuery,
  deferredQueryOptions,
} from "~/components/defferedQuery";

export const Route = createFileRoute("/")({
  validateSearch: zodSearchValidator(
    z.object({
      view: fallback(z.enum(["grid", "column"]), "grid").default("grid"),
    }),
  ),
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(deferredQueryOptions());
  },
  shouldReload: false,
  component: Deferred,
});

function Deferred() {
  const [count, setCount] = useState(0);
  const { view: attributesView } = Route.useSearch();

  return (
    <div className="p-2">
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <Suspense fallback="Loading Middleman...">
        <DeferredQuery view={attributesView} />
      </Suspense>
    </div>
  );
}
