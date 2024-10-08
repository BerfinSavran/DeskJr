import { useEffect, useState } from "react";
import Board from "../../CommonComponents/Board";
import Card from "../../CommonComponents/Card";
import { showErrorToast, showSuccessToast } from "../../../utils/toastHelper";
import leaveService from "../../../services/LeaveService";
import Button from "../../CommonComponents/Button";
import { formatDate } from "date-fns";
import { status } from "../../../types/status";
import StatusIcon from "../../CommonComponents/StatusIcons/StatusIcon";
import ConfirmModal from "../../CommonComponents/ConfirmModal";

const LeaveApproval: any = (props: any) => {
  const [leaves, setLeaves] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<any>({});
  const [isTrigger, setIsTrigger] = useState(false);
  const [showPendings, setShowPendings] = useState(false);
  const [formToBeClosed, setFormToBeClosed] = useState("");
  useEffect(() => {
    getPendingLeavesWithInclude();
  }, [isTrigger]);

  const getPendingLeavesWithInclude = async () => {
    await leaveService
      .getPendingLeavesForApproverEmployeeByEmployeeId()
      .then((data) => {
        setLeaves(data);
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  const Approve = async (e: any) => {
    e.preventDefault();

    if (selectedItemId) {
      leaveService
        .updateLeaveStatus(selectedItemId, status.Approved)
        .then(() => {
          showSuccessToast("Successfully Confirmed!");
          setIsTrigger(!isTrigger);
        })
        .catch((err) => {
          showErrorToast(err);
        });
    }
    onModalClose();
  };

  const Deny = async (e: any) => {
    e.preventDefault();
    if (selectedItemId) {
      leaveService
        .updateLeaveStatus(
          selectedItemId,
          status.Cancelled,
          selectedLeave.confirmDescription
        )
        .then(() => {
          showSuccessToast("Successfully Rejected!");
          setIsTrigger(!isTrigger);
        })
        .catch((err) => {
          showErrorToast(err);
        });
    }
    onModalClose();
  };

  const handleApprove = (leave: any) => {
    setSelectedItemId(leave.id);
    setFormToBeClosed("form-closed-approve-confirm");
    if (props.currentUser) {
      setSelectedLeave((prevState: any) => ({
        ...prevState,
      }));
    }
  };
  const handleDeny = (leave: any) => {
    setSelectedItemId(leave.id);
    setFormToBeClosed("form-closed-deny-confirm");
    if (props.currentUser) {
      setSelectedLeave((prevState: any) => ({
        ...prevState,
      }));
    }
  };

  const onModalClose = () => {
    setSelectedItemId("");
    setSelectedLeave({});
    setIsTrigger(false);
    const close_button = document.getElementById(formToBeClosed);
    close_button?.click();
    setFormToBeClosed("");
  };

  const customElementOfActions = (item: any) => (
    <>
      {item.statusOfLeave === status.Pending && (
        <div className="container">
          <div className="row">
            <Button
              text="Approve"
              className="btn btn-success m-1 p-2 w-100"
              onClick={() => handleApprove(item)}
              isModalTrigger={true}
              dataTarget={"approve-confirm"}
            ></Button>
            <Button
              text="Deny"
              className="btn btn-danger m-1 p-2 w-100"
              onClick={() => handleDeny(item)}
              isModalTrigger={true}
              dataTarget={"deny-confirm"}
            ></Button>
          </div>
        </div>
      )}
    </>
  );

  const getLeaves = async () => {
    await leaveService
      .getAllLeavesByManagerId()
      .then((data) => {
        setLeaves(data);
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  const renderColumn = (column: string, value: any) => {
    if (column === "statusOfLeave") {
      return value || value == 0 ? <StatusIcon status={value} /> : value;
    } else if (column === "requestingEmployee") {
      return value && value.name;
    } else if (column === "startDate") {
      return formatDate(new Date(value), "dd/MM/yyyy");
    } else if (column === "endDate") {
      return formatDate(new Date(value), "dd/MM/yyyy");
    } else if (column === "leaveType") {
      return value && value.name;
    }
    return value;
  };

  const togglePendings = () => {
    setShowPendings(!showPendings);
  };

  const columnNames = {
    requestingEmployee: "Requesting Employee",
    startDate: "Start Date",
    endDate: "End Date",
    leaveType: "Leave Type",
    requestComments: "Request Comments",
    statusOfLeave: "Leave Status",
    confirmDescription: "Confirm Description",
  };

  const topRightContent = (
    <>
      <Button
        text={showPendings ? "Show Pendings" : "Show All"}
        className={
          showPendings ? "btn btn-warning m-1 p-2" : "btn btn-success m-1 p-2"
        }
        onClick={() => {
          if (showPendings) {
            getPendingLeavesWithInclude();
          } else {
            getLeaves();
          }
          togglePendings();
        }}
      />
    </>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedLeave((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Card title={"Leave Approval"}>
        <Board
          items={leaves}
          isEditable={() => {
            return false;
          }}
          isDeletable={() => {
            return false;
          }}
          hiddenColumns={[
            "id",
            "requestingEmployeeId",
            "leaveTypeId",
            "approvedBy",
            "approvedById",
          ]}
          renderColumn={renderColumn}
          columnNames={columnNames}
          customElementOfActions={customElementOfActions}
          rightTopContent={topRightContent}
        />
      </Card>
      <ConfirmModal
        modalId="approve-confirm"
        selectedItemId={selectedItemId}
        selectedLeave={selectedLeave}
        setSelectedLeave={setSelectedLeave}
        title={"Onayla"}
        message="Emin misiniz?"
        onConfirm={(e) => Approve(e)}
        onClose={onModalClose}
      />
      <ConfirmModal
        modalId="deny-confirm"
        selectedItemId={selectedItemId}
        selectedLeave={selectedLeave}
        setSelectedLeave={setSelectedLeave}
        title={"Reddet"}
        message="Emin misiniz? Lütfen aciklama giriniz"
        context={
          <>
            <textarea
              className="form-control"
              name="confirmDescription"
              value={selectedLeave.confirmDescription}
              onChange={(e: any) => handleChange(e)}
              required
            />
          </>
        }
        onConfirm={(e) => Deny(e)}
        onClose={onModalClose}
      />
    </>
  );
};

export default LeaveApproval;
