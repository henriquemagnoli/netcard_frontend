<template>
    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-5 p-5 md:p-0">
        <div class="col-span-12 md:col-span-5">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Map</h2>
                </div>
            </div>
        </div>
        <div class="col-span-12 md:col-span-3">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Conexões próximas</h2>
                    <div class="card bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-all">
                        <div class="card-body p-4 text-md md:text-xs">
                            <div class="flex gap-3 items-center">
                                <div class="rounded-full w-10 h-10 bg-gray-500"></div>
                                <div>
                                    <p class="font-bold">Jane Doe, 21</p>
                                    <p>Engenheiro de Software</p>
                                </div>
                                <p class="font-bold">10 km</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 md:col-span-4">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex items-center justify-center">
                        <div class="rounded-full w-32 h-32 bg-gray-500"></div>
                    </div>
                    
                    <p class="text-center font-bold text-lg">Jane Doe, 21</p>
                    
                    <div>
                        <p class="font-semibold">Resumo</p>
                        <p>Profissão: Engenheiro de Software</p>
                    </div>

                    <div>
                        <p class="font-semibold">Contatos</p>
                        <p>Telefone: 12345-1235</p>
                        <p>E-mail: janedoe@hotmail.com</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold">Redes Sociais</p>
                    </div>            
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    
})

</script>