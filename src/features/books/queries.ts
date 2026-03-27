import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";  
import { ApiService } from "../../services";
import { use } from "react";

const QUERY_KEY = ['@master/books'];


export function useBooksQuery() { 
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            return await ApiService.get<Master.BookItem[]>('/books/');
    },  
    });
}

export function  useNewBookMutation() {
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
            await ApiService.put<Master.BookItem>('/books/'+ bookId, book),
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

export function useRemoveBookMutation(bookId: number){
  const queryClient = useQueryClient();
  const rs =  useMutation({
    mutationFn: (id: number) => ApiService.del('/books/'+ id),
    onSuccess: (_, id) => {
      const data  = queryClient.getQueryData<Master.BookItem[]>([QUERY_KEY]);
      if(!data){
        return;
      }
      const newData = data.filter(item => item.id !== id  );
      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });
  return  rs;
}