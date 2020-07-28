<template>
  <q-infinite-scroll @load="onLoadId" :offset="250">
    <div class="bg-grey-2 text-grey-8">
      <q-item>
        <q-item-section
          :style="'width:' + 100 / columns.length + '%'"
          :class="col.align | align"
          v-for="(col, i) in columns"
          :key="'header-' + i"
        >
          {{ col.title }}
        </q-item-section>
      </q-item>
    </div>
    <q-list separator class="text-body2">
      <q-item v-for="(item, index) in list" :key="index">
        <q-item-section
          :style="'width:' + 100 / columns.length + '%'"
          v-for="(col, i) in columns"
          :key="index + '-' + i"
          :class="col.align | align"
        >
          <slot
            v-if="typeof col.formatter === 'function'"
            :name="'body-cell-' + col.field"
            :value="item[col.field]"
            :row="item"
          >
            {{ col.formatter(item[col.field], item, i) }}
          </slot>
          <slot
            v-else
            :name="'body-cell-' + col.field"
            :value="item[col.field]"
            :row="item"
          >
            {{ item[col.field] }}
          </slot>
        </q-item-section>
      </q-item>
    </q-list>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
export default {
  name: "InfiniteScroll",
  filters: {
    align: function(value) {
      return value ? "text-" + value : "text-center";
    }
  },
  props: {
    api: {
      type: Function,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: String,
      default: "rows"
    }
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    onLoadId(index, done) {
      this.api(index, 20).then(ret => {
        let list = [];
        if (this.rows) {
          list = ret[this.rows];
        } else {
          list = ret;
        }
        list.map(v => {
          this.list.push(v);
        });
        done();
      });
    }
  }
};
</script>
