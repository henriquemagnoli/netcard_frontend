<template>
    <dialog class="modal" :class="{'modal-open': show_modal}" >
        <div class="modal-box max-w-3xl p-0">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
  
            <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-48 p-8">
                <div v-if="isLoadingUser == true" class="absolute mt-24">
                    <div class="skeleton rounded-full w-32 h-32 border-4 border-base-200"></div>
                </div>

                <div v-if="isLoadingUser == false" class="absolute mt-24">
                    <span v-if="profilePicture == null" >
                        <div class="w-32 h-32 bg-gray-400 border-4 border-base-200 rounded-full flex items-center justify-center"><UserIcon class="w-16 h-16 text-white"/></div>
                    </span>
                    <span v-else>
                        <img class="w-32 h-32 border-4 border-base-200 rounded-full" :src="profilePicture" alt="" />
                    </span>  
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
                                <p class="flex items-center gap-3 text-xl">{{ name }}, {{ age }} <span v-if="isConnection" class="text-xs text-gray-400 font-normal">
                                                                                                    <p class="flex items-center"><CheckIcon class="w-4 h-4"/>Adicionado</p>
                                                                                                 </span>
                                </p>
                                <p class="text-sm">{{ jobName }}</p>
                                
                            </div>

                            <div>
                                <span v-if="biography == null">
                                    <p class="bg-yellow-200 text-yellow-600 p-3 rounded-md text-sm">Usuário não possui biografia.</p>
                                </span>
                                <span v-else>
                                    <p class="text-sm">{{ biography }}</p>
                                </span>    
                            </div>

                            <div class="grid grid-cols-12 gap-2">
                                <div class="col-span-12 md:col-span-6">
                                    <div class="card bg-base-200 shadow-lg">
                                        <div class="card-body p-4 text-md md:text-xs">
                                            <div class="space-y-3 gap-3 items-center">
                                                <div>
                                                    <p class="font-semibold text-lg">Contatos:</p>
                                                </div>
                                                <div class="text-sm">   
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
                                                    <span v-if="socialMedias == ''">
                                                        <p class="bg-yellow-200 text-yellow-600 p-3 rounded-md text-sm">Usuário não possui redes sociais.</p>
                                                    </span>
                                                    <span v-else>
                                                        <div class="flex gap-4" >                                    
                                                            <div v-for="socialMedia in socialMedias">
                                                                <a :href="socialMedia.Url" :class="[socialMedia.Social_media_id == 1 ? 'bg-[#0E76A8]' : 
                                                                            socialMedia.Social_media_id == 2 ? 'bg-[#1877F2]' :
                                                                            socialMedia.Social_media_id == 3 ? 'bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#FCAF45]' :
                                                                            'bg-[#171515]', 'btn text-white']">
                                                                    <i v-if="socialMedia.Social_media_id == 1" class="fa-brands fa-linkedin-in fa-xl"></i> 
                                                                    <i v-if="socialMedia.Social_media_id == 2" class="fa-brands fa-facebook-f fa-xl"></i>
                                                                    <i v-if="socialMedia.Social_media_id == 3" class="fa-brands fa-instagram fa-xl"></i>
                                                                    <i v-if="socialMedia.Social_media_id == 4" class="fa-brands fa-github fa-xl"></i>
                                                                </a>
                                                            </div>                                                           
                                                        </div>
                                                    </span>   
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
                    <button v-if="!isConnection" @click="setUserConnection" class="btn btn-sm bg-blue-500 hover:bg-blue-400 text-white"><ArrowsRightLeftIcon class="h-5 w-5"/> Conectar</button>
                    <button class="btn btn-sm btn-neutral" @click="closeModal">Fechar</button>
                </div>
            </div>
        </div>    
    </dialog> 
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { IUserState, getUser } from '../hooks/useUser';
import { IConnectionsState, setUserConnection, getUserConnectionById } from '../hooks/useConnections';
import { EyeIcon, CheckIcon, UserIcon, ArrowsRightLeftIcon } from '@heroicons/vue/24/outline';
import { calculateAge, getCookies } from '../helper/helper';
import Swal from 'sweetalert2';

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

        const connectionState: IConnectionsState = reactive({
            isLoadingConnections: false,
            messagesConnections: '',
            statusCodeConnections: 0
        });

        const name = ref('');
        const age = ref(0);
        const jobName = ref('');
        const biography = ref('');
        const email = ref('');
        const socialMedias = ref();
        const profilePicture = ref('');

        const isConnection = ref(false);

        return{
            ...toRefs(userState),
            ...toRefs(connectionState),
            name,
            age,
            jobName,
            biography,
            email,
            socialMedias,
            profilePicture,
            isConnection
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
                this.age = calculateAge(new Date(response.value['data'].Birth_date));
                this.profilePicture = (response.value['data'].Profile_picture == null ? null : response.value['data'].Profile_picture);     
                this.jobName = response.value['data'].JobName;
                this.biography = response.value['data'].Biography;
                this.socialMedias = response.value['data'].User_social_media;
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }
            
            this.isLoadingUser = false;
        },
        async setUserConnection()
        {
            this.isLoadingConnections = true;

            const response: any = await setUserConnection(Number(this.$props.connection_id));

            if(response.value['statusCode'] == 200)
                Toast.fire({ icon: 'success', title: response.value['messages'] }).then(async () => { 
                    await this.verifyIsConnection();
                    await this.getUser();
                });
            else
                Toast.fire({ icon: 'error', title: response.value['messages'] });

            this.isLoadingConnections = false;
        },
        async verifyIsConnection()
        {
            this.isLoadingConnections = true;

            if(getCookies('userId') == this.$props.connection_id)
            {
                this.isConnection = true;
                return;
            }
                
            const response: any = await getUserConnectionById(Number(this.$props.connection_id));

            if(response.value['statusCode'] == 200)
                this.isConnection = true; 
            else if(response.value['statusCode'] == 404)
                this.isConnection = false;
                           
            this.isLoadingConnections = false;
        }
    },
    async beforeMount() {
        await this.verifyIsConnection();
        await this.getUser();
    },
    components:{
        EyeIcon,
        CheckIcon,
        UserIcon,
        ArrowsRightLeftIcon
    }
})

</script>