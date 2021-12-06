import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../axios';

export type UploadVideoType = { 
    data: string | null,
    error: string | null
}

export const uploadVideo = async(file: File): Promise<UploadVideoType> => {
    let formData = new FormData();
    formData.append('video', file);
    try {
        const {data}:AxiosResponse = await axios('upload', {
            method: 'POST',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return { data, error: null }
    } catch(error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
        return { data: null, error: err.response?.data || 'Oops something went wrong' }
    }
}