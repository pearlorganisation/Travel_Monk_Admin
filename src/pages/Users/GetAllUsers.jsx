import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/Actions/Users/getAllUsersAction";

const GetAllUsers = () => {
    const dispatch = useDispatch();
    const { usersInfo } = useSelector((state)=>state.users);
    useEffect(()=>{
        dispatch(getAllUsers())
    },[])
 
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">All users</div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usersInfo) &&
              usersInfo?.map((info) => (
                <tr
                  key={info._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {info?.name}
                  </th>
                  <td className="px-6 py-4">{info?.email}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total Users
              </th>
              <td className="px-6 py-3">{usersInfo.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
};

export default GetAllUsers;
