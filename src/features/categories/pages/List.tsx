import { useEffect, useState } from "react";
import { ApiService } from "../../../services";
import Loader from "../../../shared/components/loader";
import { Grid } from "../../../shared/components/grid";

interface Category {
    id: number;
    name: string;
}

export default function List() {
    const [loading, setLoading] = useState(true);
    const [ categories, setCategories ] = useState<Category[]>([]);

    useEffect(() => {
        ApiService.get<Category[]>('/categories')        
        .then(setCategories)
        .finally(() => setLoading(false));
    }, []);
    
    if(loading){
        return <Loader />
    }
    if(categories.length === 0){
        return <div>No Categories found.</div>
    }
    return (
        <div className="overflow-x-auto">
            <Grid
             data = {categories}
             columns={
                [{field: "name", header: "Name"}]
             }

            />
        </div>


    );
}
