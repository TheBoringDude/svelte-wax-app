<script lang="ts">
    import { contextKey } from "../lib/wallet-provider";
    import type { AuthContextProps } from "../typings/context";

    import { getContext } from "svelte";

    const { user, isLoggedIn, loginWithAnchor, logout } =
        getContext<AuthContextProps>(contextKey);

    const testTransact = async () => {
        await $user
            .transact(
                [
                    {
                        account: "eosio.token",
                        name: "transfer",
                        authorization: [
                            {
                                actor: $user.wallet,
                                permission: $user.permission,
                            },
                        ],
                        data: {
                            from: $user.wallet,
                            to: "eosio",
                            quantity: "0.00000001 WAX",
                            memo: "",
                        },
                    },
                ],
                { blocksBehind: 3, expireSeconds: 1200 }
            )
            .then((r) => {
                console.log(r);
            });
    };
</script>

<div>
    {#if $isLoggedIn}
        <button on:click={logout}>logout</button>
        <button on:click={testTransact}>test transaction</button>
    {:else}
        <button on:click={loginWithAnchor}>login with anchor</button>
    {/if}

    <p>{$user.wallet}</p>
</div>
