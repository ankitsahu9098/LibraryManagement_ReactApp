
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "../../../shared/components/buttons";


interface FormProps {
    onSubmit: (p: Master.BookForm) => Promise<void>;
    onLoad?: () => Promise<Master.BookItem>;
    submitCaption: string;
}

export default function Form({onLoad, onSubmit, ...props }: FormProps  ) {
const navigate = useNavigate();
const { register, handleSubmit, formState } = useForm<Master.BookForm>({
    defaultValues: onLoad,
});

return (
    <div>
        <form
        onSubmit={handleSubmit(async data => {
            await onSubmit(data);
            navigate('../books');
        })}
        >
            <input type="text" {...register("name")} placeholder="Name" />    
            <input type="text" {...register("publisher")} placeholder="Publisher" />
            <input type="text" {...register("author")} placeholder="Author" />
            <input type="text" {...register("category")} placeholder="Category" />
        
        <Button
            caption={props.submitCaption}
            disabled={formState.isSubmitting}
        />  
        </form>
    </div>
);
}   