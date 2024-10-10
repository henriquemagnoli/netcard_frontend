<template>

    <!-- https://www.telerik.com/blogs/how-to-integrate-google-maps-vue-3-application#:~:text=Add%20Google%20Maps%20into%20a%20Vue%203%20Application&text=The%20API%20key%20can%20be,map%20with%20the%20GoogleMap%20component. -->

    <div class="w-full h-[calc(100vh-144px)]">

        <div v-if="is_visible">
            <div class="flex justify-center md:justify-end px-4 md:px-8">
                <div class="absolute z-50 mt-5">
                    <div v-if="isLoadingUser">
                        <div class="skeleton h-12 w-60"></div>
                    </div>

                    <div v-if="!isLoadingUser">
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
                                                    <p class="font-bold">{{ userCoordinate.User_name }}, {{ calculteAge(userCoordinate.Birth_date) }}</p>
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
            </div>

            <GoogleMap
                :api-key="google_key"
                :center="center"
                :zoom="20"
                disable-default-ui="false"
                :styles="[{ 'featureType': 'poi', 'stylers': [{'visibility': 'off'}] }]"
                class="w-full h-[calc(100vh-144px)]">

                <Marker v-for="userCoordinate in usersCoordinates" :key="userCoordinate.Id" :options="{ position: userCoordinate.Coordinates }">
                    <InfoWindow>
                        <div id="content" class="space-y-4">               
                            <div>
                                <img class="border-4 w-12 h-12 border-base-200 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                <h1 id="firstHeading" class="firstHeading text-xl font-semibold">{{ userCoordinate.User_name }}, {{ calculteAge(userCoordinate.Birth_date) }}</h1>
                                <div id="bodyContent">
                                    <p>{{ userCoordinate.Job_name }}</p>
                                </div>
                            </div>
                        
                            <button type="button" class="btn btn-sm w-full bg-blue-500 hover:bg-blue-400 text-white" @click="modalState(userCoordinate.User_id)"><EyeIcon class="w-5 h-5 text-white"/></button>
                        </div>
                    </InfoWindow>
                </Marker> 
            </GoogleMap>

            <div v-if="show_modal">
                <ConnectionModal :show_modal="show_modal" :connection_id="connection_id" @closeModal="modalState" />
            </div> 
        </div>

        <div v-if="!is_visible">
            <div class="flex flex-col h-[calc(100vh-144px)] justify-center items-center">
                <p class="text-center p-5">Seu mapa está desabilitado, clique a baixo para habilita-lo.</p>
                <button type="button" class="btn btn-outline" @click="">Habilitar Localização <MapPinIcon class="w-5 h-5" /></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { IUserState, setUserCoordinate, getAllCoordinates } from '../hooks/useUser';
import { calculteAge } from '../helper/helper';
import { PlusIcon, XMarkIcon, UserGroupIcon, EyeIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map';
import { getCookies, setCookie } from '../helper/helper';
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
        const is_visible = ref(false);

        return{
            ...toRefs(userState),
            google_key,
            center,
            usersCoordinates,
            show_modal,
            connection_id,
            is_visible
        }

    },
    methods:{
        modalState(user_id: number)
        {
            this.connection_id = user_id;
            this.show_modal = !this.show_modal
        },
        async verfiyCoordinates()
        {
            // 1 - Verify if location is on
            // IF verify if exists coordinates on cookie, if not, set a coordinate
            // IF is on update or set user coordinate and set on cookie, Open Map, List coordinates
            // ELSE dont set coordinate, continue to disable map

            try
            {
                // Verify if exists coordinates on cookies
                if(getCookies('userLatitude') == undefined || getCookies('userLongitude') == undefined)
                {
                    let coordinateObject: any = await this.getUserCoordinate();

                    await this.setUserCoordinate(coordinateObject);

                    setCookie('userLatitude', coordinateObject.latitude, 999999);
                    setCookie('userLongitude', coordinateObject.longitude, 999999);

                    await this.listCoordinates();
                }
                else
                {
                    console.log('teste')

                    //await this.updateUserCoordinate();

                    //setCookie('userLatitude', coordinateObject.latitude, 999999);
                    //setCookie('userLongitude', coordinateObject.longitude, 999999);

                    //await this.listCoordinates();
                }
            }
            catch(error)
            {
                console.log(error)
                this.is_visible = false;
            }      
        },
        async setUserCoordinate(coordinateObject: any)
        {
            this.isLoadingUser = true;
            
            const response: any = await setUserCoordinate(coordinateObject);

            if(response.value['statusCode'] == 200)
            {
                this.is_visible = true;
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }

            this.isLoadingUser = false;
        },
        async updateUserCoordinate()
        {
            console.log('atualiza coordenada')
        },
        async getUserCoordinate()
        {   
            try
            {
                const pos: any = await new Promise((resolve, reject) => {
                    if(navigator.geolocation)
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                return {
                    latitude: String(pos.coords.latitude),
                    longitude: String(pos.coords.longitude),
                }
            }
            catch(error)
            {   
                this.is_visible = false;
            }
        },
        async listCoordinates()
        {
            this.isLoadingUser = true;

            const response: any = await getAllCoordinates();

            if(response.value['statusCode'] == 200)
            {
                response.value['data'] != null ? this.usersCoordinates = response.value['data'] : false;
                this.is_visible = true;
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
            }

            this.isLoadingUser = false;
        },
        calculteAge(birthDate: string)
        {
           return calculteAge(new Date(birthDate))
        }
    },  
    async beforeMount() {
        await this.verfiyCoordinates();
      
        // if(this.getUserCoordinate() == undefined)
        //     await this.listCoordinates();

        //await this.getUserCoordinate();
        //await this.setUserCoordinate();
        //await this.listCoordinates();
    },
    components:{
        PlusIcon,
        XMarkIcon,
        UserGroupIcon,
        EyeIcon,
        MapPinIcon,
        GoogleMap,
        Marker, 
        MarkerCluster,
        InfoWindow,
        ConnectionModal
    }
})

</script>