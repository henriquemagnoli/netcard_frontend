import { getCookies } from "../helper/helper";
import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface IUserState
{
    isLoadingUser: boolean,
    messagesUser: string,
    statusCodeUser: number
}

export async function setUser(userObject: any)
{
    const request = await fetch(`${api_url}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObject)
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);
    
    return data;
}

export async function getUser()
{
    const request = await fetch(`${api_url}/user/${getCookies('userId')}`, {
        method: 'GET',
        headers: { 
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        }
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}

export async function setUserCoordinate(userObject: any)
{
    const request = await fetch(`${api_url}/user/${getCookies('userId')}/coordinate`, {
        method: 'POST',
        headers: {
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        },
        body: JSON.stringify(userObject)
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}

export async function getAllCoordinates() 
{
    const request = await fetch(`${api_url}/user/coordinates`, {
        method: 'GET',
        headers: {
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        }
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}