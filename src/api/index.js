import axios from 'axios';

export const API = {
    async getUsers() {
        try {
            let result = (await axios.get('https://randomuser.me/api?results=5')).data;

            return {
                success: true,  
                data: result
            };
        } catch (error) {
            console.error('getUsers request error:', error);

            return {
                success: false,  
                message: error?.response?.data || 'Server error'
            };
        }
    }

}