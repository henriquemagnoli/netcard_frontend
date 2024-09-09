import { getCookies } from "../helper/helper";
import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface IUserState
{
    isLoading: boolean,
    messages: string,
    statusCode: number
}

export async function setUser(userObject: any)
{
    const request = await fetch(`${api_url}/user`, {
        method: 'POST',
        headers: { 'Authorization': String(getCookies('userToken')) },
        body: JSON.stringify(userObject)
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);
    
    return data;
}