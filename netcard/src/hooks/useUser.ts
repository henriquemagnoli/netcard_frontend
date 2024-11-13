import { getCookies } from "../helper/helper";
import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface IUserState
{
    isLoadingUser: boolean,
    messagesUser: string,
    statusCodeUser: number
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

export async function updateUser(userObject: any)
{
    const request = await fetch(`${api_url}/user`, {
        method: 'PATCH',
        headers: {
            'Authorization': String(getCookies('userToken')),
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(userObject)
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}

export async function updateUserVisible(user_visible: number) 
{
    const body = { visible: user_visible };

    const request = await fetch(`${api_url}/user/visible`, {
        method: 'PATCH',
        headers:{
            'Authorization': String(getCookies('userToken')),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}

export async function setUserSocialMedia(userSocialMediaObject: any) 
{
    const request = await fetch(`${api_url}/user/social-media`, {
        method: 'POST',
        headers: {
            'Authorization': String(getCookies('userToken')),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userSocialMediaObject)
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}

export async function updateUserSocialMedia(userSocialMediaObject: any, userSocialMediaId: number) 
{
    const request = await fetch(`${api_url}/user/social-media/${userSocialMediaId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': String(getCookies('userToken')),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userSocialMediaObject)
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}

export async function deleteUserSocialMedia(userSocialMediaId: number)
{
    const request = await fetch(`${api_url}/user/social-media/${userSocialMediaId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': String(getCookies('userToken'))
        }
    });

    const response = await request.json();

    const data = ref<IUserState[]>(response);

    return data;
}