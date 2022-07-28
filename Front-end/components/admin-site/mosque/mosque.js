import React, { useState } from 'react';
import SecureTemplate from '@/layouts/secure-template';
import DynamicTable, { TableActions } from '@/components/table';
import { Stats } from '@/adminSite/common';
import { tableHeadings } from '@/constants/mosque';
import Router from 'next/router';
import { GET_ALL_MOSQUES, DELETE_MOSQUE } from './queries';
import { useQuery, useMutation } from 'react-query';
import reactQueryConfig from '@/constants/react-query-config';
import Pagination from '@/utils/pagination';
import _get from 'lodash.get';
import { ConfirmationModal, ProcessingModal } from '@/components/modal';
import { Message } from '@/components/alert/message';
import Letter from './letter';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Mosque = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [mosqueToDelete, setMosqueToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [mosqueDataToPrint, setMosqueDataToPrint] = useState({});
  const [loadingPdf, setLoadingPdf] = useState(false);
  const { mutate: deleteMosque, isLoading: isLoadingDelete } =
    useMutation(DELETE_MOSQUE);
  const [mosqueQueryParams, setMosqueQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: mosqueData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_MOSQUES', mosqueQueryParams], GET_ALL_MOSQUES, {
    ...reactQueryConfig,
    onSuccess: res => {
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_mosques,
        res.page_no,
        res.data.length,
      );
      return setPaginationData(result);
    },
    onError: () => {
      setPaginationData({});
    },
  });
  console.log('mosqueData', mosqueData);
  const handleCreate = () => {
    Router.push('/admin/mosques/create', '/admin/mosques/create', {
      shallow: true,
    });
  };
  const handleNext = currentPage => {
    setMosqueQueryParams({
      ...mosqueQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setMosqueQueryParams({
      ...mosqueQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setMosqueQueryParams({
      ...mosqueQueryParams,
      page_no: page,
    });
  };

  const handleView = id => {
    Router.push(`/admin/mosques/${id}`, `/admin/mosques/${id}`, {
      shallow: true,
    });
  };

  const handleEdit = id => {
    Router.push(`/admin/mosques/${id}/edit`, `/admin/mosques/${id}/edit`, {
      shallow: true,
    });
  };
  const handleEditImages = id => {
    Router.push(`/admin/mosques/${id}/images`, `/admin/mosques/${id}/images`, {
      shallow: true,
    });
  };
  const handleEditAdditionalInfo = id => {
    Router.push(
      `/admin/mosques/${id}/additional-info`,
      `/admin/mosques/${id}/additional-info`,
      {
        shallow: true,
      },
    );
  };
  const handleDelete = id => {
    setDeleteModal(true);
    const findMosque = _get(mosqueData, 'data', []).find(
      booking => booking._id === id,
    );
    setMosqueToDelete(findMosque);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteMosque(_get(mosqueToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  const printDocument = mosque => {
    setMosqueDataToPrint(mosque);
    setLoadingPdf(true);
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      const input = document.getElementById('divToPrint');
      html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4', false);
        pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
        // pdf.output('dataurlnewwindow');
        pdf.save(`${mosque.name}.pdf`);
      });
      setMosqueDataToPrint({});
      setLoadingPdf(false);
    }, 1000);
  };
  return (
    <SecureTemplate title="Mosques">
      <Stats />
      <DynamicTable
        heading="Mosques"
        tableHeadings={tableHeadings}
        isCreateButton={false}
        handleCreate={handleCreate}
        createButtonText="Create Mosque"
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(mosqueData, 'data', []).length === 0}>
        {!isError &&
          _get(mosqueData, 'data', []).map((mosque, i) => (
            <tr key={i}>
              <td scope="row">{_get(mosque, 'name', '-')}</td>
              <td>{_get(mosque, 'city', '-')}</td>
              <td>{_get(mosque, 'state', '-')}</td>
              <td>
                {_get(mosque, 'user_id.verification_code', '')}
                {!_get(mosque, 'user_id.is_verified', false) && (
                  <i
                    onClick={() => printDocument(mosque)}
                    className="ml-3 ni ni-single-copy-04 cursor-pointer"
                  />
                )}
              </td>
              <td>
                {_get(mosque, 'user_id.is_verified', false)
                  ? 'Verified'
                  : 'Not Verified'}
              </td>
              <TableActions
                dataId={_get(mosque, '_id')}
                isView={true}
                handleView={handleView}
                isEdit={true}
                handleEdit={handleEdit}
                isDelete={true}
                handleDelete={handleDelete}
                isEditImages={true}
                isEditAdditionalInfo={true}
                handleEditImages={handleEditImages}
                handleEditAdditionalInfo={handleEditAdditionalInfo}
              />
            </tr>
          ))}
      </DynamicTable>
      <ConfirmationModal
        heading="Confirm Delete"
        modalOpen={deleteModal}
        toggleModal={toggleDeleteModal}
        handleCancelButton={toggleDeleteModal}
        isCancelButton={true}
        isConfirmButton={true}
        confirmButtonText="Delete"
        handleConfirmButton={handleConfirmDelete}>
        <p>
          Are you sure you want to delete mosque of
          <strong> {mosqueToDelete?.name}</strong>
        </p>
      </ConfirmationModal>
      <Letter mosqueDataToPrint={mosqueDataToPrint} />
      {(isLoadingDelete || loadingPdf) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default Mosque;
