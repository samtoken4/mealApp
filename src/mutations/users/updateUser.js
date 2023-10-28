import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation(async (updatedUser) => {
        const { data } = await axios.put(`${BASE_URL}/${updatedUser._id}`, updatedUser);
        return data;
    }, {
        onMutate: async (updatedUser) => {
            await queryClient.cancelQueries('users');
            const previousUsers = queryClient.getQueryData('users');
            queryClient.setQueryData('users', (old) => {
                return old.map(user => (user._id === updatedUser._id ? updatedUser : user));
            });
            return { previousUsers };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData('users', context.previousUsers);
        },
        onSettled: () => {
            queryClient.invalidateQueries('users');
        }
    });
}