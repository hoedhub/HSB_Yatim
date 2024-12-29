<script>
    import { onMount } from "svelte";

    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let error = "";
    let loading = false;

    onMount(async () => {
        try {
            const response = await fetch("/api/auth/check", {
                credentials: "include",
            });
            const data = await response.json();

            if (data.authenticated) {
                window.location.href = "/dashboard";
            }
        } catch (err) {
            console.error("Auth check error:", err);
        }
    });

    async function handleRegister() {
        if (loading) return;
        error = "";
        loading = true;
        if (password !== confirmPassword) {
            error = "Passwords do not match";
            alert(error);
            loading = false;
            return;
        }
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = "/login";
            } else {
                error = data.error || "Registration failed";
            }
        } catch (err) {
            error = "Network error. Please try again.";
        } finally {
            loading = false;
        }
    }
</script>

<div
    class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <a
                href="/login"
                class="font-medium text-primary-600 hover:text-primary-500"
            >
                Sign in
            </a>
        </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {#if error}
                <div
                    class="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <span class="block sm:inline">{error}</span>
                </div>
            {/if}

            <form class="space-y-6" on:submit|preventDefault={handleRegister}>
                <div>
                    <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Username
                    </label>
                    <div class="mt-1">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            bind:value={username}
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <div class="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            bind:value={email}
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <div class="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            bind:value={password}
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="passwordConfirm"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <div class="mt-1">
                        <input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            required
                            bind:value={confirmPassword}
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        {#if loading}
                            <span class="inline-flex items-center">
                                <svg
                                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Creating an account...
                            </span>
                        {:else}
                            Create account
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
