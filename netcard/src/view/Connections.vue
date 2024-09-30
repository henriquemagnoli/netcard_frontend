<template>
    <div class="h-[calc(100vh-144px)] mx-auto max-w-full py-6 sm:px-6 lg:px-8 ">

        <div class="text-sm breadcrumbs mx-5 md:mx-0">
            <ul>
                <li><a href="/dashboard">Painel</a></li> 
                <li>Conexões</li> 
            </ul>
        </div>
        
        <div class="space-y-2 p-5 md:p-0">
            <div class="collapse collapse-arrow bg-base-100 max-w-full shadow-md p-4">
                <input type="checkbox" :checked="open_filter" />
                <div class="collapse-title text-xl font-medium"><h2 class="card-title"><FunnelIcon class="h-5 w-5" /> Filtro</h2></div>
                <div class="collapse-content">
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

                                <span v-if="isLoadingJobs == false">
                                    <select v-model="job" class="select select-bordered select-sm w-full">
                                        <option value="">(Todas)</option>
                                        <option v-for="job in jobs" :key="job.Id" :value="job.Id">{{ job.Name }}</option>
                                    </select>
                                </span>

                                <span v-if="isLoadingJobs == true">
                                    <div class="skeleton select-sm w-full"></div>
                                </span> 
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

                                <span v-if="isLoadingStates == false">
                                    <select v-model="state" v-on:change="listCities" class="select select-sm select-bordered w-full">
                                        <option value="">(Todos)</option>
                                        <option v-for="state in states" :key="state.Id" :value="state.Id">{{ state.Name }}</option>
                                    </select>
                                </span>

                                <span v-if="isLoadingStates == true">
                                    <div class="skeleton select-sm w-full"></div>
                                </span>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-2">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">Cidade</span>
                                </div>

                                <span v-if="isLoadingCities == false">
                                    <select v-model="city" class="select select-bordered select-sm w-full" >
                                        <option v-for="city in cities" :key="city.Id" :value="city.Id">{{ city.Name }}</option>
                                    </select>
                                </span>

                                <span v-if="isLoadingCities == true">
                                    <div class="skeleton select-sm w-full"></div>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 max-w-full shadow-md">
                <div class="card-body p-5">
                    <div class="card-actions">
                        <button class="btn btn-sm bg-cyan-400 hover:bg-cyan-600 text-white"><MagnifyingGlassIcon class="w-5 h-5" /> Pesquisar</button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 max-w-72 shadow-xl">
                <div class="card-body p-4">
                    <div class="rounded-full w-10 h-10 bg-gray-400"></div>
                    <p class="font-bold">Jane Doe, 21</p>
                    <p class="text-sm">Engenharia de Software</p>
                    <div class="flex h-full items-center justify-end">
                        <div class="card-actions">
                            <button @click="modalState" class="btn btn-sm bg-cyan-400 hover:bg-cyan-600"><EyeIcon class="w-5 h-5 text-white" /></button>
                            <button @click="deleteConection" class="btn btn-sm btn-error"><TrashIcon class="w-5 h-5 text-white" /></button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <div v-if="show_modal">
            <ConnectionModal :show_modal="show_modal" :connection_id="connection_id" @closeModal="modalState" />
        </div> 
    </div>   
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { IStatesState, getAllStates } from '../hooks/useStates';
import { ICitiesState, getAllCitiesBasedOnStateId } from '../hooks/useCities';
import { IJobsState, getAllJobs } from '../hooks/useJobs';
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon, TrashIcon } from '@heroicons/vue/24/outline';
import ConnectionModal from '../components/ConnectionModal.vue';
import Swal from 'sweetalert2';


export default defineComponent({
    setup(){

        const statesState: IStatesState = reactive({
            isLoadingStates: false,
            messagesStates: '',
            statusCodeStates: 0
        });

        const citiesState: ICitiesState = reactive({
            isLoadingCities: false,
            messagesCities: '',
            statusCodeCities: 0
        });

        const jobsState : IJobsState = reactive({
            isLoadingJobs: false,
            messagesJobs: '',
            statusCodeJobs: 0
        });

        const show_modal = ref(false);
        const connection_id = ref(1);
        const open_filter = ref(false);

        const city = ref('');
        const state = ref('');
        const job = ref('');

        // Object variables
        const cities = ref();
        const states = ref();
        const jobs = ref();

        return{
            ...toRefs(statesState),
            ...toRefs(citiesState),
            ...toRefs(jobsState),
            show_modal,
            connection_id,
            open_filter,
            city,
            state,
            job,
            cities,
            states,
            jobs
        }
    },
    methods:{
        modalState()
        {
            this.show_modal = !this.show_modal;
        },
        async deleteConection()
        {
            Swal.fire({
                title: 'Atenção',
                text: 'Deseja romper conexão com o usuário?',
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
                allowOutsideClick: false
            }).then(async (result) => {

                if(result.isConfirmed)
                {
                    Swal.fire({ icon: 'success', title: 'Sucesso', text: 'Conexão com o usuário rompida.'});
                }
            })
        },
        async listStates()
        {
            this.isLoadingStates = true;

            const response: any = await getAllStates();

            if(response.value['statusCode'] == 200)
                this.states = response.value['data'];
            else
                Swal.fire({ icon: 'error', title: 'Erro', text: response.value['messages'] });
        
            this.isLoadingStates = false;
        },
        async listCities()
        {
            if(this.state == "")
                return;

            this.isLoadingCities = true;

            const response: any = await getAllCitiesBasedOnStateId(Number(this.state));

            if(response.value['statusCode'] == 200)
                this.cities = response.value['data'];
            else 
                Swal.fire({ icon: 'error', title: 'Erro', text: response.value['messages']});

            this.isLoadingCities = false;
        },
        async listJobs()
        {
            this.isLoadingJobs = true;

            const response: any = await getAllJobs();

            if(response.value['statusCode'] == 200)
                this.jobs = response.value['data'];
            else
                Swal.fire({ icon: 'error', title: 'Erro', text: response.value['messages']});
            
            this.isLoadingJobs = false;
        }
    },
    async beforeMount() {
        await this.listJobs();
        await this.listStates();
    },
    components: {
        ConnectionModal,
        MagnifyingGlassIcon,
        FunnelIcon,
        EyeIcon,
        TrashIcon
    }
})

</script>