import { Component } from "react";
import axios from "axios";
import ToggleSwitch from "./toggleswitch";
import "../../css/unlockuser/unlockuser.css";
import { Input } from "../utility/Input";
import Button from "../utility/Button";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";

class UnlockUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userResults: [],
      filteredResults: [],
      email: "",
    };
  }

  emailChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  getUsers = () => {
    let getUsersUrl = USER_SERVICE_BASE_URL + "/accountstatus/users";
    axios
      .get(getUsersUrl)
      .then((response) => {
        let userResults = response.data;
        //        console.log(userResults);
        this.setState({
          userResults: userResults,
          filteredResults: userResults,
        });
      })
      .catch((error) => {
        //        console.log(error);
      });
  };

  toggleLockStatus = (event) => {
    let selectedUserId = parseInt(
      event.target.parentElement.attributes.userId.value
    );
    let selectedUser;
    let updatedUserResults = JSON.parse(JSON.stringify(this.state.userResults));
    updatedUserResults = updatedUserResults.filter((user) => {
      if (user.userId !== selectedUserId) return true;
      else {
        selectedUser = user;
        return false;
      }
    });
    let updateLockStatusUrl =
      USER_SERVICE_BASE_URL + "/accountstatus/togglestatus/" + selectedUserId;
    axios
      .put(updateLockStatusUrl)
      .then((response) => {
        //        console.log(response.data);
        alert(
          "User : " +
            selectedUser.firstName +
            " " +
            selectedUser.lastName +
            " has been unlocked"
        );
        this.setState({ userResults: updatedUserResults }, () =>
          this.filterUsers()
        );
      })
      .catch((error) => {
        //        console.log(error);
      });
    // this.setState({userResults: updatedUserResults}, () => (this.filterUsers()));
  };

  filterUsers = () => {
    let filteredResults = [];
    if (this.state.email !== "") {
      filteredResults = this.state.userResults.filter(
        (user) => user.email === this.state.email
      );
    } else {
      filteredResults = this.state.userResults;
    }
    this.setState({ filteredResults: filteredResults });
  };

  resetFilter = (event) => {
    event.preventDefault();
    this.setState({ email: "" }, () => {
      this.filterUsers();
    });
  };

  componentDidMount() {
    this.getUsers();
    // let users=[]
    // let users=[
    //     {userId:1,firstName:'tony',lastName:'stark',email:'tony@gmail.com',accountLockedStatus:true
    //     },
    //     {userId:2,firstName:'loki',lastName:'odinson',email:'loki@gmail.com',accountLockedStatus:true
    //     },
    //     {userId:3,firstName:'quentin',lastName:'tarantino',email:'quentin@gmail.com',accountLockedStatus:true
    //     }

    // ]
    // this.setState({userResults:users}, () => {this.filterUsers()});
  }

  render() {
    return (
      <div className="unlockUser">
        <div className="filters">
          <input
            className="--form-publicis-input unlock_user_input"
            name="email"
            value={this.state.email}
            type="text"
            placeholder="Enter user email"
            onChange={this.emailChange}
          ></input>
          <Button
            cssClassName="btn--publicis-primary unlock_user_btns"
            type="button"
            label="Filter"
            handleClick={this.filterUsers}
          />
          <Button
            cssClassName="btn--publicis-secondary-outline unlock_user_btns"
            type="button"
            label="Reset"
            handleClick={this.resetFilter}
          />
        </div>
        <div className="userResults">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Toggle to Unlock</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredResults.map((user) => {
                return (
                  <tr key={user.userId}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <ToggleSwitch
                        userId={user.userId}
                        accountLocked={user.accountLockedStatus}
                        onChange={this.toggleLockStatus}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UnlockUser;
