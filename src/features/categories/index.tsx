import { useEffect, useState } from "react";
import { ApiService } from "../../services";
import Loader from "../../shared/components/loader";
import { Grid } from "../../shared/components/grid";

interface Category {
    id: number;
    name: string;
}

export default function Categories() {
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


//     return (

//         <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
//             <thead className="bg-blue-500 text-white">
//                 <tr>
//                     <th className="px-6 py-3 text-left">Name</th>
//                 </tr>
//             </thead>
//             <tbody className="bg-white">
//                 {categories.map(category => (
//                     <tr key={category.id} className="border-b hover:bg-gray-100">
//                         <td className="px-6 py-3">{category.name}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//         </div>
//     );

// }