<
<template>
  <v-list-item class="px-0 py-4">
    <template v-slot:prepend>
      <v-avatar rounded size="80" class="mr-4">
        <v-img :src="item.image || 'https://via.placeholder.com/80'" cover />
      </v-avatar>
    </template>

    <v-list-item-title class="font-weight-bold text-wrap">
      {{ item.name }}
    </v-list-item-title>

    <v-list-item-subtitle class="mt-1">
      <span class="text-primary font-weight-bold"
        >${{ formatPrice(item.price) }}</span
      >
      <span class="text-grey ml-2">x {{ item.quantity }}</span>
    </v-list-item-subtitle>

    <template v-slot:append>
      <div class="d-flex align-center">
        <v-btn
          icon="mdi-minus"
          size="x-small"
          variant="outlined"
          @click="updateQuantity(item.quantity - 1)"
        />
        <span
          class="mx-3 font-weight-bold"
          style="min-width: 24px; text-align: center"
        >
          {{ item.quantity }}
        </span>
        <v-btn
          icon="mdi-plus"
          size="x-small"
          variant="outlined"
          @click="updateQuantity(item.quantity + 1)"
        />
        <v-btn
          icon="mdi-delete"
          size="x-small"
          color="error"
          variant="text"
          class="ml-4"
          @click="removeItem"
        />
      </div>
    </template>
  </v-list-item>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

const formatPrice = (price) => Number(price).toFixed(2);

const updateQuantity = (qty) => {
  cartStore.updateQuantity(props.item.id, qty);
};

const removeItem = () => {
  cartStore.removeFromCart(props.item.id);
};
</script>
