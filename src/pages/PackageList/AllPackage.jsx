import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPackages } from '../../features/Actions/TripPackages/packageAction';

const AllPackage = () => {
   const dispatch = useDispatch();
   const { packageInfo } = useSelector((state)=> state.packages);

   useEffect(()=>{
    dispatch(getAllPackages())
   },[])

  return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div>AllPackage</div>
        </main>
  )
}

export default AllPackage