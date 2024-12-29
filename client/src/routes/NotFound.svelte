<script>
    import { push } from "svelte-spa-router";
</script>

<div class="text-center p-2">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <button on:click={() => push("/login")}>Go to Login</button>
</div>
