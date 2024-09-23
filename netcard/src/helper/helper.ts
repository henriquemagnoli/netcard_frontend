export function setCookie(name: string, value: string, expireDateInSeconds: number)
{
    const date = new Date();

    date.setTime(date.getTime() + (expireDateInSeconds * 1000));

    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

export function getCookies(name: string)
{
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if(parts.length == 2)
        return parts.pop()?.split(";").shift();
}

export function deleteCookies()
{
    const cookieNames: Array<String> = ['userId', 
                                        'userName', 
                                        'userEmail',
                                        'accessToken'];
    const date = new Date();

    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    cookieNames.forEach(element => {
        document.cookie = `${element}=; expires=${date.toUTCString()}; path=/`;
    });
}