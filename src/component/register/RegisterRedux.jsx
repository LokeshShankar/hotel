const initialUserDetails = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  yearOfBirth: "",
  address: "",
  pincode: "",
  city: "",
  groupName: "",
  groupNameList: null,
};

const RegisterRedux = (state = initialUserDetails, action) => {
  if (action.type === "FILL_DATA") {
    const newUserDetails = {
      ...state,
      [action.payload.name]: action.payload.value,
    };
    return newUserDetails;
  } else if (action.type === "FILL_USER_GROUPS") {
    const newUserDetails = {
      ...state,
      groupNameList: action.payload,
    };
    return newUserDetails;
  } else if (action.type === "CLEAR_STATE") {
    const newUserDetails = {
      ...initialUserDetails,
    };
    return newUserDetails;
  }
  return state;
};

export default RegisterRedux;
