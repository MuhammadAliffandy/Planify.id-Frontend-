import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_PATCH, PROVIDER_POST, PROVIDER_PUT } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getContentById = async (contentId) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/ai/${contentId}`, token)
    return response
}

export const generateAI = async (data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_POST(`api/v1/ai/generate-ai`,data , token)
    return response
}

export const refreshAI = async (data) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_PATCH(`api/v1/ai/refresh-ai`,data , token)
    return response
}

export const deleteContent = async (contentId) => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_DELETE(`api/v1/ai/${contentId}`, token)
    return response
}
