<template>
    <div class="space-y-2 p-5 md:p-0">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title"><FunnelIcon class="w-5 h-5" /> Filtro</h2>
                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                    <div class="col-span-12 md:col-span-3">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Nome</span>
                            </div>
                            <input type="text" placeholder="Digite o nome que deseja pesquisar..." class="input input-sm input-bordered w-full" />
                        </label>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Profissão</span>
                            </div>
                            <select class="select select-sm select-bordered w-full"></select>
                        </label>
                    </div>
                    <div class="col-span-12 md:col-span-2">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Sexo</span>
                            </div>
                            <select class="select select-sm select-bordered w-full">
                                <option disabled selected>Masculino</option>
                                <option>Feminino</option>
                                <option>Outros</option>
                            </select>
                        </label>
                    </div>
                    <div class="col-span-12 md:col-span-2">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Estado</span>
                            </div>
                            <select class="select select-sm select-bordered w-full"></select>
                        </label>
                    </div>
                    <div class="col-span-12 md:col-span-2">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Cidade</span>
                            </div>
                            <select class="select select-sm select-bordered w-full"></select>
                        </label>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-sm btn-primary"><MagnifyingGlassIcon class="w-5 h-5" /> Pesquisar</button>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 max-w-72 shadow-xl">
            <div class="card-body p-4">
                <div class="rounded-full w-10 h-10 bg-gray-400"></div>
                <p class="font-bold">Jane Doe, 21</p>
                <div class="flex h-full items-center">
                    <p>Engenharia de Software</p>
                    <div class="card-actions">
                        <button @click="modalState" class="btn btn-sm btn-primary w-10 h-10"><EyeIcon class="w-5 h-5" /></button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    
    <div v-if="show_modal">
        <ConnectionModal :show_modal="show_modal" :connection_id="connection_id" @closeModal="modalState" />
    </div>
    
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon } from '@heroicons/vue/24/outline';
import ConnectionModal from '../components/ConnectionModal.vue';

export default defineComponent({
    setup(){
        const show_modal = ref(false);
        const connection_id = ref(1);

        return{
            show_modal,
            connection_id
        }
    },
    methods:{
        modalState()
        {
            this.show_modal = !this.show_modal;
        }
    },
    components: {
        ConnectionModal,
        MagnifyingGlassIcon,
        FunnelIcon,
        EyeIcon
    }
})

</script>