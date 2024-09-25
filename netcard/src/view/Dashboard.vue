<template>

    <!-- https://www.telerik.com/blogs/how-to-integrate-google-maps-vue-3-application#:~:text=Add%20Google%20Maps%20into%20a%20Vue%203%20Application&text=The%20API%20key%20can%20be,map%20with%20the%20GoogleMap%20component. -->

    <div class="grid md:grid-cols-12 lg:grid-cols-12 gap-5 p-5 md:p-0">
        <div class="col-span-12 md:col-span-5">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Map</h2>
                    <div>
                        <GoogleMap
                            :api-key="google_key"
                            style="width: 100%; height: 600px"
                            :center="center"
                            :zoom="15">
                            <Marker :options="{ position: center }" @click="teste" /> 
                        </GoogleMap>
                    </div>
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
                    <div class="flex justify-end">
                        <XMarkIcon class="w-5 h-5 cursor-pointer hover:bg-gray-400 rounded-full" />
                    </div>

                    <div class="flex items-center justify-center">
                        <div class="rounded-full w-32 h-32 bg-gray-500"></div>
                    </div>
                    
                    <p class="text-center font-bold text-lg">Jane Doe, 21</p>
                    <p class="text-center text-sm">Engenheiro de Software</p>
                    
                    <div>
                        <p class="font-semibold">Biografia</p>
                        <p class="text-sm">Sed convallis maximus nunc et tincidunt. Aliquam accumsan justo a nunc feugiat, non sagittis ex fermentum. Duis lacinia imperdiet arcu in ornare. In ex tellus, lacinia sit amet nulla vel, porttitor dictum purus.</p>
                    </div>

                    <div>
                        <p class="font-semibold">Contatos</p>
                        <p>Telefone: 12345-1235</p>
                        <p>E-mail: janedoe@hotmail.com</p>
                    </div>
                    
                    <div>
                        <p class="font-semibold">Redes Sociais</p>
                    </div>  

                    <div class="flex h-full items-center justify-end">
                        <div class="card-actions">
                            <button class="btn btn-sm bg-cyan-400 hover:bg-cyan-600 text-white"><PlusIcon class="w-5 h-5" /> Adicionar</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map';

export default defineComponent({
    setup(){

        const google_key = import.meta.env.VITE_GOOGLE_API_KEY;
        const center = { lat: -21.96866719331956, lng: -46.79836176634998 };

        return{
            google_key,
            center
        }

    },
    methods:{
        teste()
        {
            console.log(`teste`);
        }
    },  
    components:{
        PlusIcon,
        XMarkIcon,
        GoogleMap,
        Marker, 
        MarkerCluster
    }
})

</script>