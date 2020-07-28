<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-center">{{ $t("no_card") }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-item>
      <q-btn
        class="full-width"
        color="primary"
        size="lg"
        unelevated
        icon="add"
        :label="$t('new_bank_card')"
      />
    </q-item>
  </q-page>
</template>

<script>
export default {
  name: "BankPage"
};
</script>
