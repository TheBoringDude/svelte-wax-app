<script lang="ts">
    import svelteLogo from "./assets/svelte.svg";
    import Provider from "./components/Provider.svelte";
    import WaxUser from "./components/WaxUser.svelte";

    const endpoint = "https://waxtestnet.greymass.com";
    const chainId =
        "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12";
    const dApp = "svelte-wax";
</script>

<Provider {...{ endpoint, chainId, dApp }}>
    <main>
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" class="logo" alt="Vite Logo" />
            </a>
            <a href="https://svelte.dev" target="_blank">
                <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
            </a>
        </div>
        <h1>Vite + Svelte</h1>

        <div class="card">
            <WaxUser />
        </div>

        <p>
            Check out <a
                href="https://github.com/sveltejs/kit#readme"
                target="_blank">SvelteKit</a
            >, the official Svelte app framework powered by Vite!
        </p>

        <p class="read-the-docs">
            Click on the Vite and Svelte logos to learn more
        </p>
    </main>
</Provider>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
        color: #888;
    }
</style>
