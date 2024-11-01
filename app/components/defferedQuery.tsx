import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const getFirst = async () => {
  const one = new Promise<string>((r) => setTimeout(() => r("first"), 3_000));
  const result = await one;
  return result;
};

const getSecond = async () => {
  const one = new Promise<string>((r) => setTimeout(() => r("second"), 3_000));
  const result = await one;
  return result;
};

const getThird = async () => {
  const one = new Promise<string>((r) => setTimeout(() => r("third"), 3_000));
  const result = await one;
  return result;
};

const getStuff = createServerFn("GET", async () => {
  const [first, second, third] = await Promise.all([
    getFirst(),
    getSecond(),
    getThird(),
  ]);

  return {
    first,
    second,
    third,
  };
});

export const deferredQueryOptions = () =>
  queryOptions({
    queryKey: ["deferred"],
    queryFn: () => getStuff(),
  });

export function DeferredQuery({ view }: { view: "grid" | "column" }) {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());

  return (
    <div className="flex gap-5 flex-col">
      <h1>Deferred Query</h1>
      <div className="flex gap-3">
        <Link from="/" search={() => ({ view: "grid" as const })}>
          Grid
        </Link>
        <Link from="/" search={() => ({ view: "column" as const })}>
          Columns
        </Link>
      </div>
      <div className={view === "grid" ? "columns-2" : "columns-1"}>
        <div>first: {deferredQuery.data.first}</div>
        <div>second: {deferredQuery.data.second}</div>
        <div>third: {deferredQuery.data.third}</div>
      </div>
    </div>
  );
}
