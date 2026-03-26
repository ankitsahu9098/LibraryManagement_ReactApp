import { Navigate, Route, Routes } from "react-router";
import List from "../categories/pages/List";

export default function Categories(){
    return(
        <Routes>
            <Route index element={<Navigate to="categories" />}/>
            <Route path="categories" element={<List />} />
            {/* <Route path="create" element={<Create />} /> */}
        </Routes>
    )
}