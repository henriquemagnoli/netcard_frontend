<template>
  <suspense timeout="0" >
      <template #default>
          <component :is="layout">
              <router-view />
          </component>
      </template>
      <template #fallback>
          <Preloader />
      </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import Preloader from './components/Preloader.vue';

export default defineComponent({
  setup(){
      // Returns the route object
      const route = useRoute();

      const layout = computed(() => {
          const layout = route?.meta?.layout;

          if (layout) { return `${layout}-layout`; }
          
          return 'div';
      })

      return { layout };
  },
  components:{
      Preloader
  }
})

</script>