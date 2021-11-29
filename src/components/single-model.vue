<template>
  <div class="single-model" :class="`single-model-${name}`">
    <div v-if="loading" class="single-model-loading">
      <slot name="loading"></slot>
    </div>
    <div v-else-if="error" class="single-model-error">
      <p v-if="notFound">{{ notFoundMessage }}</p>
      <p v-else-if="forbidden">{{ forbiddenMessage }}</p>
      <p v-else>{{ errorMessage }}</p>
    </div>
    <slot v-else :model="model"></slot>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Manager from "../index";
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    param: {
      type: String,
      default: "id",
    },
    notFoundMessage: {
      type: String,
      default: "Record not found",
    },
    forbiddenMessage: {
      type: String,
      default: "Access is forbidden",
    },
  },
  data() {
    return {
      loading: true,
      model: {},
      notFound: false,
      forbidden: false,
      error: false,
      errorMessage: "",
    };
  },
  computed: {
    id() {
      return this.$route.params[this.param];
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.loading = true;
      (this.$mm as Manager)
        .new(this.name, { id: this.id })
        .fetch()
        .then(
          (m) => {
            this.model = m;
          },
          (err) => {
            this.error = true;
            const status = err.response?.status;
            switch (status) {
              case 403:
                this.forbidden = true;
                break;
              case 404:
                this.notFound = true;
                break;
            }
            this.errorMessage = err.response?.message;
          }
        )
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>