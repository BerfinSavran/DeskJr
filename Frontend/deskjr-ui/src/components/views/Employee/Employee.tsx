import { useEffect, useState } from "react";
import employeeService from "../../../services/EmployeeService";
import Card from "../../CommonComponents/Card";
import Board from "../../CommonComponents/Board";
import EmployeeEditForm from "./EmployeeEditForm";
import { formatDate } from "date-fns";
import ConfirmDelete from "../../CommonComponents/ConfirmDelete";
import { showErrorToast, showSuccessToast } from "../../../utils/toastHelper";
import { Roles } from "../../../types/Roles";
import EmployeeTitle from "../EmployeeTitle/EmployeeTitle";

const Employee: any = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [modalModeName, setModalModeName] = useState("");
  const [modalDataTarget] = useState("employeeAddModal");
  const [isTrigger, setIsTrigger] = useState(false);
  const [formToBeClosed, setFormToBeClosed] = useState("");

  useEffect(() => {
    getList();
  }, [isTrigger]);

  const getList = async () => {
    employeeService
      .getAllEmployee()
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
      employeeService
        .deleteEmployee(selectedItemId)
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

  const handleEdit = (employee: any) => {
    setSelectedItemId(employee.id);
    setModalModeName("Update");
    setFormToBeClosed("form-close");
  };

  const handleDelete = (employee: any) => {
    setSelectedItemId(employee.id);
    setFormToBeClosed("delete-form-closed");
  };

  const isEditable = (item: any) => true;

  const isDeletable = (item: any) => true;

  const renderColumn = (column: string, value: any) => {
    if (!value) return "";
    switch (column) {
      case "employeeRole":
        switch (value) {
          case Roles.Employee:
            return "Employee";
          case Roles.Manager:
            return "Manager";
          case Roles.Admin:
            return "Admin";
          default:
            return value;
        }
      case "gender":
        return value === 0 ? "Male" : value === 1 ? "Female" : value;
      case "dayOfBirth":
        return formatDate(new Date(value), "dd/MM/yyyy");
      case "employeeTitle":
        return value && value?.titleName;
      case "team":
        return value && value?.name;
      default:
        return value;
    }
  };

  const onModalClose = () => {
    setSelectedItemId("");
    setSelectedEmployee("");
    setModalModeName("");
    setIsTrigger(false);
    const close_button = document.getElementById(formToBeClosed);
    close_button?.click();
    setFormToBeClosed("");
  };

  const columnNames = {
    name: "Employee Name",
    dayOfBirth: "BirthDay",
    employeeRole: "Employee Role",
    gender: "Gender",
    employeeTitle: "Title Name",
    team: "Team Name",
    email: "E-mail",
  };

  return (
    <>
      <Card title={"Employee List"}>
        <Board
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isEditable={isEditable}
          isDeletable={isDeletable}
          hiddenColumns={["id", "password", "teamId", "employeeTitleId"]}
          renderColumn={renderColumn}
          columnNames={columnNames}
          hasNewRecordButton={true}
          newRecordButtonOnClick={() => {
            setModalModeName("Add");
            setFormToBeClosed("form-close");
            setIsTrigger(true);
          }}
          newRecordModalDataTarget={modalDataTarget}
        />
      </Card>

      <EmployeeEditForm
        selectedItemId={selectedItemId}
        modalModeName={modalModeName}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        getList={getList}
        onClose={onModalClose}
      />
      <ConfirmDelete
        onConfirm={(e) => onConfirmDelete(e)}
        selectedItemId={selectedItemId}
        onClose={onModalClose}
      />
    </>
  );
};

export default Employee;
