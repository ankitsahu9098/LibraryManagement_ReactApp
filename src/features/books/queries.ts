import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";  
import { ApiService } from "../../services";

const QUERY_KEY = ['@master/books'];


export function useBooksQuery() { 
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            return await ApiService.get<Master.BookItem[]>("master/books");
    },  
    });
}

export function  useNewStateMutation() {
  const queryClient = useQueryClient();
  return useMutation({

    mutationFn: async (book: Master.BookForm) =>
      await ApiService.post<Master.BookItem>('/books/', book),

    onSuccess: result => {
      if (!result) {
        return;
      }
      const existing = queryClient.getQueryData<Master.BookItem[]>(QUERY_KEY);
      if (!existing) {
        return;
      }
      queryClient.setQueryData(QUERY_KEY, [...existing, result]);
    },
  });
}

export function useUpdateBookMutation(bookId: number){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(book: Master.BookForm) =>
            await ApiService.put<Master.BookItem>('/book/'+bookId, book),
        onSuccess: result =>{
            if(!result){
                return;
            }
            const existing = queryClient.getQueryData<Master.BookItem[]>(QUERY_KEY);
            if(!existing ){
                return;
            }

            const index = existing.findIndex(item => item.id === bookId);
            const first = existing.slice(0, index);
            const next = existing.slice(index + 1);

            queryClient.setQueryData(QUERY_KEY, [...first, result, ...next]);
        }
    })
}