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
                    <h1 class="text-3xl font-bold">Cadastrar uma nova conta</h1>
                    <p class="text-gray-400">Preencha o formulário a baixo para criar uma nova conta.</p>
                    
                    <form id="register">
                        <div class="space-y-5 pt-5">
                            <div v-if="page == 1">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><EnvelopeIcon class="w-4 h-4 mr-2" />Nome</span>
                                    </div>
                                    <input type="text" class='input input-bordered h-10 w-full'>
                                </label>

                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text flex"><EnvelopeIcon class="w-4 h-4 mr-2" />E-mail</span>
                                    </div>
                                    <input type="email" class='input input-bordered h-10 w-full'>
                                </label>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />CPF</span>
                                            </div>
                                            <input type="text" class='input input-bordered h-10 w-full'>
                                        </label>
                                    </div>
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><CalendarDaysIcon class="w-4 h-4 mr-2" />Data de Nascimento</span>
                                            </div>
                                            <input type="date" class='input input-bordered h-10 w-full'>
                                        </label>
                                    </div>                          
                                </div>

                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Sexo</span>
                                            </div>
                                            <select class="select select-bordered w-full h-10">
                                                <option disabled selected>Masculino</option>
                                                <option>Feminino</option>
                                                <option>Outros</option>
                                            </select>
                                        </label>
                                    </div>      
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Foto de Perfil</span>
                                            </div>
                                            <input type="file" class="file-input file-input-bordered w-full max-w-xs" />
                                        </label>
                                    </div>                             
                                </div>
                            </div>

                            <div v-if="page == 2">
                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-4">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />CEP</span>
                                            </div>
                                            <input type="text" class='input input-bordered h-10 w-full'>
                                        </label>
                                    </div>   
                                    <div class="col-span-12 md:col-span-4">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><DocumentTextIcon class="w-4 h-4 mr-2" />Cidade</span>
                                            </div>
                                            <select class="select select-bordered w-full">
                                            </select>
                                        </label>
                                    </div> 

                                </div>
                            </div>

                            <div v-if="page == 3">
                                <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-0 md:gap-5">
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><KeyIcon class="w-4 h-4 mr-2" />Senha</span>
                                            </div>
                                            <label class='input input-bordered flex items-center h-10 w-full'>
                                                <input type="password" class="grow">
                                                <span class="cursor-pointer hover:bg-light-gray hover:rounded-full p-2">
                                                    <!-- <EyeSlashIcon v-if="!input_password_icon" class="w-4 h-4" />
                                                    <EyeIcon v-if="input_password_icon" class="w-4 h-4" /> -->
                                                </span>
                                            </label>  
                                        </label>
                                    </div>
                                    <div class="col-span-12 md:col-span-6">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text flex"><KeyIcon class="w-4 h-4 mr-2" />Confirmar Senha</span>
                                            </div>
                                            <label class='input input-bordered flex items-center h-10 w-full'>
                                                <input type="password" class="grow">
                                                <span class="cursor-pointer hover:bg-light-gray hover:rounded-full p-2">
                                                    <!-- <EyeSlashIcon v-if="!input_password_icon" class="w-4 h-4" />
                                                    <EyeIcon v-if="input_password_icon" class="w-4 h-4" /> -->
                                                </span>
                                            </label>  
                                        </label>
                                    </div>
                                </div>
                            </div>
                   
                            <button type="submit" class="btn bg-cyan-500 w-full h-10 rounded-md hover:bg-cyan-700 text-white text-sm">Cadastrar</button>
                            
                            <div class="justify-center flex text-sm gap-1">
                                <p>Já possuí uma conta? </p><a href="login" class="underline text-cyan-700">Voltar ao login.</a>
                            </div>  
                        </div>
                    </form>                
                </div>
                <!-- <div class="form-footer">
                    <Footer></Footer>
                </div> -->
            </div>       
        </div>      
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon, DocumentTextIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
    setup(){
        const page = ref(1);

        return{
            page
        }
    },
    components:{
        EnvelopeIcon,
        KeyIcon,
        EyeIcon,
        EyeSlashIcon,
        DocumentTextIcon,
        CalendarDaysIcon
    }
})
</script>