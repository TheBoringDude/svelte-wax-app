<script lang="ts">
    import { contextKey } from "../lib/wallet-provider";
    import type { AuthContextProps } from "../typings/context";

    import { getContext } from "svelte";

    const { user, isLoggedIn, loginWithAnchor, logout } =
        getContext<AuthContextProps>(contextKey);
</script>

<div>
    {#if $isLoggedIn}
        <button on:click={logout}>logout</button>
    {:else}
        <button on:click={loginWithAnchor}>login with anchor</button>
    {/if}

    <p>{$user.wallet}</p>
</div>
