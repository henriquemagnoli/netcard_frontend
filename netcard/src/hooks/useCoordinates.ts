import { getCookies } from "../helper/helper";
import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface ICoordinatesState
{
    isLoadingCoordinates: boolean,
    messagesCoordinates: string,
    statusCodeCoordinates: number
}

export async function getAllCoordinates() 
{
    const request = await fetch(`${api_url}/coordinates`, {
        method: 'GET',
        headers: {
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        }
    });

    const response = await request.json();

    const data = ref<ICoordinatesState[]>(response);

    return data;
}

export async function setUserCoordinate(coordinateObject: any)
{
    const request = await fetch(`${api_url}/coordinates`, {
        method: 'POST',
        headers: {
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        },
        body: JSON.stringify(coordinateObject)
    });

    const response = await request.json();

    const data = ref<ICoordinatesState[]>(response);

    return data;
}

export async function deleteUserCoordinates()
{
    const request = await fetch(`${api_url}/coordinates/${getCookies('userId')}`, {
        method: 'DELETE',
        headers: {
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        }
    });

    const response = await request.json();

    const data = ref<ICoordinatesState[]>(response);

    return data;
}

export async function updateUserCoordinate(coordinateObject: any)
{
    const request = await fetch(`${api_url}/coordinates/${getCookies('userId')}`, {
        method: 'PATCH',
        headers: {
            'Authorization': String(getCookies('userToken')), 
            'Content-Type': 'application/json'     
        },
        body: JSON.stringify(coordinateObject)
    });

    const response = await request.json();

    const data = ref<ICoordinatesState[]>(response);

    return data;
}