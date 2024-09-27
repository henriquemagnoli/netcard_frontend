<template>

    <!-- https://www.telerik.com/blogs/how-to-integrate-google-maps-vue-3-application#:~:text=Add%20Google%20Maps%20into%20a%20Vue%203%20Application&text=The%20API%20key%20can%20be,map%20with%20the%20GoogleMap%20component. -->

    <div class="w-full h-[calc(100vh-144px)]">

        <div class="flex justify-center md:justify-end px-4 md:px-8">
            <div class="absolute z-50 mt-5">
                <div class="collapse collapse-arrow bg-white border bg-base-400">
                    <input type="checkbox" />
                    <div class="collapse-title text-md font-medium flex items-center gap-2"><UserGroupIcon class="w-5 h-5" /> Conexões Próximas</div>
                    <div class="collapse-content">
                        <div v-for="userCoordinate in usersCoordinates" :key="userCoordinate.User_id">
                            <div class="card bg-base-200 cursor-pointer hover:scale-105 transition-all mb-2" @click="modalState(userCoordinate.User_id)">
                                <div class="card-body p-4 text-md md:text-xs">
                                    <div class="flex gap-3 items-center">
                                        <div class="rounded-full w-10 h-10 bg-gray-500"></div>
                                        <div>
                                            <p class="font-bold">{{ userCoordinate.User_name }}, 16</p>
                                            <p>{{ userCoordinate.Job_name }}</p>
                                        </div>
                                        <p class="font-bold">10 km</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <GoogleMap
            :api-key="google_key"
            style="width: 100%; height: 100%"
            :center="center"
            :zoom="20"
            disable-default-ui="false"
            :styles="[{ 'featureType': 'poi', 'stylers': [{'visibility': 'off'}] }]">

            <Marker v-for="userCoordinate in usersCoordinates" :key="userCoordinate.Id" :options="{ position: userCoordinate.Coordinates }">
                <InfoWindow>
                    <div id="content" class="space-y-4">
                        <div>
                            <h1 id="firstHeading" class="firstHeading text-xl font-semibold">{{ userCoordinate.User_name }}, {{  userCoordinate.Birth_date }}</h1>
                            <div id="bodyContent">
                                <p>{{ userCoordinate.Job_name }}</p>
                            </div>
                        </div>
                      
                        <button type="button" class="btn btn-sm bg-cyan-400 hover:bg-cyan-600 text-white" @click="modalState(userCoordinate.User_id)"><EyeIcon class="w-5 h-5 text-white"/></button>
                    </div>
                </InfoWindow>
            </Marker> 
        </GoogleMap> -->

        <div v-if="show_modal">
            <ConnectionModal :show_modal="show_modal" :connection_id="connection_id" @closeModal="modalState" />
        </div> 
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { IUserState, setUserCoordinate, getAllCoordinates } from '../hooks/useUser';
import { PlusIcon, XMarkIcon, UserGroupIcon, EyeIcon } from '@heroicons/vue/24/outline';
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map';
import ConnectionModal from '../components/ConnectionModal.vue';
import Swal from 'sweetalert2';

export default defineComponent({
    setup(){

        const userState: IUserState = reactive({
            isLoadingUser: false,
            messagesUser: '',
            statusCodeUser: 0
        });

        const google_key = import.meta.env.VITE_GOOGLE_API_KEY;
        const center = { lat: -21.96866719331956, lng: -46.79836176634998 };

        const usersCoordinates = ref();

        const show_modal = ref(false);
        const connection_id = ref(0);

        return{
            ...toRefs(userState),
            google_key,
            center,
            usersCoordinates,
            show_modal,
            connection_id
        }

    },
    methods:{
        modalState(user_id: number)
        {
            this.connection_id = user_id;
            this.show_modal = !this.show_modal
        },
        async setUserCoordinate()
        {
            this.isLoadingUser = true;

            const orderObject = await this.getUserCoordinate();
            
            const response: any = await setUserCoordinate(orderObject);

            if(response.value['statusCode'] == 200)
            {
                console.log(response.value['messages'])
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }

            this.isLoadingUser = false;
        },
        async getUserCoordinate()
        {   
            const pos: any = await new Promise((resolve, reject) => {
                if(navigator.geolocation)
                    navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            return {
                latitude: String(pos.coords.latitude),
                longitude: String(pos.coords.longitude),
            }
        },
        async listCoordinates()
        {
            this.isLoadingUser = true;

            const response: any = await getAllCoordinates();

            if(response.value['statusCode'] == 200)
            {
                response.value['data'] != null ? this.usersCoordinates = response.value['data'] : false;
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }

            this.isLoadingUser = false;
        }
    },  
    async beforeMount() {
        //await this.setUserCoordinate();
        await this.listCoordinates();
    },
    components:{
        PlusIcon,
        XMarkIcon,
        UserGroupIcon,
        EyeIcon,
        GoogleMap,
        Marker, 
        MarkerCluster,
        InfoWindow,
        ConnectionModal
    }
})

</script>