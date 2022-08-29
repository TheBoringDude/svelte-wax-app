<script lang="ts">
    import type { LinkSession } from "anchor-link";
    import UserSession from "../lib/user";
    import { anchorLink, contextKey, wax } from "../lib/wallet-provider";
    import type {
        AuthContextProps,
        UserStore,
        WaxUserProps,
    } from "../typings/context";
    import { setContext } from "svelte";
    import { writable } from "svelte-local-storage-store";
    import { derived } from "svelte/store";

    export let endpoint: string;
    export let chainId: string;
    export let dApp: string;

    export const user = writable<UserStore>(dApp, {
        user: undefined,
    });

    const session = derived(user, ($user) => {
        return new UserSession($user.user, {
            endpoint,
            chainId,
            dApp,
        });
    });
    const isLoggedIn = derived(user, ($user) => {
        if ($user.user) {
            return true;
        }

        return false;
    });

    // login function handler
    const login = (_user: WaxUserProps) => {
        $user = {
            user: _user,
        };
    };

    // logout handler
    const logout = async () => {
        if ($user.user?.type == "anchor") {
            // clear localstorage data saved by anchor
            const anchor = anchorLink(endpoint, chainId);
            await anchor.clearSessions(dApp);
        }

        $user = {
            user: undefined,
        };
    };

    // login with anchor
    const loginWithAnchor = async () => {
        let session: LinkSession | null;

        const anchor = anchorLink(endpoint, chainId);

        const sessionList = await anchor.listSessions(dApp);
        if (sessionList && sessionList.length > 0) {
            session = await anchor.restoreSession(dApp);
        } else {
            try {
                const sess = await anchor.login(dApp);
                session = sess.session;
            } catch (e) {
                throw new Error(e as any);
            }
        }

        if (!session) return;

        login({
            type: "anchor",
            wallet: String(session.auth.actor),
            permission: String(session.auth.permission),
            pubKeys: [],
        });
    };

    // login with cloud wallet
    const loginWithCloudWallet = async () => {
        const waxwallet = wax(endpoint);

        const userAccount = await waxwallet.login();
        const pubKeys = waxwallet.pubKeys;

        login({ type: "wax-cloud-wallet", wallet: userAccount, pubKeys });
    };

    setContext<AuthContextProps>(contextKey, {
        logout,
        loginWithCloudWallet,
        loginWithAnchor,
        user: session,
        isLoggedIn,
    });
</script>

<div>
    <slot />
</div>
