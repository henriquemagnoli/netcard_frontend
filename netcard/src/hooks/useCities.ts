import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface ICitiesState
{
    isLoadingCities: boolean,
    messagesCities: string,
    statusCodeCities: number
}

export async function getAllCitiesBasedOnStateId(state_id: number) 
{
    const request = await fetch(`${api_url}/cities/${state_id}`, {
        method: 'GET'
    });

    const response = await request.json();

    const data = ref<ICitiesState[]>(response);

    return data;
}