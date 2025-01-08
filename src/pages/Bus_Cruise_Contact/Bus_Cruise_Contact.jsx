import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock, Mail, MapPin, MessageSquare, User, Users } from "lucide-react";
import { getBusCruise } from "../../features/Actions/Bus-Cruise/bus_cruiseAction";
import { useLocation, useNavigate } from "react-router-dom";

const Bus_Cruise_Contact = () => {
  const cruiseTypes = [
    {
      id: 1,
      type: "bus",
      icon: "🚌",
    },
    {
      id: 2,
      type: "cruise",
      icon: "🚢",
    },
  ];

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [cruiseType, setCruiseType] = useState([]);

  const handleSearch = (type) => {
    let updatedType = [...cruiseType];

    if (updatedType.includes(type)) {
      updatedType = updatedType.filter((t) => t != type);
    } else {
      updatedType.push(type);
    }
    setCruiseType(updatedType);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const existingCategory = searchParams.getAll("type");

    if (cruiseType.sort().join(",") !== existingCategory.sort().join(",")) {
      searchParams.delete("type");

      cruiseType.forEach((type) => {
        searchParams.append("type", type);
      });
      navigate(
        {
          pathname: location.pathname,
          search: searchParams.toString(),
        },
        { replace: true }
      );
    }

    dispatch(
      getBusCruise({
        type: cruiseType,
      })
    );
  }, [cruiseType, navigate, dispatch, location]);

  const { bus_cruise, isSuccess, isError } = useSelector(
    (state) => state.buscruise
  );

  useEffect(() => {
    dispatch(getBusCruise());
  }, []);

  if (isError) {
    return (
      <main className="flex-1 p-8 mt-16 ml-64">
        <div className="text-red-500 text-xl font-semibold">
          No Contact Found
        </div>
      </main>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="flex-1 p-8 mt-16 ml-64 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Bus & Cruise Bookings
        </h1>

        <div className="flex space-x-4">
          {cruiseTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSearch(type.type)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-lg transition-all duration-300 ${
                cruiseType.includes(type.type)
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <span className="capitalize font-medium">{type.type}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {Array.isArray(bus_cruise) &&
          bus_cruise?.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Name</p>
                      <p className="font-semibold text-gray-800">
                        {contact.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Email</p>
                      <p className="font-semibold text-gray-800">
                        {contact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Users className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Number of Seats
                      </p>
                      <p className="font-semibold text-gray-800">
                        {contact.numberOfSeats}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Start Destination
                      </p>
                      <p className="font-semibold text-gray-800">
                        {contact.startDestination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        End Destination
                      </p>
                      <p className="font-semibold text-gray-800">
                        {contact.endDestination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Clock className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Booking Date
                      </p>
                      <p className="font-semibold text-gray-800">
                        {formatDate(contact.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-4 py-2 text-sm rounded-lg ${
                        contact.type === "bus"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      } font-semibold capitalize`}
                    >
                      {contact.type === "bus" ? "🚌 " : "🚢 "}
                      {contact.type}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg mt-1">
                      <MessageSquare className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Message
                      </p>
                      <p className="font-semibold text-gray-800 break-words">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Bus_Cruise_Contact;
