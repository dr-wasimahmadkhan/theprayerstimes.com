import React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

type Props = {
  isEdit: boolean,
  isDelete: boolean,
  isView: boolean,
  handleEdit: () => void,
  handleDelete: () => void,
  handleView: () => void,
  isEditImages: boolean,
  isEditAdditionalInfo: boolean,
  dataId: string,
};

const TableActions = (props: Props) => {
  const {
    isView,
    isEdit,
    isDelete,
    handleView,
    handleEdit,
    handleDelete,
    isEditImages,
    isEditAdditionalInfo,
    handleEditImages,
    handleEditAdditionalInfo,
    dataId,
  } = props;
  return (
    <td className="text-left">
      <UncontrolledDropdown>
        <DropdownToggle
          className="btn-icon-only text-light"
          href="#pablo"
          role="button"
          size="sm">
          <i className="fas fa-ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" left>
          {isView && (
            <DropdownItem onClick={() => handleView(dataId)}>View</DropdownItem>
          )}
          {isEdit && (
            <DropdownItem onClick={() => handleEdit(dataId)}>Edit</DropdownItem>
          )}
          {isEditImages && (
            <DropdownItem onClick={() => handleEditImages(dataId)}>
              Edit Images
            </DropdownItem>
          )}
          {isEditAdditionalInfo && (
            <DropdownItem onClick={() => handleEditAdditionalInfo(dataId)}>
              Edit Additional Info
            </DropdownItem>
          )}
          {isDelete && (
            <DropdownItem onClick={() => handleDelete(dataId)}>
              Delete
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </td>
  );
};

export { TableActions };
