import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBusCruise } from '../../features/Actions/Bus-Cruise/bus_cruiseAction';

const Bus_Cruise_Contact = () => {
  const dispatch = useDispatch();
  const { bus_cruise, isSuccess, isError } = useSelector((state)=> state.buscruise)

  useEffect(()=>{
    dispatch(getBusCruise())
  },[])
  
  if(isError){
    return(
      <main className="flex-1 p-8 mt-16 ml-64">
        <div>No Contact Found</div>
      </main>
    )
  }

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>Bus_Cruise_Contact</div>
    </main>
  )
}

export default Bus_Cruise_Contact