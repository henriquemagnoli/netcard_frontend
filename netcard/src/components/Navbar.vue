<template>
    <Disclosure as="nav" class="bg-gradient-to-r from-cyan-500 to-blue-500" v-slot="{ open }">
      <div class="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex h-full items-center">
                <img class="h-14 w-14" src="./../assets/images/netcard_log.png">
                <p class="text-white text-lg font-bold tracking-widest">Netcard</p>
              </div>
                
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.href == path ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium flex gap-2']" :aria-current="item.current ? 'page' : undefined">
                  <Squares2X2Icon class="w-5 h-5" v-if="item.name == 'Painel'" />
                  <UserGroupIcon class="w-5 h-5" v-if="item.name == 'Conexões'" />
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button> -->

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <span v-if="user.imageUrl == ''" >
                        <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center"><UserIcon class="w-4 h-4 text-white"/></div>
                    </span>
                    <span v-else>
                        <img class="w-8 h-8 rounded-full" :src="user.imageUrl" alt="" />
                    </span>  
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      <a v-on:click="profilePage" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm font-semibold cursor-pointer"><UserIcon class="w-5 h-5" /> Perfil</a>
                    </MenuItem>
                    <MenuItem>
                      <a v-on:click="logout" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-red-500 font-semibold cursor-pointer"><ArrowLeftEndOnRectangleIcon class="w-5 h-5" /> Sair</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.href == path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'flex gap-2 rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">
            <Squares2X2Icon class="w-5 h-5" v-if="item.name == 'Painel'" />
            <UserGroupIcon class="w-5 h-5" v-if="item.name == 'Conexões'" />
            {{ item.name }}
          </DisclosureButton>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <span v-if="user.imageUrl == ''" >
                  <div class="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center"><UserIcon class="w-4 h-4 text-white"/></div>
              </span>
              <span v-else>
                  <img class="w-10 h-10 rounded-full" :src="user.imageUrl" alt="" />
              </span>  
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
              <div class="text-sm font-medium leading-none text-white">{{ user.email }}</div>
            </div>
            <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton v-on:click="profilePage" class="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-50 hover:bg-gray-700 hover:text-white"><UserIcon class="w-4 h-4" /> Perfil</DisclosureButton>
            <DisclosureButton v-on:click="logout" class="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-50 hover:bg-gray-700 hover:text-white"><ArrowLeftEndOnRectangleIcon class="w-4 h-4" /> Sair</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon, UserGroupIcon, Squares2X2Icon, ArrowLeftEndOnRectangleIcon, UserIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router';
import { ICoordinatesState, deleteUserCoordinates } from '../hooks/useCoordinates';
import router from '../router';
import Swal from 'sweetalert2';
import { deleteCookies, getCookies } from '../helper/helper';

export default defineComponent({
    setup(){
        const path = ref("");

        const user = {
            name: 'Tom Cook',
            email: 'tom@example.com',
            imageUrl: ''
        }
        const navigation = [
            { name: 'Painel', href: '/dashboard', current: true },
            { name: 'Conexões', href: '/connections', current: false },
        ]
        const userNavigation = [
            { name: 'Perfil', href: '/profile' },
            { name: 'Sair do Sistema', href: '/logout' },
        ]

        const coordinateState: ICoordinatesState = reactive({
          isLoadingCoordinates: false,
          messagesCoordinates: '',
          statusCodeCoordinates: 0
        });

        return{
          ...toRefs(coordinateState),
          path,
          user,
          navigation,
          userNavigation
        }
    },
    methods: {
      async logout()
      {
        Swal.fire({
            title: "Deseja realmente sair?",
            text: "Selecione 'Sair' se você deseja encerra a sessão.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sair',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            
            if(result.isConfirmed)
            {
              this.isLoadingCoordinates = true;

              const response: any = await deleteUserCoordinates(); 

              if(response.value['statusCode'] == 200)
              {
                deleteCookies();
                router.push('/login');        
              } 
              else
              {
                Swal.fire({ icon:'error', title: 'Erro', text: response.value['messages'] })
              }
              
              this.isLoadingCoordinates = false;
            }
          })       
      },
      profilePage()
      {
        window.location.href = "/profile";
      }
    },
    beforeMount() {
      this.path = String(useRoute().path);
    },
    components:{
        Disclosure, 
        DisclosureButton,
        DisclosurePanel, 
        Menu, 
        MenuButton, 
        MenuItem, 
        MenuItems,
        Bars3Icon,
        BellIcon, 
        XMarkIcon, 
        UserGroupIcon, 
        Squares2X2Icon,
        ArrowLeftEndOnRectangleIcon,
        UserIcon
    }
})

</script>