import axios from '../../axios';

export const uploadVideo = async(file: File) => {
    let data, error;

    let formData = new FormData();
    formData.append('file', file);
    try {
        const res = await axios('upload', {
            method: 'POST',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        data = res.data
    } catch(err) {
        error = 'Oops something went wrong'
    }
    return { data, error }
}