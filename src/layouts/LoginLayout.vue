<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar class="bg-white q-pt-xl q-pb-md">
        <q-tabs
          v-model="tab"
          align="center"
          active-color="primary"
          class="text-grey full-width"
          indicator-color="transparent"
          dense
          no-caps
          :breakpoint="0"
        >
          <q-route-tab to="/login" name="login">
            <div class="text-h6">Sign in</div>
          </q-route-tab>
          <q-separator vertical inset />
          <q-route-tab to="/register" name="register">
            <div class="text-h6">Register</div>
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginLayout",
  data() {
    return {
      tab: "login"
    };
  }
};
</script>
