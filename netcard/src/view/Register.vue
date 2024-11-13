<template>
<div class="grid md:grid-cols-12 lg:grid-cols-12 h-screen">
        <div class="bg-gradient-to-r from-cyan-500 to-blue-500 hidden md:block col-span-8">
            <div class="flex h-screen items-center justify-center">
                <img src="./../assets/images/netcard_log.png">
            </div>
        </div>
        <div class="div-form col-span-4 flex items-center"> 
            <div class="max-w-xl mx-auto px-10 md:px-10 py-5 md:py-0 space-y-20">
                <div class="form-header">
                    <div class="flex justify-between">
                        <p class="font-bold tracking-widest text-3xl text-cyan-500">netcard</p>
                        <p class="text-sm font-semibold">PT</p>      
                    </div>           
                </div>
                <div class="form-body">
                    <h1 class="text-3xl font-bold">Cadastrar uma nova conta</h1>
                    <p class="text-gray-400">Preencha o formulário a baixo para criar uma nova conta.</p>
                    
                    <form id="register">
                        <div class="space-y-5 pt-5">
                            <div v-if="page == 1">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Nome</span>
                                    </div>
                                    <input v-model="name" type="text" class='input input-sm input-bordered w-full'>
                                </label>

                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><EnvelopeIcon class="w-4 h-4 mr-2" />E-mail</span>
                                    </div>
                                    <input v-model="email" type="email" class='input input-bordered input-sm w-full'>
                                </label>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />CPF</span>
                                            </div>
                                            <input v-model="cpf" maxlength="11" type="text" class='input input-bordered input-sm w-full'>
                                        </label>
                                    </div>
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><CalendarDaysIcon class="w-4 h-4 mr-2" />Data de Nascimento</span>
                                            </div>
                                            <input v-model="birthDate" type="date" class='input input-bordered input-sm w-full'>
                                        </label>
                                    </div>                          
                                </div>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-12">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Sexo</span>
                                            </div>
                                            <select v-model="sex" class="select select-bordered w-full select-sm">
                                                <option value="M" >Masculino</option>
                                                <option value="F" >Feminino</option>
                                                <option value="O">Outros</option>
                                            </select>
                                        </label>
                                    </div>      
                                    <!-- <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><PhotoIcon class="w-4 h-4 mr-2" />Foto de Perfil</span>
                                            </div>
                                            <input type="file" class="file-input file-input-sm file-input-bordered w-full max-w-xs" />
                                        </label>
                                    </div>                              -->
                                </div>

                                <div class="flex justify-end">
                                    <button v-on:click="changePages(2)" type="submit" class="btn bg-cyan-500 h-10 rounded-md hover:bg-cyan-700 text-white text-sm mt-2"><ChevronRightIcon class="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div v-if="page == 2">
                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />CEP</span>
                                            </div>
                                            <input v-model="zipCode" maxlength="8" type="text" class='input input-bordered input-sm w-full'>
                                        </label>
                                    </div>   
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Estado</span>
                                            </div>

                                            <span v-if="isLoadingStates == false">
                                                <select v-model="state" v-on:change="listCities" class="select select-bordered select-sm w-full">
                                                    <option v-for="state in states" :key="state.Id" :value="state.Id">{{ state.Name }}</option>
                                                </select>
                                            </span>
                                            
                                            <span v-if="isLoadingStates == true">
                                                <div class="skeleton select-sm w-full"></div>
                                            </span>
                                        </label>
                                    </div> 
                                </div>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><BuildingOffice2Icon class="w-4 h-4 mr-2" />Cidade</span>
                                            </div>

                                            <span v-if="isLoadingCities == false">
                                                <select v-model="city" class="select select-bordered select-sm w-full">
                                                    <option v-for="city in cities" :key="city.Id" :value="city.Id">{{ city.Name }}</option>
                                                </select>
                                            </span>

                                            <span v-if="isLoadingCities == true">
                                                <div class="skeleton select-sm w-full"></div>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Endereço</span>
                                            </div>
                                            <input v-model="street" type="text" class='input input-bordered input-sm w-full'>
                                        </label>
                                    </div>
                                </div>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Bairro</span>
                                            </div>
                                            <input v-model="district" type="text" class='input input-bordered input-sm w-full'>
                                        </label>
                                    </div>
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Número</span>
                                            </div>
                                            <input v-model="streetNumber" type="text" class='input input-bordered input-sm w-full'>
                                        </label>
                                    </div>
                                </div>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Complemento</span>
                                            </div>
                                            <input v-model="streetComplement" type="text" class='input input-bordered input-sm w-full'>
                                        </label>
                                    </div>
                                </div>

                                <div class="flex justify-between">
                                    <button v-on:click="changePages(1)" type="submit" class="btn bg-cyan-500 h-10 rounded-md hover:bg-cyan-700 text-white text-sm mt-2"><ChevronLeftIcon class="w-4 h-4" /></button>
                                    <button v-on:click="changePages(3)" type="submit" class="btn bg-cyan-500 h-10 rounded-md hover:bg-cyan-700 text-white text-sm mt-2"><ChevronRightIcon class="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div v-if="page == 3">
                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><BriefcaseIcon class="w-4 h-4 mr-2" />Profissão</span>
                                            </div>

                                            <span v-if="isLoadingJobs == false">
                                                <select v-model="job" class="select select-bordered select-sm w-full">
                                                    <option v-for="job in jobs" :key="job.Id" :value="job.Id">{{ job.Name }}</option>
                                                </select>
                                            </span>

                                            <span v-if="isLoadingJobs == true">
                                                <div class="skeleton select-sm w-full"></div>
                                            </span> 
                                        </label>
                                    </div>
                                </div>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><KeyIcon class="w-4 h-4 mr-2" />Senha</span>
                                            </div>
                                            <label class='input input-bordered flex items-center input-sm w-full'>
                                                <input v-model="password" :type="input_password_type" class="grow">
                                                <span v-on:click="showPassword" class="cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
                                                    <EyeSlashIcon v-if="!input_password_icon" class="w-4 h-4" />
                                                    <EyeIcon v-if="input_password_icon" class="w-4 h-4" />
                                                </span>
                                            </label>  
                                        </label>
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><KeyIcon class="w-4 h-4 mr-2" />Confirmar Senha</span>
                                            </div>
                                            <label class='input input-bordered flex items-center input-sm w-full'>
                                                <input v-model="confirmPassword" :type="input_password_type" class="grow">
                                                <span v-on:click="showPassword" class="cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
                                                    <EyeSlashIcon v-if="!input_password_icon" class="w-4 h-4" />
                                                    <EyeIcon v-if="input_password_icon" class="w-4 h-4" />
                                                </span>
                                            </label>  
                                        </label>
                                    </div>
                                </div>
                               
                                <button @click="setUser" type="button" class="btn bg-cyan-500 w-full h-10 rounded-md hover:bg-cyan-700 text-white text-sm mt-2">Cadastrar</button>
                                <button v-on:click="changePages(2)" type="submit" class="btn bg-cyan-500 h-10 rounded-md hover:bg-cyan-700 text-white text-sm mt-2"><ChevronLeftIcon class="w-4 h-4" /></button>
                            </div>
                             
                            <div class="justify-center flex text-sm gap-1">
                                <p>Já possuí uma conta? </p><a href="login" class="underline text-cyan-700">Voltar ao login.</a>
                            </div>  
                        </div>
                    </form>                
                </div>
                <div class="form-footer">
                    <Footer></Footer>
                </div> 
            </div>       
        </div>      
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { ILoginState, signUp } from '../hooks/useAuth';
import { IStatesState, getAllStates } from '../hooks/useStates';
import { ICitiesState, getAllCitiesBasedOnStateId } from '../hooks/useCities';
import { IJobsState, getAllJobs } from '../hooks/useJobs';
import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon, DocumentTextIcon, CalendarDaysIcon, ChevronRightIcon, ChevronLeftIcon, UserIcon, PhotoIcon, BuildingOffice2Icon, BriefcaseIcon } from '@heroicons/vue/24/outline';
import Footer from '../components/Footer.vue';
import Swal from 'sweetalert2';
import router from '../router';

export default defineComponent({
    setup(){

        // Interface variables
        const loginState: ILoginState = reactive({
            isLoading: false,
            messages: '',
            statusCode: 0
        });

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
        
        const jobsState: IJobsState = reactive({
            isLoadingJobs: false,
            messagesJobs: '',
            statusCodeJobs: 0
        });

        // Helper variables
        const page = ref(1);
        const input_password_icon = ref(false);
        const input_password_type = ref('password');
        
        // User varibables
        const name = ref('');
        const email = ref('');
        const cpf = ref('');
        const birthDate = ref('');
        const sex = ref('M');
        const profilePicture = ref('');
        const zipCode = ref('');
        const state = ref('');
        const city = ref('');
        const street = ref('');
        const district = ref('');
        const streetNumber = ref('');
        const streetComplement = ref('');
        const job = ref('');
        const password = ref('');
        const confirmPassword = ref('');

        // Objects variables
        const states = ref();
        const cities = ref();
        const jobs = ref();

        return{
            ...toRefs(loginState),
            ...toRefs(statesState),
            ...toRefs(citiesState),
            ...toRefs(jobsState),
            page,
            input_password_icon,
            input_password_type,
            name,
            email,
            cpf,
            birthDate,
            sex,
            profilePicture,
            zipCode,
            state,
            city,
            street,
            district,
            streetNumber,
            streetComplement,
            job,
            password,
            confirmPassword,
            states,
            cities,
            jobs
        }
    },
    methods:{
        changePages(page: number)
        {
            this.page = page;
        },
        showPassword()
        {
            if(this.input_password_type == 'password')
            {
                this.input_password_type = 'text';
                this.input_password_icon = true;
                
            }
            else if(this.input_password_type == 'text')
            {
                this.input_password_type = 'password';
                this.input_password_icon = false;
            }
        },
        async setUser()
        {
            if(!this.validateFields())
                return;

            // Missing just state
            const userObject = ({
                name: this.name,
                password: this.password,
                email: this.email,
                cpf: this.cpf,
                profilePicture: 'teste',
                sex: this.sex,
                birthDate: this.birthDate,
                address: {
                    street: this.street,
                    streetNumber: this.streetNumber,
                    cityId: this.city,
                    streetComplement: this.streetComplement,
                    district: this.district,
                    zipCode: this.zipCode
                },
                jobId: this.job
            });

            const response: any = await signUp(userObject);

            if(response.value['statusCode'] == 200)
                Swal.fire({ icon: 'success', title: 'Scuesso', text: 'Sua conta foi criada.' }).then(() => router.push('/'));
            else
                Swal.fire({ icon: 'error', title: 'Erro', text: response.value['messages'] });
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
        },
        validateFields()
        {
            if(this.name == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo nome deve ser preenchido.' });
                return false;
            } 

            if(this.email == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo email deve ser preenchido.' });
                return false;
            } 

            if(this.cpf == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo cpf deve ser preenchido.' });
                return false;
            } 

            if(this.birthDate == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo data de nascimento deve ser preenchido.' });
                return false;
            } 

            if(this.sex == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo sexo deve ser preenchido.' });
                return false;
            } 

            if(this.zipCode == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo cep deve ser preenchido.' });
                return false;
            } 

            if(this.states == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O estado deve ser selecionado.' });
                return false;
            } 

            if(this.city == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'A cidade deve ser selecionada.' });
                return false;
            } 

            if(this.street == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo endereço deve ser preenchido.' });
                return false;
            }

            if(this.district == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo bairro deve ser preenchido.' });
                return false;
            } 

            if(this.streetNumber == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo número deve ser preenchido.' });
                return false;
            } 

            if(this.job == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'A profissão deve ser selecionada.' });
                return false;
            } 

            if(this.password == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo senha deve ser preenchido.' });
                return false;
            } 

            if(this.confirmPassword == '')
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'O campo confirmar senha deve ser preenchido.' });
                return false;
            } 

            if(this.password != this.confirmPassword)
            {   
                Swal.fire({ icon: 'error', title: 'Erro', text: 'As senhas devem ser iguais.' });
                return false;
            } 

            return true;
        }
    },
    async beforeMount() {
        await this.listStates();
        await this.listJobs();
    },
    components:{
        Footer,
        EnvelopeIcon,
        KeyIcon,
        EyeIcon,
        EyeSlashIcon,
        DocumentTextIcon,
        CalendarDaysIcon,
        ChevronRightIcon,
        ChevronLeftIcon,
        UserIcon,
        PhotoIcon,
        BuildingOffice2Icon,
        BriefcaseIcon
    }
})
</script>