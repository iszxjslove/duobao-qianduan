<template>
  <q-page class="bg-grey-2 q-pt-md">
    <q-list separator class="bg-white">
      <q-item clickable v-ripple to="/page/modify/nickname">
        <q-item-section>{{ $t("risk_disclosure_agreement") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/modify/loginpass">
        <q-item-section>{{ $t("app_statement") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/modify/paymentpass">
        <q-item-section>{{ $t("about_us") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "AboutPage"
};
</script>
