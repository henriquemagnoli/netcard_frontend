<template>
    <dialog class="modal" :class="{'modal-open': show_modal}" >
        <div class="modal-box max-w-3xl">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
            <h3 class="font-bold text-lg flex items-center gap-3 text-aflablue-400 mb-10"><EyeIcon class="w-5 h-5"/> Visualização de Conexão </h3>
            
            <div class="space-y-5">
                <div class="rounded-full bg-gray-400 w-32 h-32"></div>

                <div class="font-bold">
                    <p class="text-xl">Jane Doe, 21</p>
                    <p class="text-sm">Engenheiro de Software</p>
                </div>
                
                        
                <div>
                    <p class="font-semibold">Biografia</p>
                    <p class="text-sm">Sed convallis maximus nunc et tincidunt. Aliquam accumsan justo a nunc feugiat, non sagittis ex fermentum. Duis lacinia imperdiet arcu in ornare. In ex tellus, lacinia sit amet nulla vel, porttitor dictum purus.</p>
                </div>

                <div>
                    <p class="font-semibold">Contatos:</p>
                    <p>Telefone: 12345-1235</p>
                    <p>E-mail: janedoe@hotmail.com</p>
                </div>

                <div>
                    <p class="font-semibold">Redes Sociais</p>
                </div>            
            </div>

            <div class="modal-action">
                <button class="btn btn-sm btn-neutral" @click="closeModal">Fechar</button>
            </div>
        </div>    
    </dialog> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EyeIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
    props:{
        connection_id: Number,
        show_modal: Boolean
    },
    methods:{
        closeModal()
        {
            this.$emit('closeModal');
        }
    },
    components:{
        EyeIcon
    }
})

</script>