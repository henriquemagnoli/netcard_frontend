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

export async function getUser(user_id: number)
{
    const request = await fetch(`${api_url}/user/${user_id}`, {
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

export async function getAllUserConnections(filterParams: any)
{
    let paramString: string = "";

    if(filterParams.name != "" && ("name" in filterParams))
        paramString += `&name=${filterParams.name}`;

    if(filterParams.job != "" && ("job" in filterParams))
        paramString += `&job=${filterParams.job}`;

    if(filterParams.sex != "" && ("sex" in filterParams))
        paramString += `&sex=${filterParams.sex}`;

    if(filterParams.state != "" && ("state" in filterParams))
        paramString += `&state=${filterParams.state}`;

    if(filterParams.city != "" && ("city" in filterParams))
        paramString += `&city=${filterParams.city}`;

    if(paramString != "")
        paramString = `?${paramString.slice(1)}`;

    const request = await fetch(`${api_url}/user/${getCookies('userId')}/connections${paramString}`, {
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