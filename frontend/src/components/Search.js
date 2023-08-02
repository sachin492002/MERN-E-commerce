import React from "react";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
export default function Search({updateFilters,text}){
    const location = useLocation();
    const navigate = useHistory();
    const { hash, pathname, search } = location;
    return(
    <div className='flex w-full justify-center items-center'>
    <form onSubmit={(e) => {e.preventDefault();if(pathname!=='products'&&!search) navigate.push('/products')}}>
        <div className="form-control" >      <input
                type="text"
                name="text"
                placeholder="search"
                className="p-2 w-[80vw] text-gray-400  border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                value={text}
                onChange={updateFilters}
            />
        </div>
    </form>
    </div>)
}
