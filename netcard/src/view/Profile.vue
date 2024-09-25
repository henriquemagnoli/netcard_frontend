<template>

    <div class="mx-auto max-w-full py-6 sm:px-6 lg:px-8 ">
        <div class="p-5 md:p-0">
            <div v-if="isLoadingUser == true">
                <div class="text-center">
                    <p class="text-md font-semibold mt-10">Carregando informações ... <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-blue-400 fill-blue-400 dark:fill-blue-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                    </p>
                </div>
            </div>

            <div class="space-y-10" v-if="isLoadingUser == false">
                <div class="rounded-full w-40 h-40 bg-gray-400 cursor-pointer"></div>

                <div class="border-b-2 border-gray-400">
                    <p class="mt-2 flex items-center py-2 font-semibold"><DocumentTextIcon class="w-5 h-5 mr-2" />Documentos</p>
                </div>
                
                <div>
                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
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
                                <input v-model="email" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />CPF</span>
                                </div>
                                <input v-model="cpf" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                        <div class="col-span-12 md:col-span-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><CalendarDaysIcon class="w-4 h-4 mr-2" />Data de Nascimento</span>
                                </div>
                                <input v-model="birthDate" type="date" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserGroupIcon class="w-4 h-4 mr-2" />Gênero</span>
                                </div>
                                <input v-model="sex" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><BriefcaseIcon class="w-4 h-4 mr-2" />Profissão</span>
                                </div>
                                <select class="select select-bordered select-sm w-full"></select>
                            </label>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
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

                <div class="border-b-2 border-gray-400 py-2">
                    <p class="mt-2 flex items-center font-semibold"><GlobeAltIcon class="w-5 h-5 mr-2" /> Redes Sociais</p>
                </div>

                <div class="space-y-5">
                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                        <div class="col-span-12 md:col-span-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><BriefcaseIcon class="w-4 h-4 mr-2" />Redes Sociais</span>
                                </div>
                                <select class="select select-bordered select-sm w-full"></select>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><BriefcaseIcon class="w-4 h-4 mr-2" />Url</span>
                                </div>
                                <input type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button class="btn bg-cyan-400 btn-sm hover:bg-cyan-600 text-white"><PlusIcon class="w-5 h-5" /> Adicionar</button>
                    </div>

                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                        <div class="col-span-12 md:col-span-4" v-for="socialMedia in socialMedias">
                            <div class="card bg-base-100 shadow-xl mb-2">
                                <div class="card-body p-4">
                                    <div class="flex">
                                        <p class="font-bold">{{ socialMedia.Name }}</p>
                                        <div class="flex justify-end gap-2">
                                            <button class="btn btn-success btn-sm text-white"><PencilIcon class="w-5 h-5" /></button>
                                            <button class="btn btn-error btn-sm text-white"><TrashIcon class="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                    
                                    <div class="flex gap-2">
                                        <LinkIcon class="w-5 h-5" /> <p class="break-all">Url: <a href="">{{ socialMedia.Url }}</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="border-b-2 border-gray-400 py-2">
                    <p class="mt-2 flex items-center font-semibold"><MapPinIcon class="w-5 h-5 mr-2" /> Endereço</p>
                </div>

                <div>
                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                        <div class="col-span-12 md:col-span-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />CEP</span>
                                </div>
                                <input v-model="zipCode" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-2">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Estado</span>
                                </div>
                                <input v-model="state" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Cidade</span>
                                </div>
                                <input v-model="city" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                        <div class="col-span-12 md:col-span-6">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Endereço</span>
                                </div>
                                <input v-model="street" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Bairro</span>
                                </div>
                                <input v-model="district" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                        <div class="col-span-12 md:col-span-2">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Número</span>
                                </div>
                                <input v-model="streetNumber" type="text" class='input input-bordered input-sm w-full'>
                            </label>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                        <div class="col-span-12">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Complemento</span>
                                </div>
                                <textarea v-model="streetComplement" class="textarea textarea-bordered" placeholder="Digite um complemento para seu endereço."></textarea>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="flex h-full items-center justify-end">
                    <button class="btn bg-cyan-400 hover:bg-cyan-600 text-white"><PlusIcon class="w-5 h-5" /> Alterar</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { IUserState, getUser } from '../hooks/useUser';
import Swal from 'sweetalert2';
import { UserIcon, EnvelopeIcon, DocumentTextIcon, CalendarDaysIcon, UserGroupIcon, MapPinIcon, BriefcaseIcon, PlusIcon, DocumentDuplicateIcon, GlobeAltIcon, PencilIcon, TrashIcon, LinkIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
    setup(){

        const userState: IUserState = reactive({
            isLoadingUser: false,
            messagesUser: '',
            statusCodeUser: 0
        });

        // User Variables
        const name = ref('');
        const email = ref('');
        const cpf = ref('');
        const birthDate = ref('');
        const sex = ref('');
        const profilePicture = ref('');
        const zipCode = ref('');
        const state = ref('');
        const city = ref('');
        const street = ref('');
        const district = ref('');
        const streetNumber = ref('');
        const streetComplement = ref('');
        const job = ref('');
        const biography = ref();
    
        // User object
        const socialMedias = ref();

        return{
            ...toRefs(userState),
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
            biography,
            socialMedias
        }

    },
    methods:
    {
        async getUser()
        {
            this.isLoadingUser = true;

            const response: any = await getUser();

            if(response.value['statusCode'] == 200)
            {
                this.name = response.value['data'].UserName;
                this.email = response.value['data'].Email;
                this.cpf = response.value['data'].Cpf;
                this.birthDate = (new Date(response.value['data'].Birth_date).toISOString().split('T')[0]);
                this.sex = response.value['data'].Sex;
                this.profilePicture = response.value['data'].Profile_picture;
                this.zipCode = response.value['data'].Zip_code;
                //this.state = response.value['data']
                this.city = response.value['data'].City_id;
                this.street = response.value['data'].Street;
                this.district = response.value['data'].District;
                this.streetNumber = response.value['data'].Street_number;
                this.streetComplement = response.value['data'].Street_complement;
                this.job = response.value['data'].Job_id;
                this.biography = response.value['data'].Biography;
                this.socialMedias = response.value['data'].User_social_media;
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }
            
            this.isLoadingUser = false;
        }
    },
    async beforeMount() {
        await this.getUser();
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
        LinkIcon
    }
})

</script>