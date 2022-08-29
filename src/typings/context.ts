import type UserSession from "src/lib/user";
import type { Readable } from "svelte/store";

export interface AuthContextProps {
    loginWithAnchor: () => void;
    loginWithCloudWallet: () => void;
    logout: () => void;
    user: Readable<UserSession | undefined>;
    isLoggedIn: Readable<boolean>;
}

export type WaxWalletType = "wax-cloud-wallet" | "anchor";

export interface WaxUserProps {
    type: WaxWalletType; // wax-cloud-wallet || anchor
    wallet: string;
    permission?: string;
    pubKeys: string[]; // only used by wax cloud wallet
}

export interface WaxNetProps {
    endpoint: string;
    chainId: string;
    dApp: string;
}

export interface UserStore {
    user?: WaxUserProps;
}
