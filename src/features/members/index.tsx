import { useEffect, useState } from "react";
import { ApiService } from "../../services";
import Loader from "../../shared/components/loader";

interface Member {
    id: number;
    name: string;
    memberType: string;
}  

export default function Members() {
    const[loading, setLoading] = useState(true);
    const [ members, setMenbers ] = useState<Member[]>([]); 

    useEffect(() =>{
        ApiService.get<Member[]>('/members')
        .then(setMenbers)
        .finally(() => setLoading(false));
    }, []);
    if(loading){
        return <Loader />;
    }
    if(members.length === 0){
        return <div>No Members found.</div>
    }
    return (
        <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
                <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Type</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {members.map(member =>{
                    return (
                        <tr key={member.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-3">{member.name}</td>
                            <td className="px-6 py-3">{member.memberType}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>    
        </div>
    );
}
