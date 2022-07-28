import React, {useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {DELETE_USER, GET_ALL_USERS, UPDATE_USER}
  from "@/adminSite/user/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from "lodash.get";
import Router from "next/router";
import {Message} from "@/components/alert/message";
import SecureTemplate from "@/layouts/secure-template";
import {Stats} from "@/adminSite/common";
import DynamicTable, {TableActions} from "@/components/table";
import {managementTableHeadings, userTableHeadings} from "@/constants/user";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";

type Props = {
  isManagement: boolean,
}
const Users = (props: Props) => {
  const { isManagement } = props;
  const { user_id } = getLocalStorageValues();
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteUser,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_USER);
  const [userQueryParams, setUserQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
    is_admin: false,
    role: isManagement ? 'customer_care' : 'user',
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    mutate: updateUser,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_USER);
  const {
    data: usersData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_USERS', userQueryParams],
    GET_ALL_USERS, {
      ...reactQueryConfig,
      onSuccess: res => {
        const { result } = Pagination(
          res.records_per_page,
          res.total_number_of_users,
          res.page_no,
          res.data.length,
        );
        return setPaginationData(result);
      },
      onError: () => {
        setPaginationData({});
      },
    });
  const handleNext = currentPage => {
    setUserQueryParams({
      ...userQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setUserQueryParams({
      ...userQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setUserQueryParams({
      ...userQueryParams,
      page_no: page,
    });
  };

  const handleCreateUser = () => {
    Router.push(
      `/admin/management/create`,
      `/admin/management/create`,
      { shallow: true },
    );
  };
  const handleView = id => {
    if (isManagement) {
      Router.push(
        `/admin/management/${id}`,
        `/admin/management/${id}`,
        { shallow: true },
      );
    } else {
      Router.push(
        `/admin/users/${id}`,
        `/admin/users/${id}`,
        { shallow: true },
      );
    }

  };

  const handleDelete = id => {
    setDeleteModal(true);
    const findUser = _get(usersData, 'data', []).find(
      user => user._id === id);
    setUserToDelete(findUser);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteUser(_get(userToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  const handleActive = async (e, user) => {
    const { checked } = e.target;
    const data = {
      full_name: user.full_name,
      image_id: user.image_id,
      is_active: checked,
      updated_by: user_id,
    };
    await updateUser({
      id: user._id,
      data: data,
    }, {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  console.log("usersData", usersData);
  return (
    <SecureTemplate title={isManagement ? "Management" : "Users"}>
      <Stats />
      <DynamicTable
        heading={isManagement ? "Management" : "Users"}
        tableHeadings={isManagement ? managementTableHeadings : userTableHeadings}
        isCreateButton={isManagement}
        createButtonText="Create Management"
        handleCreate={handleCreateUser}
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(usersData, 'data', []).length === 0}
      >
        {!isError && _get(usersData, 'data',
          []).map((user, i) =>{
          return (
            <tr key={i}>
              <td scope="row">
                <div className="table-data" style={{ maxWidth: "350px"}}>
                  {_get(user, 'full_name', '_')}
                </div>
              </td>
              <td>
                {_get(user, 'email', '-')}
              </td>
              {!isManagement && (
                <td scope="row">
                  {_get(user, 'is_verified', false) ? 'Verified' : "Not Verified"}
                </td>
              )}
              {isManagement && (
                <td scope="row">
                    Customer Care
                </td>
              )}
              <td>
                <input
                  aria-label="Checkbox for following text input"
                  type="checkbox"
                  checked={_get(user, 'is_active', false)}
                  onChange={e => handleActive(e, user)}
                />
              </td>
              <TableActions
                dataId={_get(user, '_id')}
                isView={true}
                handleView={handleView}
                isEdit={false}
                isDelete={true}
                handleDelete={handleDelete}
              />
            </tr>
          );})}
      </DynamicTable>
      <ConfirmationModal
        heading="Confirm Delete"
        modalOpen={deleteModal}
        toggleModal={toggleDeleteModal}
        handleCancelButton={toggleDeleteModal}
        isCancelButton={true}
        isConfirmButton={true}
        confirmButtonText="Delete"
        handleConfirmButton={handleConfirmDelete}
      >
        <p>
          Are you sure you want to delete {isManagement ? "Management" : "User"}
          <strong> {userToDelete?.full_name}</strong>
        </p>
      </ConfirmationModal>
      {(isLoadingDelete || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default Users;