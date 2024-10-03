<template>
    <div class="grid md:grid-cols-12 lg:grid-cols-12 h-screen">
        <div class="bg-gradient-to-r from-cyan-500 to-blue-500 hidden md:block col-span-8">
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
                    <h1 class="text-3xl font-bold">Acesse sua conta</h1>
                    <p class="text-gray-400">Insira seu e-mail e senha para entrar em sua conta.</p>
                    
                    <form id="login-form">
                        <div class="space-y-5 pt-5">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><EnvelopeIcon class="w-4 h-4 mr-2" />E-mail</span>
                                </div>
                                <input v-model="email" type="email" class='input input-bordered h-10 w-full'>
                            </label>
                            
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><KeyIcon class="w-4 h-4 mr-2" />Senha</span>
                                </div>
                                <label class='input input-bordered flex items-center h-10 w-full'>
                                    <input v-model="password" :type="input_password_type" class="grow">
                                    <span v-on:click="showPassword" class="cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
                                        <EyeSlashIcon v-if="!input_password_icon" class="w-4 h-4" />
                                        <EyeIcon v-if="input_password_icon" class="w-4 h-4" />
                                    </span>
                                </label>  
                                <div class="text-right">
                                    <a href="forgotpassword" class="underline text-cyan-700 text-sm">Esqueceu senha?</a>
                                </div>       
                            </label>
                            
                            <button @click="login" type="button" class="btn bg-cyan-500 w-full h-10 rounded-md hover:bg-cyan-700 text-white text-sm" :disabled="isLoading">
                                <span v-if="!isLoading">
                                    Entrar
                                </span>
                                <span v-if="isLoading">
                                    <span class="loading loading-spinner loading-sm"></span>
                                </span>
                            </button>
                            
                            <div class="justify-center flex text-sm gap-1">
                                <p>Não possuí uma conta? </p><a href="register" class="underline text-cyan-700">Criar conta.</a>
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
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { ILoginState, verifyLogin } from '../hooks/useAuth';
import { getCookies } from '../helper/helper';
import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import Footer from '../components/Footer.vue';
import router from '../router';
import Swal from 'sweetalert2';

export default defineComponent({
    setup(){

        const state: ILoginState = reactive({
            isLoading: false,
            messages: '',
            statusCode: 0
        });

        const email = ref('');
        const password = ref('');

        const input_password_icon = ref(false);
        const input_password_type = ref('password');

        return {
            ...toRefs(state),
            email,
            password,
            input_password_icon,
            input_password_type
        }

    },
    methods:{
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
        async login()
        {
            if(!this.validateFields())
                return;

            this.isLoading = true;

            const response: any = await verifyLogin(this.email, this.password);

            if(response.value['statusCode'] != 200)
                Swal.fire({ icon: 'error', title: 'Erro', text: response.value['messages']});
            else
                router.push('/dashboard');  

            this.isLoading = false;
        },
        validateFields()
        {
            if(this.email == '')
            {
                Swal.fire({ icon: 'error', title: 'Erro', text: 'E-mail deve ser preenchido.'});
                return false;
            }

            if(this.password == '')
            {
                Swal.fire({ icon: 'error', title: 'Erro', text: 'Senha deve ser preenchida.' })
                return false;
            }

            return true;
        }
    },
    beforeMount() {
        if(getCookies('userToken') != undefined)
            router.push('/dashboard');
    },
    components:{
        Footer,
        EnvelopeIcon,
        KeyIcon,
        EyeIcon,
        EyeSlashIcon
    }
})
</script>