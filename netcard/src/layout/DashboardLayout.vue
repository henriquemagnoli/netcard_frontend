<template>
    <div class="min-h-full bg-base-200">
        <Navbar />
        <header class="bg-white shadow">
            <div class="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
                <h1 class="text-2xl font-bold tracking-tight text-cyan-4000">{{ dashboardTitle }}</h1>

                <div class="form-control">
                    <label class="label cursor-pointer p-0 gap-2">
                        <span class="label-text">Vísivel</span>
                        <input type="checkbox" class="toggle toggle-success" />
                    </label>
                </div>
            </div>
        </header>
        <main>
            <!-- <div class="mx-auto max-w-full py-6 sm:px-6 lg:px-8 ">  
                <slot></slot>
            </div> -->
            <slot></slot>
        </main>
    </div> 
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
    setup(){
        const dashboardTitle = ref("")

        return { dashboardTitle }
    },
    beforeMount(){
        this.dashboardTitle = String(useRoute().name);
    },
    components:{
        Navbar
    }
})

</script>