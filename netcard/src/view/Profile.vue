<template>
    <div class="p-5 md:p-0 space-y-10">
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
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
                <div class="col-span-12 md:col-span-4">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />CPF</span>
                        </div>
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
            </div>

            <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                <div class="col-span-12 md:col-span-4">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><CalendarDaysIcon class="w-4 h-4 mr-2" />Data de Nascimento</span>
                        </div>
                        <input type="date" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
                <div class="col-span-12 md:col-span-4">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><UserGroupIcon class="w-4 h-4 mr-2" />Gênero</span>
                        </div>
                        <input type="text" class='input input-bordered input-sm w-full'>
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
                        <textarea class="textarea textarea-bordered" placeholder="Digite sua biografia."></textarea>
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
                <div class="col-span-12 md:col-span-3">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body p-4">
                            <div class="flex">
                                <p class="font-bold">Facebook</p>
                                <div class="flex justify-end gap-2">
                                    <button class="btn btn-success btn-sm text-white"><PencilIcon class="w-5 h-5" /></button>
                                    <button class="btn btn-error btn-sm text-white"><TrashIcon class="w-5 h-5" /></button>
                                </div>
                            </div>
                            
                            <div class="flex gap-2">
                                <LinkIcon class="w-5 h-5" /> <p>Url: <a href="">https://teste.com.br</a></p>
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
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
                <div class="col-span-12 md:col-span-2">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Estado</span>
                        </div>
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Cidade</span>
                        </div>
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
            </div>
            <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                <div class="col-span-12 md:col-span-6">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Endereço</span>
                        </div>
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
                <div class="col-span-12 md:col-span-4">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Bairro</span>
                        </div>
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
                <div class="col-span-12 md:col-span-2">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Número</span>
                        </div>
                        <input type="text" class='input input-bordered input-sm w-full'>
                    </label>
                </div>
            </div>
            <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                <div class="col-span-12">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text flex"><UserIcon class="w-4 h-4 mr-2" />Complemento</span>
                        </div>
                        <textarea class="textarea textarea-bordered" placeholder="Digite um complemento para seu endereço."></textarea>
                    </label>
                </div>
            </div>
        </div>

        <div class="flex h-full items-center justify-end">
            <button class="btn bg-cyan-400 hover:bg-cyan-600 text-white"><PlusIcon class="w-5 h-5" /> Alterar</button>
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
        const socialMedia = ref();

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
            socialMedia
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
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }
            
            console.log(response.value['data']);
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