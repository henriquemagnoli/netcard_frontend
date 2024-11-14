import { setCookie, getCookies, deleteCookies } from "../helper/helper"
import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_AUTHENTICATION;

export interface ILoginState
{
    isLoading: boolean,
    messages: string,
    statusCode: number
}

export async function signIn(email: string, password: string) 
{
    // Reset cookies from local machine
    deleteCookies();
    
    var userCredentials: Object = {
        email: email,
        password: password
    };

    const request = await fetch(`${api_url}/signIn`, {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
    })

    const response = await request.json();

    const expiryIn = 999999;

    if(response.statusCode == 200)
    {   
        setCookie('userId', response.data.ID, expiryIn);
        setCookie('userName', response.data.Name, expiryIn);
        setCookie('userEmail', response.data.Email, expiryIn);
        setCookie('userToken', response.data.Token, expiryIn);
        setCookie('userIsVisible', response.data.IsVisible, expiryIn);
        setCookie('userExpiresIn', response.data.ExpiresIn, expiryIn);
    }

    const data = ref<ILoginState>(response);

    return data;
}

export async function signUp(userObject: any)
{
    const request = await fetch(`${api_url}/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObject)
    });

    const response = await request.json();

    const data = ref<ILoginState[]>(response);
    
    return data;
}

export function auth(to, from, next)
{
    if(getCookies('userToken') != undefined)
    {
        let currentDate = new Date();
        let expiresDate = new Date(String(getCookies('userExpiresIn')));

        if(currentDate > expiresDate)
        {
            deleteCookies();
            next('/login');
        }
        else
            next();
    }
    else
    {
        next('/login');
    }
}