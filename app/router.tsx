import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./utils/quryClient";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient: queryClient,
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
