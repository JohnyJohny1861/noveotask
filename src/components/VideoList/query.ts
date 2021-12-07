
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../axios';
import { VideosType } from './types';

export type GetVideoFilesType = { 
    data: VideosType | null,
    error: string | null
}

export const getVideoFiles = async(): Promise<GetVideoFilesType> => {
    try {
        const {data}:AxiosResponse<VideosType> = await axios('files', { method: 'GET' });
        return { data, error: null }
    } catch(error) {
        const err = error as AxiosError;        
        return { data: null, error: err.response?.data || 'Oops something went wrong' }
    }
}