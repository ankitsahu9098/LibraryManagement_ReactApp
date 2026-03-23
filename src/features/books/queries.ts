import { execFile } from "child_process";
import { use } from "react";
import { ApiService } from "../../services";
import { on } from "events";


const QUERY_KEY = ['@mater/books'];

export function useBooksQuery() { 
    return useBooksQuery({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            return await ApiService.get<Master.BookItem[]>("master/books");
    },  
    });
}

export function useNewStateMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Master.BookForm) => {
            await ApiService.post<Master.BookItem>("master/books", data),
        onSuccess: result => {
            if(!result){
                return;
            }
            const existing  = queryClient.getQueryData<Master.BookItem[]>(QUERY_KEY);                             
            if(!existing){
                return;
            }
            const index = existing.findIndex(b => b.id === result.id);
            const first = existing.slice(0, index);
            const last = existing.slice(index + 1);

            queryClient.setQueryData(QUERY_KEY, [...first, result, ...last]);
        },
    });
    }
    }