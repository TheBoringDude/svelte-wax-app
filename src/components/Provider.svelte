<script lang="ts">
    import type { LinkSession } from "anchor-link";
    import UserSession from "../lib/user";

    import { anchorLink, contextKey, wax } from "../lib/wallet-provider";
    import type { AuthContextProps, WaxUserProps } from "../typings/context";

    import { setContext } from "svelte";

    import { user } from "../store/user";
    import { derived } from "svelte/store";

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
    const logout = () => {
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

    export let endpoint: string;
    export let chainId: string;
    export let dApp: string;
</script>

<div>
    <slot />
</div>
