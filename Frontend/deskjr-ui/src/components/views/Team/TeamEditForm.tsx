import { useEffect } from "react";
import teamService from "../../../services/TeamService";
import Input from "../../CommonComponents/Input";
import Button from "../../CommonComponents/Button";

const TeamEditForm: any = (props: any) => {
  useEffect(() => {
    if (props.selectedItemId) {
      teamService.getTeamById(props.selectedItemId).then((data) => {
        props.setSelectedTeam(data);
      });
    }
  }, [props.selectedItemId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    props.setSelectedTeam((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    teamService
      .addOrUpdateTeam({
        ...props.selectedTeam,
      })
      .then(() => {
        alert("success");
        props.getList();
        props.onClose();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="teamAddModal"
        role="dialog"
        data-backdrop="static"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.modalModeName} Team</h5>
              <button
                type="button"
                className="close"
                id="form-close"
                data-dismiss="modal"
                hidden
              ></button>
              <button
                type="button"
                className="close"
                onClick={() => {
                  props.onClose();
                  const close_button = document.getElementById("form-close");
                  close_button?.click();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="modal-body">
                <Input
                  type="hidden"
                  name="Id"
                  value={props.selectedTeam && props.selectedTeam.id}
                />
                <div className="form-group">
                  <label className="col-form-label">Name:</label>
                  <Input
                    type="text"
                    name="name"
                    value={props.selectedTeam && props.selectedTeam.name}
                    onChange={(e: any) => handleChange(e)}
                    required
                  />
                  <label className="col-form-label">Manager:</label>
                  <select
                    name="manager"
                    className="form-control"
                    value={props.selectedTeam && props.selectedTeam.manager && props.selectedTeam.manager.name}
                    onChange={(e: any) => handleChange(e)}
                    required
                  >
<option value="">{props.selectedTeam && props.selectedTeam.manager && props.selectedTeam.manager.name}</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  text="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamEditForm;