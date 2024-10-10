import { ref } from "vue";
import { getCookies } from "../helper/helper";

const api_url = import.meta.env.VITE_URL_API;

export interface ISocialMediaState
{
    isLoadingSocialMedia: boolean,
    messagesSocialMedia: string,
    statusCodeSocialMedia: number
}

export async function getAllSocialMedias()
{
    const request = await fetch(`${api_url}/socialmedias`, {
        method: 'GET',
        headers: { 
            'Content-Type': "application/json",
            'Authorization': String(getCookies('userToken')), 
        }
    });

    const response = await request.json();

    const data = ref<ISocialMediaState[]>(response);
    
    return data;
}