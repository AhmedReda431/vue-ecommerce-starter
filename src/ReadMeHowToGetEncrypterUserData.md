# Authentication Store Usage Guide

This guide demonstrates how to use the authentication store within your components, templates, and composables while maintaining Pinia's reactivity.

## 1. Component Implementation

Use `storeToRefs` to destructure properties from the store. Destructuring the store directly will break Vue's reactivity system.

```vue
<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

// ✅ Good: Reactive — auto-updates when the user logs in/out
const { user, isAuthenticated, isAdmin } = storeToRefs(authStore);

// ❌ Bad: Don't do this — loses reactivity
// const { user } = authStore;
</script>

<template>
  <!-- Conditional rendering based on auth status -->
  <div v-if="isAuthenticated">
    <v-avatar :image="user?.image" />
    <p>Welcome, {{ user?.name }}!</p>
    <p>Email: {{ user?.email }}</p>
  </div>
  <div v-else>
    <v-btn to="/login">Login</v-btn>
  </div>
</template>
```

## 2. Debugging & Console Logging

To inspect the authentication state in components, lifecycle hooks, or the browser console, access the store properties directly without destructuring.

```javascript
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

// Print the whole user object
console.log("Full User Object:", authStore.user);

// Print specific fields using optional chaining
console.log("Name:", authStore.user?.name);
console.log("Email:", authStore.user?.email);
console.log("Avatar:", authStore.user?.image);
console.log("Token:", authStore.token); // JWT access token
console.log("Is Admin?:", authStore.isAdmin);
```

## 3. Composable Integration

Encapsulate the auth store logic inside a reusable composable file (`composables/useUser.js`) to provide clean getter methods across your application.

```javascript
// composables/useUser.js
import { useAuthStore } from "@/stores/auth";

export function useUser() {
  const authStore = useAuthStore();

  return {
    getUserId: () => authStore.user?.id,
    getUserName: () => authStore.user?.name || "Guest",
    getToken: () => authStore.token,
    isLoggedIn: () => authStore.isAuthenticated,
  };
}
```
