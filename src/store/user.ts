import type { UserStore } from "src/typings/context";
import { writable } from "svelte-local-storage-store";

export const user = writable<UserStore>("svelte-wax-app", {
    user: undefined,
});
