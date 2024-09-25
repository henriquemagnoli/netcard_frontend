import { ref } from "vue";

const api_url = import.meta.env.VITE_URL_API;

export interface IJobsState
{
    isLoadingJobs: boolean,
    messagesJobs: string,
    statusCodeJobs: number
}

export async function getAllJobs() 
{
    const request = await fetch(`${api_url}/jobs`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    });

    const response = await request.json();

    const data = ref<IJobsState[]>(response);

    return data;
}