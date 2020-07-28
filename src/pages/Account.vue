<template>
  <q-page class="bg-grey-2 q-pt-md">
    <q-list separator class="bg-white">
      <q-item clickable v-ripple to="/page/modify/nickname">
        <q-item-section>{{ $t("modify_the_name") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/modify/loginpass">
        <q-item-section>{{ $t("modify_login_pass") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/modify/paymentpass">
        <q-item-section>{{ $t("modify_payment_password") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "vueName"
};
</script>
