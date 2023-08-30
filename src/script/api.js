import axios from 'axios';

export async function create(element, endpoint) {

    try {
        const response = await axios.post(endpoint, element);
        console.log("response create", response.data)
        return response
    } catch (error) {
        console.error('Error creating element:', error);
    }
}

export async function get(endpoint) {
    try {
        const response = await axios.get(endpoint);
        console.log('Petición realizada con éxito');
        return response.data;
    } catch (error) {
        console.error('Error fetching elements:', error);
        return [];
    }
}

export async function update(element, endpoint) {

    try {
        const response = await axios.put(`${endpoint}${element.id}`, {
            ...element
        });
        return response
    } catch (error) {
        console.error('Error updating element:', error);
    }
}

export async function deleteElement(elementID, endpoint) {
    try {
        await axios.delete(`${endpoint}${elementID}`);
        return true
    } catch (error) {
        console.error('Error deleting element:', error);
    }
}