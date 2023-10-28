import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation(async (newUser) => {
        const { data } = await axios.post(BASE_URL, newUser);
        return data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    });
}