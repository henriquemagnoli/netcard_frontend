<template>

    <!-- https://www.telerik.com/blogs/how-to-integrate-google-maps-vue-3-application#:~:text=Add%20Google%20Maps%20into%20a%20Vue%203%20Application&text=The%20API%20key%20can%20be,map%20with%20the%20GoogleMap%20component. -->

    <div class="w-full h-[calc(100vh-144px)]">

        <div v-if="isMapvisible">
            <div class="flex justify-center md:justify-end px-4 md:px-8">
                <div class="absolute z-50 mt-5">
                    <div v-if="isLoadingCoordinates">
                        <div class="skeleton h-12 w-60"></div>
                    </div>
  
                    <div class="form-control bg-white border px-2 bg-base-400 rounded-xl mb-2">
                        <label class="label cursor-pointer">
                            <span class="label-text text-md font-medium">Vísivel</span>
                            <input @change="changeUserVisible" v-model="isUserVisible" type="checkbox" class="toggle toggle-success" />
                        </label>
                    </div>
                
                    <div v-if="!isLoadingCoordinates">
                        <div class="collapse collapse-arrow bg-white border bg-base-400">
                            <input type="checkbox" />
                            <div class="collapse-title text-md font-medium flex items-center gap-2"><UserGroupIcon class="w-5 h-5" /> Conexões Próximas</div>
                            <div class="collapse-content">
                                <div v-for="userCoordinate in usersCoordinates" :key="userCoordinate.User_id">
                                    <div class="card bg-base-200 cursor-pointer hover:scale-105 transition-all mb-2" @click="modalState(userCoordinate.User_id)">
                                        <div class="card-body p-4 text-md md:text-xs">
                                            <div class="flex gap-3 items-center">
                                                <span v-if="userCoordinate.Profile_picture == null" >
                                                    <div class="w-12 h-12 bg-gray-400 border-4 border-base-200 rounded-full flex items-center justify-center"><UserIcon class="w-6 h-6 text-white"/></div>
                                                </span>
                                                <span v-else>
                                                    <img class="w-12 h-12 border-4 border-base-200 rounded-full" :src="userCoordinate.Profile_picture" alt="" />
                                                </span>  
                                                <div>
                                                    <p class="font-bold">{{ userCoordinate.User_name }}, {{ calculteAge(userCoordinate.Birth_date) }}</p>
                                                    <p>{{ userCoordinate.Job_name }}</p>
                                                </div>
                                                <span v-if="userId != userCoordinate.User_id">
                                                    <p class="font-bold">{{ userCoordinate.Distance }} km</p>
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
                                <span v-if="userCoordinate.Profile_picture == null" >
                                    <div class="w-12 h-12 bg-gray-400 border-4 border-base-200 rounded-full flex items-center justify-center"><UserIcon class="w-6 h-6 text-white"/></div>
                                </span>
                                <span v-else>
                                    <img class="w-12 h-12 border-4 border-base-200 rounded-full" :src="userCoordinate.Profile_picture" alt="" />
                                </span>  
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

        <div v-if="!isMapvisible">
            <div class="flex flex-col h-[calc(100vh-144px)] justify-center items-center">
                <p class="text-center p-5">Seu mapa está desabilitado, clique no botão a baixo para habilita-lo.</p>
                <button type="button" class="btn btn-outline" @click="verfiyCoordinates()">Habilitar Localização <MapPinIcon class="w-5 h-5" /></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { ICoordinatesState, setUserCoordinate, getAllCoordinates, updateUserCoordinate, deleteUserCoordinates } from '../hooks/useCoordinates';
import { IUserState, updateUserVisible } from '../hooks/useUser';
import { calculateAge, deleteCookiesByName } from '../helper/helper';
import { PlusIcon, XMarkIcon, UserGroupIcon, EyeIcon, MapPinIcon, UserIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map';
import { getCookies, setCookie, calculateDistanceInKm } from '../helper/helper';
import ConnectionModal from '../components/ConnectionModal.vue';
import Swal from 'sweetalert2';

export default defineComponent({
    setup(){

        const coordinateState: ICoordinatesState = reactive({
            isLoadingCoordinates: false,
            messagesCoordinates: '',
            statusCodeCoordinates: 0
        });

        const userState: IUserState = reactive({
            isLoadingUser: false,
            messagesUser: '',
            statusCodeUser: 0
        });

        const google_key = import.meta.env.VITE_GOOGLE_API_KEY;
        const center = ref();
        const usersCoordinates = ref();
        const show_modal = ref(false);
        const connection_id = ref(0);
        const isMapvisible = ref(false);
        const latitude = ref(0);
        const longitude = ref(0);

        const isUserVisible = ref(false);

        const userId = ref(Number(getCookies('userId')));

        return{
            ...toRefs(coordinateState),
            ...toRefs(userState),
            google_key,
            center,
            usersCoordinates,
            show_modal,
            connection_id,
            isMapvisible,
            latitude,
            longitude,
            isUserVisible,
            userId
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
            try
            {
                // Get Coordinates from user
                let coordinateObject: any = await this.getUserCoordinate();
                let coordinateRequest = null;

                // If coordinates are empty, I assume that user didnt shared the location
                if(Object.keys(coordinateObject).length == 0)
                {
                    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Você deve habilitar a permissão de compartilhar a localização de seu navegador.' })
                    this.isMapvisible = false;
                    return;
                }

                if(getCookies('userLatitude') == undefined || getCookies('userLongitude') == undefined)
                {
                    coordinateRequest = await this.setUserCoordinate(coordinateObject);
                }
                else
                {
                    coordinateRequest = await this.updateUserCoordinate(coordinateObject)
                }

                // Verify if coordinates have been inserted
                if(coordinateRequest)
                {
                    // Set new cookies to latitude and longitude
                    setCookie('userLatitude', coordinateObject.latitude, 999999);
                    setCookie('userLongitude', coordinateObject.longitude, 999999);

                    let updateVisible = await this.updateUserVisible(1);

                    if(updateVisible)
                    {
                        setCookie('userIsVisible', String(1), 999999);
                        this.isUserVisible = true;

                        // Set values for center user view
                        this.center = {
                            lat: Number(coordinateObject.latitude), 
                            lng: Number(coordinateObject.longitude)
                        }

                        // List all user coordinates
                        let listCoordinates = await this.listCoordinates();
                        
                        // If listing works, then I enable map
                        if(listCoordinates)
                        {
                            this.isMapvisible = true;
                        }
                    }             
                }

                /*
                // User first time
                if(getCookies('userLatitude') == undefined || getCookies('userLongitude') == undefined)
                {
                    // If coordinates are filled, I will set user coordinates
                    let setCoordinates = await this.setUserCoordinate(coordinateObject);

                    // Verify if coordinates have been inserted
                    if(setCoordinates)
                    {
                        // Set new cookies to latitude and longitude
                        setCookie('userLatitude', coordinateObject.latitude, 999999);
                        setCookie('userLongitude', coordinateObject.longitude, 999999);

                        let updateVisible = await this.updateUserVisible(1);

                        if(updateVisible)
                        {
                            setCookie('userIsVisible', String(1), 999999);
                            this.isUserVisible = true;

                            // Set values for center user view
                            this.center = {
                                lat: Number(coordinateObject.latitude), 
                                lng: Number(coordinateObject.longitude)
                            }

                            // List all user coordinates
                            let listCoordinates = await this.listCoordinates();
                            
                            // If listing works, then I enable map
                            if(listCoordinates)
                            {
                                this.isMapvisible = true;
                            }
                        }             
                    }
                }
                else
                {
                    // If coordinates are filled, I will update user coordinates 
                    let updateCoordinates = await this.updateUserCoordinate(coordinateObject)

                    // Verify if coordinates have been updated
                    if(updateCoordinates)
                    {
                        // Set new cookies to latitude and longitude
                        setCookie('userLatitude', coordinateObject.latitude, 999999);
                        setCookie('userLongitude', coordinateObject.longitude, 999999);

                        let updateVisible = await this.updateUserVisible(1);

                        if(updateVisible)
                        {
                            setCookie('userIsVisible', String(1), 999999);
                            this.isUserVisible = true;

                            // Set values for center user view
                            this.center = {
                                lat: Number(coordinateObject.latitude), 
                                lng: Number(coordinateObject.longitude)
                            }

                            // List all user coordinates
                            let listCoordinates = await this.listCoordinates();
                            
                            // If listing works, then I enable map
                            if(listCoordinates)
                            {
                                this.isMapvisible = true;
                            }
                        }            
                    }
                }
                    */
            }
            catch(error)
            {
                console.log('teste')
                this.isMapvisible = false;
            }      
        },
        async setUserCoordinate(coordinateObject: any)
        {
            this.isLoadingCoordinates = true;
            
            const response: any = await setUserCoordinate(coordinateObject);

            if(response.value['statusCode'] == 200)
            {
                this.isLoadingCoordinates = false;
                return true;
            }
            else
            {
                this.isLoadingCoordinates = false;
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] });
                return false;
            }
        },
        async updateUserCoordinate(coordinateObject: any)
        {
            this.isLoadingCoordinates = true;

            const response: any = await updateUserCoordinate(coordinateObject);

            if(response.value['statusCode'] == 200)
            {
                this.isLoadingCoordinates = false;
                return true;
            }
            else
            {
                Swal.fire({ icon: 'error', title: 'Erro', text: response.value['messages'] })
                this.isLoadingCoordinates = false;
                return false;
            }
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
            catch(error: GeolocationPositionError | any)
            {   
                return {};
            }
        },
        async listCoordinates()
        {
            this.isLoadingCoordinates = true;

            const response: any = await getAllCoordinates();

            if(response.value['statusCode'] == 200)
            {
                response.value['data'] != null ? this.usersCoordinates = response.value['data'] : false;

                this.usersCoordinates.forEach((element: { Distance: string; Coordinates: { lat: number; lng: number; }; }) => {
                    element.Distance = calculateDistanceInKm(Number(getCookies('userLatitude')), 
                                                             Number(getCookies('userLongitude')),
                                                             element.Coordinates.lat,
                                                             element.Coordinates.lng).toFixed(2); // Here will add new field to json about distance based on current user
                });

                this.isLoadingCoordinates = false;
                return true;
            }
            else
            {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
                this.isLoadingCoordinates = false;
                return false;
            }
        },
        async updateUserVisible(visibleValue: number)
        {
            const response: any = await updateUserVisible(visibleValue);

            if(response.value['statusCode'] == 200)
                return true;
            else
                return false;
        },
        async deleteUserCoordinates()
        {
            const response: any = await deleteUserCoordinates();

            if(response.value['statusCode'] == 200)
                return true;
            else
                return false;
        },
        async changeUserVisible()
        {
            if(!this.isUserVisible)
            {
                // Need to update user visibility
                let updateVisible = await this.updateUserVisible(0);

                if(updateVisible)
                {
                    setCookie('userIsVisible', "0", 999999)

                    // Need to delete user coordinates
                    let deleteCoordinates = await this.deleteUserCoordinates();

                    if(deleteCoordinates)
                    {
                        deleteCookiesByName('userLatitude');
                        deleteCookiesByName('userLongitude');
                        
                        this.isMapvisible = false;
                    }             
                }
            }
        },
        async validateIsUserVisible()
        {
            if(Number(getCookies('userIsVisible')) == 1 || Number(getCookies('userIsVisible')) == undefined)
                await this.verfiyCoordinates();
        },
        calculteAge(birthDate: string)
        {
           return calculateAge(new Date(birthDate))
        }
    },  
    async beforeMount() { 
        //await this.verfiyCoordinates();
        await this.validateIsUserVisible();
    },
    components:{
        PlusIcon,
        XMarkIcon,
        UserGroupIcon,
        EyeIcon,
        MapPinIcon,
        UserIcon,
        ArrowPathIcon,
        GoogleMap,
        Marker, 
        MarkerCluster,
        InfoWindow,
        ConnectionModal
    }
})

</script>