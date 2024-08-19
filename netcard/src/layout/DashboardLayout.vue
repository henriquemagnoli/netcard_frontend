<template>
    <div class="min-h-full">
        <h1>Main</h1>
        <slot></slot> 
    </div> 
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    setup(){
        const dashboardTitle = ref("")

        return { dashboardTitle }
    },
    beforeMount(){
        this.dashboardTitle = String(useRoute().name);
    }
})

</script>