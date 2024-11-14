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
                                        'userToken',
                                        'userIsVisible',
                                        'userExpiresIn',
                                        'userLatitude',
                                        'userLongitude'];
    const date = new Date();

    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    cookieNames.forEach(element => {
        document.cookie = `${element}=; expires=${date.toUTCString()}; path=/`;
    });
}

export function deleteCookiesByName(name: string)
{
    const date = new Date();

    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}

export function calculateAge(birthDate: Date) : number
{
    const timeDiff = Math.abs(Date.now() - birthDate.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
}

export function calculateDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) : number
{
    const p = 0.017453292519943295; // pi / 180
    const c = Math.cos; // Cosseno
    const a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2; // Parte da Formula de Haversine
    
    return 12742 * Math.asin(Math.sqrt(a)); // 12742 (Diâmetro da Terra) * Arcoseno da raiz quadrada de a
}