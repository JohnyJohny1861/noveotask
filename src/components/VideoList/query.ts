import axios from '../../axios';

export const getVideoFiles = async() => {
    let data, error;
    try {
        const res = await axios('/files', { method: 'GET' });
        data = res.data
    } catch(err) {
        error = 'Oops something went wrong'
    }
    return { data, error }
}