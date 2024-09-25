<template>

    <!-- https://www.telerik.com/blogs/how-to-integrate-google-maps-vue-3-application#:~:text=Add%20Google%20Maps%20into%20a%20Vue%203%20Application&text=The%20API%20key%20can%20be,map%20with%20the%20GoogleMap%20component. -->

    <div class="w-full h-[calc(100vh-144px)]">

        <div class="flex justify-center md:justify-end px-4 md:px-8">
            <div class="absolute z-50 mt-5">
                <div class="collapse collapse-arrow bg-white border border-gray-400">
                    <input type="radio" name="my-accordion-2"/>
                    <div class="collapse-title text-md font-medium flex gap-2 items-center"><UserGroupIcon class="w-5 h-5" /> Conexões Próximas</div>
                    <div class="collapse-content">
                        <div class="card bg-base-200 cursor-pointer hover:scale-105 transition-all mb-2">
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
        </div>

        <GoogleMap
            :api-key="google_key"
            style="width: 100%; height: 100%"
            :center="center"
            :zoom="18"
            disable-default-ui="false"
            :styles="[{ 'featureType': 'poi', 'stylers': [{'visibility': 'off'}] }]">

            <Marker :options="{ position: center }" @click="teste" /> 
        </GoogleMap>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PlusIcon, XMarkIcon, UserGroupIcon } from '@heroicons/vue/24/outline';
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
            if(navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position.coords.latitude, position.coords.longitude)
                });
            }
        },
    },  
    components:{
        PlusIcon,
        XMarkIcon,
        UserGroupIcon,
        GoogleMap,
        Marker, 
        MarkerCluster
    }
})

</script>