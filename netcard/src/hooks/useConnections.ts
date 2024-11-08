import { getCookies } from "../helper/helper";
import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface IConnectionsState
{
    isLoadingConnections: boolean,
    messagesConnections: string,
    statusCodeConnections: number
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

    const request = await fetch(`${api_url}/connections${paramString}`, {
        method: 'GET',
        headers: {
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        }
    });
    
    const response = await request.json();

    const data = ref<IConnectionsState[]>(response);

    return data;
}

export async function setUserConnection(connection_id: number)
{
    const body = { connectionId: connection_id }

    const request = await fetch(`${api_url}/connections`, {
        method: 'POST',
        headers: {
            'Authorization': String(getCookies('userToken')),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const response = await request.json();

    const data = ref<IConnectionsState[]>(response);

    return data;
}

export async function getUserConnectionById(connection_id: number)
{
    const request = await fetch(`${api_url}/connections/${connection_id}` , {
        method: 'GET',
        headers: {
            'Authorization': String(getCookies('userToken')),
            'Content-Type': 'application/json'
        }
    });

    const response = await request.json();

    const data = ref<IConnectionsState[]>(response);

    return data;
}

export async function deleteUserConnection(connection_id: number) 
{
    const request = await fetch(`${api_url}/connections/${connection_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': String(getCookies('userToken')),
            'Content-Type': 'application/json'
        }
    });

    const response = await request.json();

    const data = ref<IConnectionsState[]>(response);

    return data;
}