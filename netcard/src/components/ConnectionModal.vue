<template>
    <dialog class="modal" :class="{'modal-open': show_modal}" >
        <div class="modal-box max-w-3xl p-0">
            
            <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-48 p-10"></div>

            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
            <!-- <h3 class="font-bold text-lg flex items-center gap-3 text-aflablue-400 mb-10"><EyeIcon class="w-5 h-5"/> Visualização de Conexão </h3> -->
            
            <div v-if="isLoadingUser == true">
                <div class="space-y-5">
                    <div class="skeleton rounded-full w-32 h-32"></div>

                    <div class="skeleton h-6 w-40"></div> 
                    <div class="skeleton h-4 w-28"></div>
        
                    <div class="skeleton h-6 w-28"></div> 
                    <div class="skeleton h-10 w-full"></div>
                    
                    <div class="skeleton h-6 w-28"></div> 
                    <div class="skeleton h-4 w-32"></div>
                    <div class="skeleton h-4 w-32"></div>
        
                    <div class="skeleton h-4 w-28"></div> 

                    <div class="flex gap-4">
                        <div class="skeleton h-12 w-12"></div> 
                        <div class="skeleton h-12 w-12"></div> 
                        <div class="skeleton h-12 w-12"></div> 
                    </div>
                </div>
            </div>

            <div v-if="isLoadingUser == false">
                <div class="space-y-5 p-10">
                    <!-- <div class="rounded-full bg-gray-400 w-32 h-32"></div> -->
                    <img class="w-32 h-32 fixed border-2 border-white rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />

                    <div class="font-bold">
                        <p class="text-xl">{{ name }}, {{ birthDate }}</p>
                        <p class="text-sm">{{ jobName }}</p>
                    </div>
                            
                    <div>
                        <p class="font-semibold">Biografia</p>
                        <p class="text-sm">{{ biography }}</p>
                    </div>

                    <div>
                        <p class="font-semibold">Contatos:</p>
                        <p>Telefone: 12345-1235</p>
                        <p>E-mail: {{ email }}</p>
                    </div>

                    <div>
                        <p class="font-semibold">Redes Sociais</p>

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

            <div class="modal-action">
                <button class="btn btn-sm btn-neutral" @click="closeModal">Fechar</button>
            </div>
        </div>    
    </dialog> 
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { IUserState, getUser } from '../hooks/useUser';
import { EyeIcon } from '@heroicons/vue/24/outline';
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
        const birthDate = ref('');
        const jobName = ref('');
        const biography = ref('');
        const email = ref('');
        const socialMedias = ref();
        const profilePicture = ref('');

        return{
            ...toRefs(userState),
            name,
            birthDate,
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
                this.birthDate = (new Date(response.value['data'].Birth_date).toISOString().split('T')[0]);
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
        EyeIcon
    }
})

</script>