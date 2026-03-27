import { useParams } from "react-router";
import { useUpdateBookMutation } from "../queries";
import { useCallback } from "react";
import { ApiService } from "../../../services";
import Form from "../components/Form";
interface EditRouteParams extends Record<string, string>{
    bookId: string;
}
export default function Edit() {  
    const { bookId  } = useParams<EditRouteParams>();
    const {mutateAsync } = useUpdateBookMutation(parseInt(bookId ?? "0", 10));

    const handleLoad = useCallback(
        async function (){
            if(!bookId){
                return{
                    id: 0,
                    name:"",
                    price:0,
                    publisher: "",
                    author: "",
                    categoryId: 0,
                }
            }
            const data = await ApiService.get<Master.BookItem>(
                '/books/' + bookId
            );
            console.log(data);
            if(!data){
                return{
                    id: 0,
                    name: '',
                    price: 0,
                    publisher: '',
                    author: ''
                };
            }
            return data;
        },[bookId]
            
    );
    return (
       <Form
            onLoad={handleLoad}
            onSubmit={async (data) => {
                await mutateAsync(data);
            } }
            submitCaption="Update" categories={[]}/>
    );
}