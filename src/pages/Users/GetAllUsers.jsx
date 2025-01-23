import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/Actions/Users/getAllUsersAction";
import Pagination from "../../components/Pagination/Pagination";
import { useForm } from "react-hook-form";

const GetAllUsers = () => {
  const dispatch = useDispatch();
  const { usersInfo, paginate } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1)
  const { register, watch ,handleSubmit }= useForm();

  let TotalPage = Math.ceil(paginate?.total/paginate?.limit)
  console.log("the pages are", TotalPage)

  const handlePageChange = (page)=>{
    if(page>0 && page <= TotalPage ){
      setCurrentPage(page)
    }
  }
 
  const searchQuery = watch("search")

  useEffect(() => {
    dispatch(getAllUsers({search:searchQuery ?? "", page:currentPage}));
  }, [dispatch,currentPage, searchQuery]);

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">All users</div>
      <div className="relative ">
        <div>
          <form className="flex items-center justify-center space-x-2">
            <input
              id="search"
              type="text"
              {...register("search")}
              placeholder="Search By Email or Name"
              className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
            />
          </form>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile Number
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
                  <td className="px-6 py-4">{info?.mobileNumber ?? "N/A"}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total Users
              </th>
              <td className="px-6 py-3">{paginate.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Pagination paginate={paginate} currentPage={currentPage} totalPages={TotalPage} handlePageClick={handlePageChange} />
    </main>
  );
};

export default GetAllUsers;
