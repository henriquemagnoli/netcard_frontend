<template>
    <dialog class="modal" :class="{'modal-open': show_modal}" >
        <div class="modal-box max-w-3xl p-0">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
  
            <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-48 p-8">
                <div v-if="isLoadingUser == true" class="absolute mt-24">
                    <div class="skeleton rounded-full w-32 h-32 border-4 border-base-200"></div>
                </div>

                <div v-if="isLoadingUser == false" class="absolute mt-24">
                    <img class="w-32 h-32 border-4 border-base-200 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
            </div>

            <div class="p-8">
                <div class="mt-10">
                    <div v-if="isLoadingUser == true">
                        <div class="space-y-5">             
                            <div class="skeleton h-6 w-44"></div> 
                            <div class="skeleton h-6 w-32"></div> 
                            <div class="skeleton h-10 w-full"></div>

                            <div class="grid grid-cols-12 gap-2">
                                <div class="col-span-12 md:col-span-6">
                                    <div class="skeleton h-20 w-full"></div> 
                                </div>
                                <div class="col-span-12 md:col-span-6">
                                    <div class="skeleton h-20 w-full"></div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="isLoadingUser == false">
                        <div class="space-y-5">
                            <div class="font-bold">
                                <p class="flex items-center gap-3 text-xl">{{ name }}, {{ age }} <span class="text-xs text-gray-400 font-normal">
                                                                                           <p class="flex items-center"><CheckIcon class="w-4 h-4"/>Adicionado</p>
                                                                                           </span></p>
                                <p class="text-sm">{{ jobName }}</p>
                                
                            </div>

                            <div>
                                <p class="text-sm">{{ biography }}</p>
                            </div>

                            <div class="grid grid-cols-12 gap-2">
                                <div class="col-span-12 md:col-span-6">
                                    <div class="card bg-base-200 shadow-lg">
                                        <div class="card-body p-4 text-md md:text-xs">
                                            <div class="space-y-3 gap-3 items-center">
                                                <div>
                                                    <p class="font-semibold text-lg">Contatos:</p>
                                                </div>
                                                <div>   
                                                    <p><span class="font-semibold">Telefone:</span> 12345-1235</p>
                                                    <p class="break-all"><span class="font-semibold"> E-mail:</span> {{ email }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-12 md:col-span-6">
                                    <div class="card bg-base-200 shadow-lg">
                                        <div class="card-body p-4 text-md md:text-xs">
                                            <div class="flex gap-3 items-center">
                                            
                                                <div>
                                                    <p class="font-semibold text-lg">Redes Sociais:</p>
                                                    <div class="flex gap-4" >
                                                        <div v-for="socialMedia in socialMedias">
                                                            <a :href="socialMedia.Url" :class="[socialMedia.Social_media_id == 1 ? 'bg-[#0E76A8]' : 
                                                                        socialMedia.Social_media_id == 2 ? 'bg-[#1877F2]' :
                                                                        socialMedia.Social_media_id == 3 ? 'bg-[#6134AF]' :
                                                                        'bg-[#171515]', 'btn text-white']">
                                                                <i v-if="socialMedia.Social_media_id == 1" class="fa-brands fa-linkedin-in fa-xl"></i> 
                                                                <i v-if="socialMedia.Social_media_id == 2" class="fa-brands fa-facebook-f fa-xl"></i>
                                                                <i v-if="socialMedia.Social_media_id == 3" class="fa-brands fa-instagram fa-xl"></i>
                                                                <i v-if="socialMedia.Social_media_id == 4" class="fa-brands fa-github fa-xl"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>          
                    </div>
                </div>

                <div class="modal-action">
                    <button class="btn btn-sm btn-neutral" @click="closeModal">Fechar</button>
                </div>
            </div>
        </div>    
    </dialog> 
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { IUserState, getUser } from '../hooks/useUser';
import { EyeIcon, CheckIcon  } from '@heroicons/vue/24/outline';
import { calculteAge } from '../helper/helper';
import Swal from 'sweetalert2';

export default defineComponent({
    props:{
        connection_id: Number,
        show_modal: Boolean
    },
    setup(){
    
        const userState: IUserState = reactive({
            isLoadingUser: false,
            messagesUser: '',
            statusCodeUser: 0
        });

        const name = ref('');
        const age = ref(0);
        const jobName = ref('');
        const biography = ref('');
        const email = ref('');
        const socialMedias = ref();
        const profilePicture = ref('');

        return{
            ...toRefs(userState),
            name,
            age,
            jobName,
            biography,
            email,
            socialMedias,
            profilePicture
        }

    },
    methods:{
        closeModal()
        {
            this.$emit('closeModal');
        },
        async getUser()
        {
            this.isLoadingUser = true;

            const response: any = await getUser(Number(this.$props.connection_id));

            if(response.value['statusCode'] == 200)
            {
                this.name = response.value['data'].UserName;
                this.email = response.value['data'].Email;
                this.age = calculteAge(new Date(response.value['data'].Birth_date));
                this.profilePicture = response.value['data'].Profile_picture;
                this.jobName = response.value['data'].JobName;
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
        EyeIcon,
        CheckIcon
    }
})

</script>