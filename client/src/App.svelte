<script>
    // Deteksi current route dari window.location.pathname
    let currentPath = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash

    // Import komponen
    import Login from "./routes/Login.svelte";
    import Register from "./routes/Register.svelte";
    import Dashboard from "./routes/Dashboard.svelte";

    // Component mapping berdasarkan path
    const components = {
        "/login": Login,
        "/register": Register,
        "/dashboard": Dashboard,
    };

    // Pilih komponen yang akan ditampilkan
    let CurrentComponent = components[currentPath] || Login; // Default ke Login
</script>

<main class="w-full h-full">
    <svelte:component this={CurrentComponent} />
</main>
