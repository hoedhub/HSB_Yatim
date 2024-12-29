<script>
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";

    let user = null;

    onMount(async () => {
        try {
            const response = await fetch("/api/profile");
            if (response.ok) {
                user = await response.json();
            } else {
                push("/login");
            }
        } catch (err) {
            push("/login");
        }
    });

    async function handleLogout() {
        await fetch("/api/auth/logout");
        push("/login");
    }
</script>

<div class="p-2">
    {#if user}
        <h1>Welcome, {user.username}!</h1>
        <button on:click={handleLogout}>Logout</button>
    {:else}
        <p>Loading...</p>
    {/if}
</div>
