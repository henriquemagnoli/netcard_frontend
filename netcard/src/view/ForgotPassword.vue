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
                    <h1 class="text-3xl font-bold">Esqueceu Senha</h1>
                    <p class="text-gray-400">Nós entendemos, coisas acontecem. Basta inserir seu endereço de e-mail abaixo e enviaremos um link para redefinir sua senha.</p>
                    
                    <form id="login-form">
                        <div class="space-y-5 pt-5">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text flex"><EnvelopeIcon class="w-4 h-4 mr-2" />E-mail</span>
                                </div>
                                <input type="email" class='input input-bordered h-10 w-full'>
                            </label>
                              
                            <button type="submit" class="btn bg-cyan-500 w-full h-10 rounded-md hover:bg-cyan-700 text-white text-sm">Enviar</button>
                            
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
import { defineComponent } from 'vue';
import { EnvelopeIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
    components: {
        EnvelopeIcon
    }
})

</script>