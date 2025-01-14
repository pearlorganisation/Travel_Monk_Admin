import { useLocation } from "react-router-dom";

const ViewDestination = () => {
  const location = useLocation();
  const destination = location.state;

  console.log("Destination", destination);

  return (
    <div className="flex-1 ml-72 mt-20">
      <h1 className="text-3xl"> Destination Name : {destination?.name}</h1>

      <img src={``} />
    </div>
  );
};

export default ViewDestination;
