<template>
    <div class="bottom-0">
        <p class="text-center text-sm text-gray-400">© {{ current_date }} - Todos os direitos reservados.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup(){

        let current_date: Number;

        current_date = new Date().getFullYear();

        return{
            current_date
        }
    }
})

</script>