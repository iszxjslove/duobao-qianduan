<template>
  <q-tabs v-model="tab" inline-label class="bg-purple text-white shadow-2">
    <q-tab name="login" label="Sign in" />
    <q-tab name="register" label="Register" />
  </q-tabs>
</template>

<script>
export default {
  name: "LoginAndRegisterComponent",
  data() {
    return {
      tab: "login"
    };
  }
};
</script>
