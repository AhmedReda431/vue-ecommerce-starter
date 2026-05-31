<
<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4 text-center">
          <v-avatar size="120" color="primary" class="mb-4">
            <v-icon size="64" color="white">mdi-account</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold">
            {{ authStore.user?.name || "User" }}
          </h2>
          <p class="text-grey">
            {{ authStore.user?.email || "user@example.com" }}
          </p>
          <v-chip color="primary" class="mt-2">{{
            authStore.user?.role || "Customer"
          }}</v-chip>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-tabs v-model="tab">
            <v-tab value="profile">Profile</v-tab>
            <v-tab value="orders">Orders</v-tab>
            <v-tab value="settings">Settings</v-tab>
          </v-tabs>

          <v-window v-model="tab" class="mt-4">
            <v-window-item value="profile">
              <v-form>
                <v-text-field
                  label="Full Name"
                  v-model="profile.name"
                  variant="outlined"
                  class="mb-2"
                />
                <v-text-field
                  label="Email"
                  v-model="profile.email"
                  variant="outlined"
                  class="mb-2"
                />
                <v-text-field
                  label="Phone"
                  v-model="profile.phone"
                  variant="outlined"
                  class="mb-2"
                />
                <v-btn color="primary" @click="updateProfile"
                  >Save Changes</v-btn
                >
              </v-form>
            </v-window-item>

            <v-window-item value="orders">
              <v-list>
                <v-list-item v-for="order in orders" :key="order.id">
                  <v-list-item-title>Order #{{ order.id }}</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ order.date }} - {{ order.status }}</v-list-item-subtitle
                  >
                  <template v-slot:append>
                    <span class="font-weight-bold">${{ order.total }}</span>
                  </template>
                </v-list-item>
              </v-list>
            </v-window-item>

            <v-window-item value="settings">
              <v-list>
                <v-list-item title="Change Password" prepend-icon="mdi-lock" />
                <v-list-item title="Notifications" prepend-icon="mdi-bell" />
                <v-list-item
                  title="Delete Account"
                  prepend-icon="mdi-delete"
                  color="error"
                />
              </v-list>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/plugins/sweetalert";

const authStore = useAuthStore();
const tab = ref("profile");

const profile = ref({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  phone: "",
});

const orders = ref([
  { id: "1001", date: "2024-01-15", status: "Delivered", total: "129.99" },
  { id: "1002", date: "2024-02-20", status: "Shipped", total: "79.50" },
]);

const updateProfile = () => {
  toast.fire({ icon: "success", title: "Profile updated!" });
};
</script>
