import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation(async (userId) => {
        await axios.delete(`${BASE_URL}/${userId}`);
    }, {
        onMutate: async (userId) => {
            await queryClient.cancelQueries('users');
            const previousUsers = queryClient.getQueryData('users');
            queryClient.setQueryData('users', (old) => {
                return old.filter(user => user._id !== userId);
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
