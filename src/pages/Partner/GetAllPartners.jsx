import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePartnerById,
  getAllPartner,
} from "../../features/Actions/Partner/getAllPartnerAction";
import { getPartnerType } from "../../features/Actions/Partner/partnerTypeAction";

import Modal from "../../components/Modal/PartnerModal";
import AddPartner from "./AddPartner";
import AddPartnerType from "./AddPartnerType";
import { Button } from "@mui/material";
import ConfirmDeleteModal from "../../components/Modal/ConfirmDeleteModal";
import { baseURL } from "../../services/axiosInterceptor";
import { Link } from "react-router-dom";

const GetAllPartners = () => {
  const dispatch = useDispatch();
  const { partner } = useSelector((state) => state.partners);
  useEffect(() => {
    dispatch(getAllPartner());
  }, []);
  useEffect(() => {
    dispatch(getPartnerType());
  }, [dispatch]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // To differentiate between "Add Partner" and "Add Partner Type"
  const [open, setOpen] = useState(false);
  const [selectdPartner, setSelectedPartner] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  console.log("the partner id is", partnerId);
  /**delete modal */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const deleteHandle = (id) => {
    setPartnerId(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  const confirmDelete = () => {
    dispatch(deletePartnerById(partnerId));
    setIsDeleteModalOpen(!isDeleteModalOpen);
    // dispatch(getFullyCustomizedEnquiries({page:currentPage}))
  };
  const handleOpen = (partner) => {
    setSelectedPartner(partner);
    setOpen(true);
  };
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-4xl font-bold mb-4">All Partners</h1>
        <div className="flex items-center justify-end flex-column flex-wrap md:flex-row gap-3 space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => openModal("Add Partner Type")}
          >
            Add Partner Type
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => openModal("Add Partner")}
          >
            Add Partner
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Partner Name
              </th>
              <th scope="col" className="px-6 py-3">
                Partner Type
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(partner) &&
              partner?.map((part) => (
                <tr
                  key={part?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${baseURL}/${part.partnerLogo.path}`}
                      alt="partner"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {part?.partnerName}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {part?.partnerType?.partnerTypeName}
                  </td>
                  <td className="px-6 py-4">
                    {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit Partner
                                        </a> */}
                    <Link
                      to={`/update-partner/${part?._id}`}
                      state={{ partnerData: part }}
                    >
                      <Button variant="outlined" color="primary">
                        Edit Partner
                      </Button>
                    </Link>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => deleteHandle(part._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          {modalType === "Add Partner" ? (
            <AddPartner closeModal={closeModal} />
          ) : modalType === "Add Partner Type" ? (
            <AddPartnerType closeModal={closeModal} />
          ) : null}
        </Modal>
      )}
      {/**Delete Modal */}
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          confirmDelete={confirmDelete}
          setShowDeleteModal={deleteHandle}
        />
      )}
    </main>
  );
};

export default GetAllPartners;
