import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface IStatesState
{
    isLoadingStates: boolean,
    messagesStates: string,
    statusCodeStates: number
}

export async function getAllStates() 
{
    const request = await fetch(`${api_url}/states`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    });

    const response = await request.json();

    const data = ref<IStatesState[]>(response);

    return data;
}