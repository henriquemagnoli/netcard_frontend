<template>

    <div class="h-screen md:h-[calc(100vh-144px)] mx-auto max-w-full py-6 sm:px-6 lg:px-8 ">
        <div class="p-5 md:p-0">
            <div v-if="isLoadingUser">
                <div class="text-center">
                    <p class="text-md font-semibold mt-10">Carregando informações ... <span class="loading loading-spinner loading-sm"></span></p>
                </div>
            </div>

            <div v-if="!isLoadingUser">
                <div role="tablist" class="tabs tabs-bordered">
                    <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Dados" checked />
                    <div role="tabpanel" class="tab-content p-5">
                        <div class="grid grid-cols-12">
                            <div class="col-span-12">
                                <div class="flex">
                                    <div class="avatar">
                                        <div class="w-32 h-32 md:w-44 md:h-44 ring-cyan-500 ring-offset-base-100 rounded-full ring ring-offset-2">
                                            <img :src="profilePicture" alt="" />
                                        </div>
                                    </div>
                                    <div class="flex items-center ml-5">
                                        <div class="flex-col">
                                            <p class="text-lg font-semibold">{{ name }}, {{ birthDate }}</p>
                                            <p class="text-sm">{{ jobName }}</p>
                                            <input type="file" @change="getFile" class="file-input file-input-bordered file-input-sm w-full max-w-xs mt-5" />
                                        </div> 
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="grid grid-cols-12 mt-5 gap-0 md:gap-5">
                            <div class="col-span-12 md:col-span-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Nome</span>
                                    </div>
                                    <input v-model="name" type="text" class='input input-bordered input-sm w-full'>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><EnvelopeIcon class="w-4 h-4 mr-2" />E-mail</span>
                                    </div>
                                    <input v-model="email" type="text" class='input input-bordered input-sm w-full disabled:bg-slate-50 disabled:input-bordered' disabled>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />CPF</span>
                                    </div>
                                    <input v-model="cpf" type="text" class='input input-bordered input-sm w-full disabled:bg-slate-50 disabled:input-bordered' disabled>
                                </label>
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-0 md:gap-5">
                            <div class="col-span-12 md:col-span-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><UserGroupIcon class="w-4 h-4 mr-2" />Gênero</span>
                                    </div>
                                    <select v-model="sex" class="select select-bordered select-sm w-full">
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                        <option value="O">Outros</option>
                                    </select>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BriefcaseIcon class="w-4 h-4 mr-2" />Profissão</span>
                                    </div>
                                    <select v-model="jobId" class="select select-bordered select-sm w-full">
                                        <option v-for="job in jobs" :key="job.Id" :value="job.Id">{{ job.Name }}</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <div class="col-span-12">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><DocumentDuplicateIcon class="w-4 h-4 mr-2" />Biografia</span>
                                    </div>
                                    <textarea v-model="biography" class="textarea textarea-bordered" placeholder="Digite sua biografia."></textarea>
                                </label>
                            </div>
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Redes Socias" />
                    <div role="tabpanel" class="tab-content p-5">
                        <div class="grid grid-cols-12 gap-2 md:gap-5">
                            <div class="col-span-12 md:col-span-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BriefcaseIcon class="w-4 h-4 mr-2" />Redes Sociais</span>
                                    </div>
                                    <select v-model="socialMediaId" class="select select-bordered select-sm w-full">
                                        <option v-for="socialMedia in socialMedias" :key="socialMedia.Id" :value="socialMedia.Id">{{ socialMedia.Name }}</option>
                                    </select>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-6">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BriefcaseIcon class="w-4 h-4 mr-2" />Url</span>
                                    </div>
                                    <input v-model="url" type="text" class='input input-bordered input-sm w-full'>
                                </label>
                            </div>                             
                        </div>
                        <div class="grid grid-cols-12 mt-2">
                            <div class="col-span-12 md:col-span-2">
                                <div class="flex">
                                    <button @click="setUserSocialMedia" class="btn btn-sm bg-blue-500 hover:bg-blue-400 text-white"><PlusIcon class="w-5 h-5" /> Adicionar</button>
                                </div>
                            </div>  
                        </div>
                        <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5 mt-2">
                            <div class="col-span-12 md:col-span-3" v-for="userSocialMedia in userSocialMedias">
                                <div class="card bg-white border mb-2">
                                    <div class="card-body p-4">
                                        <p class="font-bold text-base">{{ userSocialMedia.Name }}</p>
                                        
                                        <div class="flex gap-2">
                                            <LinkIcon class="w-5 h-5" /> <p class="break-all text-sm">Url: <a href="" class="hover:text-cyan-500 hover:underline">{{ userSocialMedia.Url }}</a></p>
                                        </div>

                                        <div class="flex justify-end gap-2">
                                            <button @click="updateUserSocialMedia(userSocialMedia.Id)" class="btn btn-success btn-sm text-white"><PencilIcon class="w-5 h-5" /></button>
                                            <button @click="deleteUserSocialMedia(userSocialMedia.Id)" class="btn btn-error btn-sm text-white"><TrashIcon class="w-5 h-5" /></button>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Endereço" />
                    <div role="tabpanel" class="tab-content p-5">
                        <div class="grid grid-cols-12 gap-0 md:gap-5">
                            <div class="col-span-12 md:col-span-2">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BuildingOfficeIcon class="w-4 h-4 mr-2" />CEP</span>
                                    </div>
                                    <input v-model="zipCode" type="text" class='input input-bordered input-sm w-full'>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-2">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BuildingOfficeIcon class="w-4 h-4 mr-2" />Estado</span>
                                    </div>
                                    <select v-model="state" v-on:change="listCities" class="select select-bordered select-sm w-full">
                                        <option v-for="state in states" :key="state.Id" :value="state.Id">{{ state.Name }}</option>
                                    </select>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-8">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BuildingOfficeIcon class="w-4 h-4 mr-2" />Cidade</span>
                                    </div>
                                    <select v-model="city" class="select select-bordered select-sm w-full">
                                        <option v-for="city in cities" :key="city.Id" :value="city.Id">{{ city.Name }}</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-0 md:gap-5">
                            <div class="col-span-12 md:col-span-6">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BuildingOfficeIcon class="w-4 h-4 mr-2" />Endereço</span>
                                    </div>
                                    <input v-model="street" type="text" class='input input-bordered input-sm w-full'>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BuildingOfficeIcon class="w-4 h-4 mr-2" />Bairro</span>
                                    </div>
                                    <input v-model="district" type="text" class='input input-bordered input-sm w-full'>
                                </label>
                            </div>
                            <div class="col-span-12 md:col-span-2">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BuildingOfficeIcon class="w-4 h-4 mr-2" />Número</span>
                                    </div>
                                    <input v-model="streetNumber" type="text" class='input input-bordered input-sm w-full'>
                                </label>
                            </div>
                        </div>
                        <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                            <div class="col-span-12">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><BuildingOfficeIcon class="w-4 h-4 mr-2" />Complemento</span>
                                    </div>
                                    <textarea v-model="streetComplement" class="textarea textarea-bordered" placeholder="Digite um complemento para seu endereço."></textarea>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button @click="updateUser" class="btn bg-blue-500 hover:bg-blue-400 text-white w-full md:w-28"><BookmarkIcon class="w-5 h-5" /> Salvar</button>   
                </div>
            </div>   
        </div>
    </div>    
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { IUserState, getUser, updateUser, setUserSocialMedia, updateUserSocialMedia, deleteUserSocialMedia } from '../hooks/useUser';
import { IStatesState, getAllStates } from '../hooks/useStates';
import { ICitiesState, getAllCitiesBasedOnStateId } from '../hooks/useCities';
import { IJobsState, getAllJobs } from '../hooks/useJobs';
import { ISocialMediaState, getAllSocialMedias } from '../hooks/useSocialMedias';
import Swal from 'sweetalert2';
import { UserIcon, EnvelopeIcon, DocumentTextIcon, CalendarDaysIcon, UserGroupIcon, MapPinIcon, BriefcaseIcon, PlusIcon, DocumentDuplicateIcon, GlobeAltIcon, PencilIcon, TrashIcon, LinkIcon, BuildingOfficeIcon, BookmarkIcon } from '@heroicons/vue/24/outline';
import { getCookies, calculateAge } from '../helper/helper';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseover = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export default defineComponent({
    setup(){

        const userState: IUserState = reactive({
            isLoadingUser: false,
            messagesUser: '',
            statusCodeUser: 0
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

        const socialMediaState: ISocialMediaState = reactive({
            isLoadingSocialMedia: false,
            messagesSocialMedia: '',
            statusCodeSocialMedia: 0
        });

        // User Variables
        const name = ref('');
        const email = ref('');
        const cpf = ref('');
        const birthDate = ref(0);
        const sex = ref('');
        const profilePicture = ref();
        const zipCode = ref('');
        const state = ref('');
        const city = ref('');
        const street = ref('');
        const district = ref('');
        const streetNumber = ref('');
        const streetComplement = ref('');
        const jobId = ref('');
        const jobName = ref('');
        const biography = ref();
        const socialMediaId = ref();
        const url = ref('');
    
        // User object
        const userSocialMedias = ref();
        const socialMedias = ref();
        const states = ref();
        const cities = ref();
        const jobs = ref();

        return{
            ...toRefs(userState),
            ...toRefs(statesState),
            ...toRefs(citiesState),
            ...toRefs(jobsState),
            ...toRefs(socialMediaState),
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
            jobId,
            jobName,
            biography,
            userSocialMedias,
            socialMedias,
            states,
            cities,
            jobs,
            socialMediaId,
            url
        }

    },
    methods:
    {
        async getUser()
        {
            this.isLoadingUser = true;

            const response: any = await getUser(Number(getCookies('userId')));

            if(response.value['statusCode'] == 200)
            {
                this.name = response.value['data'].UserName;
                this.email = response.value['data'].Email;
                this.cpf = response.value['data'].Cpf;
                this.birthDate = calculateAge(new Date(response.value['data'].Birth_date));
                this.sex = response.value['data'].Sex;
                this.profilePicture = (response.value['data'].Profile_picture == null ? '' : response.value['data'].Profile_picture);     
                this.zipCode = response.value['data'].Zip_code;
                this.state = response.value['data'].StateId;
                this.city = response.value['data'].City_id;
                this.street = response.value['data'].Street;
                this.district = response.value['data'].District;
                this.streetNumber = response.value['data'].Street_number;
                this.streetComplement = response.value['data'].Street_complement;
                this.jobId = response.value['data'].JobId;
                this.jobName = response.value['data'].JobName;
                this.biography = response.value['data'].Biography;
                this.userSocialMedias = response.value['data'].User_social_media;
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }

            this.isLoadingUser = false;
        },
        async listStates()
        {
            this.isLoadingStates = true;

            const response: any = await getAllStates();

            if(response.value['statusCode'] == 200)
            {
                this.states = response.value['data'];
                this.state = this.states[0]['Id'];

                await this.listCities();
            }
            else 
                Toast.fire({ icon: 'error', title: response.value['messages']  });
        
            this.isLoadingStates = false;
        },
        async listCities()
        {
            this.isLoadingCities = true;

            const response: any = await getAllCitiesBasedOnStateId(Number(this.state));

            if(response.value['statusCode'] == 200)
                this.cities = response.value['data'];
            else 
                Toast.fire({ icon: 'error', title: response.value['messages'] });

            this.isLoadingCities = false;
        },
        async listJobs()
        {
            this.isLoadingJobs = true;

            const response: any = await getAllJobs();

            if(response.value['statusCode'] == 200)
                this.jobs = response.value['data'];
            else
                Toast.fire({ icon: 'error', title: response.value['messages'] });

            this.isLoadingJobs = false;
        },
        async listSocialMedias()
        {
            this.isLoadingSocialMedia = true;

            const response: any = await getAllSocialMedias();

            if(response.value['statusCode'] == 200)
            {
                this.socialMedias = response.value['data'];
                this.socialMediaId = this.socialMedias[0]['Id']; 
            }
            else
                Toast.fire({ icon: 'error', title: response.value['messages'] })

            this.isLoadingSocialMedia = false;
        },
        getFile(event: any)
        {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                this.profilePicture = reader.result
            }

            reader.readAsDataURL(file);
        },
        async updateUser()
        {
            const address = {
                street: this.street,
                streetNumber: this.streetNumber,
                streetComplement: (this.streetComplement != "" ? this.streetComplement : "" ), // NOT MANDATORY
                cityId: this.city,
                district: this.district,
                zipCode: this.zipCode 
            };

            const userObject = {
                name: this.name,
                profilePicture: (this.profilePicture != "" ? this.profilePicture : ""), // NOT MANDATORY
                biography: (this.biography != "" ? this.biography : ""), // NOT MANDATORY
                sex: this.sex,
                address: address,
                jobId: this.jobId
            };

            const response: any = await updateUser(userObject);

            if(response.value['statusCode'] == 200)
                Toast.fire({ icon: 'success', title: response.value['messages'] }).then(async () => { await this.getUser() });
            else
                Toast.fire({ icon: 'error', title: response.value['messages'] })
        }, 
        async setUserSocialMedia()
        {
            const userSocialMediaObject = {
                socialMediaId: this.socialMediaId,
                url: this.url
            };

            const response: any = await setUserSocialMedia(userSocialMediaObject);

            if(response.value['statusCode'] == 200)
                Toast.fire({ icon: 'success', title: response.value['messages'] }).then(async () => { await this.getUser() });
            else
                Toast.fire({ icon: 'error', title: response.value['messages'] })
        },
        async updateUserSocialMedia(userSocialMediaId: number)
        {
            await Swal.fire({
                input: "text",
                title: 'Alteração de URL',
                text: 'Digite a nova URL no campo abaixo para alterar sua rede social.',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Salvar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if(!value)
                        return "Nova Url deve ser informada."
                }
            }).then(async (result) => {
                
                if(result.isConfirmed)
                {
                    const userSocialMediaObject = {
                        url: result.value
                    };

                    const response: any = await updateUserSocialMedia(userSocialMediaObject, userSocialMediaId)

                    if(response.value['statusCode'] == 200)
                        Toast.fire({ icon: 'success', title: response.value['messages'] }).then(async () => { await this.getUser() });
                    else
                        Toast.fire({ icon: 'error', title: response.value['messages'] })
                }
            });
        },
        async deleteUserSocialMedia(userSocialMediaId: number)
        {
            await Swal.fire({
                title: 'Atenção',
                text: 'Você está prestes a excluir uma rede social sua, tem certeza?',
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
                    const response: any = await deleteUserSocialMedia(userSocialMediaId);

                    if(response.value['statusCode'] == 200)
                        Toast.fire({ icon: 'success', title: response.value['messages'] }).then(async () => { await this.getUser() });
                    else
                        Toast.fire({ icon: 'error', title: response.value['messages'] })
                }
            });
        }
    },
    async beforeMount() {

        this.isLoadingUser = true;

        await Promise.all([
            this.listJobs(),
            this.listSocialMedias(),
            this.listStates()
        ]);
        
        await this.getUser()
    },
    components:{
        UserIcon,
        EnvelopeIcon,
        DocumentTextIcon,
        CalendarDaysIcon,
        UserGroupIcon,
        MapPinIcon,
        BriefcaseIcon,
        PlusIcon,
        DocumentDuplicateIcon,
        GlobeAltIcon,
        PencilIcon, 
        TrashIcon,
        LinkIcon,
        BuildingOfficeIcon,
        BookmarkIcon
    }
})

</script>