import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

export function useUsers() {
    return useQuery('users', async () => {
        const { data } = await axios.get(BASE_URL);
        return data;
    });
}