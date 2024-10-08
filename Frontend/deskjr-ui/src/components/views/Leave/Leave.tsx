import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toastHelper";
import leaveService from "../../../services/LeaveService";
import Card from "../../CommonComponents/Card";
import Board from "../../CommonComponents/Board";
import ConfirmDelete from "../../CommonComponents/ConfirmDelete";
import LeaveEditForm from "./LeaveEditForm";
import { formatDate } from "date-fns";
import { status } from "../../../types/status";
import StatusIcon from "../../CommonComponents/StatusIcons/StatusIcon";

const Leave: any = (props: any) => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedLeave, setSelectedLeave] = useState("");
  const [modalModeName, setModalModeName] = useState("");
  const [modalDataTarget] = useState("leaveAddModal");
  const [isTrigger, setIsTrigger] = useState(false);
  const [formToBeClosed, setFormToBeClosed] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getList();
  }, [isTrigger]);

  const getList = async () => {
    leaveService
      .getLeavesByEmployeeId()
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  const onConfirmDelete = async (e: any) => {
    e.preventDefault();

    if (selectedItemId) {
      leaveService
        .deleteLeave(selectedItemId)
        .then(() => {
          showSuccessToast("Successful!");
          setIsTrigger(true);
        })
        .catch((err) => {
          showErrorToast(err);
        });
    }
    onModalClose();
  };

  const handleEdit = (leave: any) => {
    setSelectedItemId(leave.id);
    setModalModeName("Update");
    setFormToBeClosed("form-close");
    if (props.currentUser) {
      setSelectedLeave((prevState: any) => ({
        ...prevState
      }));
    }
  };

  const handleDelete = (leave: any) => {
    setSelectedItemId(leave.id);
    setFormToBeClosed("delete-form-closed");
    setIsDeleteModalOpen(true);
  };

  const isEditable = (item: any) => {
    if (item.statusOfLeave === status.Pending) return true;
    return false;
  };

  const isDeletable = (item: any) => {
    if (
      item.statusOfLeave === status.Cancelled ||
      item.statusOfLeave === status.Pending
    )
      return true;
    return false;
  };

  const onModalClose = () => {
    setSelectedItemId("");
    setSelectedLeave("");
    setModalModeName("");
    setIsTrigger(false);
    const close_button = document.getElementById(formToBeClosed);
    close_button?.click();
    setFormToBeClosed("");
    setIsDeleteModalOpen(false);
  };

  const renderColumn = (column: string, value: any) => {
    if (column === "statusOfLeave") {
      return value || value == 0 ? <StatusIcon status={value} /> : value;
    } else if (column === "startDate") {
      return formatDate(new Date(value), "dd/MM/yyyy");
    } else if (column === "endDate") {
      return formatDate(new Date(value), "dd/MM/yyyy");
    } else if (column === "leaveType") {
      return value && value.name;
    } else if (column === "approvedBy") {
      return value && value.name;
    }

    return value;
  };

  const columnNames = {
    startDate: "Start Date",
    endDate: "End Date",
    leaveType: "Leave Type",
    requestComments: "Request Comments",
    statusOfLeave: "Leave Status",
    approvedBy: "Approved/Denied By",
  };

  return (
    <>
      <Card title={"Leave List"}>
        <Board
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isEditable={isEditable}
          isDeletable={isDeletable}
          hiddenColumns={[
            "id",
            "requestingEmployeeId",
            "approvedById",
            "leaveTypeId",
            "requestingEmployee",
          ]}
          renderColumn={renderColumn}
          columnNames={columnNames}
          hasNewRecordButton={true}
          newRecordButtonOnClick={() => {
            setModalModeName("Add");
            setFormToBeClosed("form-close");
            setIsTrigger(true);
            if (props.currentUser) {
              setSelectedLeave((prevState: any) => ({
                ...prevState
              }));
            }
          }}
          newRecordModalDataTarget={modalDataTarget}
        />
      </Card>

      <LeaveEditForm
        selectedItemId={selectedItemId}
        modalModeName={modalModeName}
        selectedLeave={selectedLeave}
        setSelectedLeave={setSelectedLeave}
        getList={getList}
        onClose={onModalClose}
      />

      {isDeleteModalOpen && (
        <ConfirmDelete
          onConfirm={(e) => onConfirmDelete(e)}
          selectedItemId={selectedItemId}
          onClose={onModalClose}
        />
      )}
    </>
  );
};

export default Leave;
