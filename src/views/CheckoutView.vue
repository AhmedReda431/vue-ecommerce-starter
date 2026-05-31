<
<template>
  <v-container class="py-8">
    <h1 class="text-h4 font-weight-bold mb-6">Checkout</h1>

    <v-row>
      <v-col cols="12" lg="8">
        <v-stepper v-model="step" class="mb-6">
          <v-stepper-header>
            <v-stepper-item value="1" title="Shipping" />
            <v-divider />
            <v-stepper-item value="2" title="Payment" />
            <v-divider />
            <v-stepper-item value="3" title="Review" />
          </v-stepper-header>

          <v-stepper-window>
            <!-- Step 1: Shipping -->
            <v-stepper-window-item value="1">
              <v-card class="pa-4">
                <h3 class="text-h6 font-weight-bold mb-4">
                  Shipping Information
                </h3>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="shipping.firstName"
                      label="First Name"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="shipping.lastName"
                      label="Last Name"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="shipping.address"
                      label="Address"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="shipping.city"
                      label="City"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="shipping.postalCode"
                      label="Postal Code"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="shipping.phone"
                      label="Phone Number"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
                <div class="d-flex justify-end mt-4">
                  <v-btn color="primary" @click="step = 2"
                    >Continue to Payment</v-btn
                  >
                </div>
              </v-card>
            </v-stepper-window-item>

            <!-- Step 2: Payment -->
            <v-stepper-window-item value="2">
              <v-card class="pa-4">
                <h3 class="text-h6 font-weight-bold mb-4">Payment Method</h3>
                <v-radio-group v-model="payment.method">
                  <v-radio label="Credit Card" value="card" />
                  <v-radio label="PayPal" value="paypal" />
                  <v-radio label="Cash on Delivery" value="cod" />
                </v-radio-group>

                <template v-if="payment.method === 'card'">
                  <v-text-field
                    v-model="payment.cardNumber"
                    label="Card Number"
                    variant="outlined"
                    class="mb-2"
                  />
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="payment.expiry"
                        label="MM/YY"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="payment.cvv"
                        label="CVV"
                        variant="outlined"
                        type="password"
                      />
                    </v-col>
                  </v-row>
                </template>

                <div class="d-flex justify-space-between mt-4">
                  <v-btn variant="text" @click="step = 1">Back</v-btn>
                  <v-btn color="primary" @click="step = 3">Review Order</v-btn>
                </div>
              </v-card>
            </v-stepper-window-item>

            <!-- Step 3: Review -->
            <v-stepper-window-item value="3">
              <v-card class="pa-4">
                <h3 class="text-h6 font-weight-bold mb-4">Order Review</h3>

                <v-list>
                  <v-list-item v-for="item in cartStore.items" :key="item.id">
                    <template v-slot:prepend>
                      <v-avatar rounded>
                        <v-img :src="item.image" />
                      </v-avatar>
                    </template>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Qty: {{ item.quantity }} x ${{
                        item.price
                      }}</v-list-item-subtitle
                    >
                    <template v-slot:append>
                      <span class="font-weight-bold"
                        >${{ (item.quantity * item.price).toFixed(2) }}</span
                      >
                    </template>
                  </v-list-item>
                </v-list>

                <v-divider class="my-4" />

                <div
                  class="d-flex justify-space-between text-h6 font-weight-bold"
                >
                  <span>Total</span>
                  <span class="text-primary">${{ total.toFixed(2) }}</span>
                </div>

                <div class="d-flex justify-space-between mt-6">
                  <v-btn variant="text" @click="step = 2">Back</v-btn>
                  <v-btn
                    color="success"
                    size="large"
                    :loading="processing"
                    @click="placeOrder"
                  >
                    Place Order
                  </v-btn>
                </div>
              </v-card>
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="pa-4 sticky-sidebar">
          <h3 class="text-h6 font-weight-bold mb-4">Order Summary</h3>
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="d-flex justify-space-between mb-2"
          >
            <span class="text-body-2"
              >{{ item.name }} (x{{ item.quantity }})</span
            >
            <span class="font-weight-bold"
              >${{ (item.price * item.quantity).toFixed(2) }}</span
            >
          </div>
          <v-divider class="my-4" />
          <div class="d-flex justify-space-between text-h6 font-weight-bold">
            <span>Total</span>
            <span class="text-primary">${{ total.toFixed(2) }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import Swal from "sweetalert2";

const router = useRouter();
const cartStore = useCartStore();

const step = ref(1);
const processing = ref(false);

const shipping = ref({
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  phone: "",
});

const payment = ref({
  method: "card",
  cardNumber: "",
  expiry: "",
  cvv: "",
});

const total = computed(() => {
  const subtotal = cartStore.totalPrice;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5;
  return subtotal + tax + shipping;
});

const placeOrder = async () => {
  processing.value = true;
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text: "Thank you for your purchase.",
    confirmButtonText: "Continue Shopping",
  }).then(() => {
    cartStore.clearCart();
    router.push("/");
  });
};
</script>
