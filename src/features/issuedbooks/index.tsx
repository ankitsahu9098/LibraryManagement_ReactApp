import { useEffect, useState } from "react";
import { ApiService } from "../../services";
import Loader from "../../shared/components/loader";
import { Grid } from "../../shared/components/grid";

interface IssuedBook {
    id: number;
    bookName: string;
    memberName: string;
    memberType: string;
    issueDate: string;
    returnDate: string;
}
 export default function IssuedBooks() {
    const [loading, setLoading] = useState(true);
    const [ issuedBooks, setIssuedBooks ] = useState<IssuedBook[]>([]);

    useEffect(() => {
        ApiService.get<IssuedBook[]>('/issuedbook')        
        .then(setIssuedBooks)
        .finally(() => setLoading(false));
    }, []);
    if(loading){
        return <Loader />
    }
    if(issuedBooks.length === 0){
        return <div>No Issued Books found.</div>
    }
    return (
        <div className="overflow-x-auto">
            <Grid
                data={issuedBooks}
                columns={[{field: "bookName", header: "Book Name"},{field: "memberName", header: "Member Name"},{field: "memberType", header: "Member Type"},{field: "issueDate", header: "Issue Date"},{field: "returnDate", header: "Return Date"}]}
            />
        </div>
    );
}
// }<div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
//             <thead className="bg-blue-500 text-white">
//                 <tr>
//                     <th className="px-6 py-3 text-left">Book Name</th>
//                     <th className="px-6 py-3 text-left">Member Name</th>
//                     <th className="px-6 py-3 text-left">Member Type</th>
//                     <th className="px-6 py-3 text-left">Issue Date</th>
//                     <th className="px-6 py-3 text-left">Return Date</th>
//                 </tr>
//             </thead>
//             <tbody className="bg-white">
//                 {issuedBooks.map(issuedBooks =>{
//                     return (
//                         <tr key={issuedBooks.id} className="border-b hover:bg-gray-100">
//                             <td className="px-6 py-3">{issuedBooks.bookName}</td>
//                             <td className="px-6 py-3">{issuedBooks.memberName}</td>
//                             <td className="px-6 py-3">{issuedBooks.memberType}</td>
//                             <td className="px-6 py-3">{issuedBooks.issueDate}</td>
//                             <td className="px-6 py-3">{issuedBooks.returnDate}</td>
//                         </tr>           
//                     )
//                 })}
//             </tbody>
//         </table>
//         </div>