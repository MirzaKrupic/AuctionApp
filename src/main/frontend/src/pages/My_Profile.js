import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./My_Profile.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { getUserByToken } from "../utils/userUtils";
import FileBase64 from "react-file-base64";

function My_Profile({ setCurrentPage }) {
  setCurrentPage(PAGES.MY_ACCOUNT);
  const fileRef = useRef();
  const textInput = useRef(null);
  let inputFile = '';
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);
  const options = [
    {
      value: "NONE",
      name: "Select gender",
    },
    {
      value: "MALE",
      name: "Male",
    },
    {
      value: "FEMALE",
      name: "Female",
    },
  ];
  const [selectedGender, setSelectedGender] = useState(options[0].value);
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });
  const [user, setUser] = useState(null);

  const onSortChange = (e) => {
    console.log(e.target.value);
    setSelectedGender(e.target.value);
  };

  useEffect(async () => {
    const history = browserHistory();
    if (token === null) {
      history.push("/login");
      window.location.reload(false);
    } else {
      setUser(await getUserByToken(token));
    }
  }, [token]);

  useEffect(async () => {
    if(user){
      setFormInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender
      })
    }
    console.log(formInfo);
  }, [user]);

  const handleSubmit = async (user) => {
    user.gender = selectedGender;
    console.log(user);
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    console.log(file);
  };

  function handleSubmit2(e) {
    e.preventDefault();
    console.log('You clicked submit.');
    textInput.current.focus();
  }

  const uploadClick = e => {
    e.preventDefault();
    inputFile.click();
    return false;
  };

  return (
    <div>
      <div className={classes.page_heading}>
        <LayoutContainer>
          <div className={classes.page_heading}>
            <p>Profile</p>
            <p>My Account -> Profile</p>
          </div>
        </LayoutContainer>
      </div>
      <LayoutContainer>
        <div className={classes.required_container}>
          <div className={classes.section_heading}>
            <p>Required</p>
          </div>
          <div className={classes.required_section}>
            <div className={classes.image_section}>
              <div className={classes.round_img}></div>
              <Button
                className={classes.bidding_button}
                variant="outline-*"
                ref={fileRef}
                onChange={handleChange}
                onClick={uploadClick}
                multiple={false}
                type="file"
              >
                SELECT IMAGE
              </Button>
              <input
                style={{height: "0px", overflow: "hidden"}}
                type="file"
                name="fileUpload"
                ref={input => {
                  // assigns a reference so we can trigger it later
                  inputFile = input;
                }}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            <div className={classes.info_section}>
              <Formik
                onSubmit={handleSubmit}
                initialValues= {formInfo}
                enableReinitialize= {true}
              >
                {({ errors, touched }) => (
                  <Form>
                    <label className={classes.input_container}>
                      First Name
                      <Field
                        name="firstName"
                        type="text"
                        className={classes.registration_input}
                      />
                      {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                      ) : null}
                    </label>
                    <label className={classes.input_container}>
                      Last Name
                      <Field
                        name="lastName"
                        type="text"
                        className={classes.registration_input}
                      />
                      {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                      ) : null}
                    </label>
                    <label className={classes.input_container}>
                      I am...
                     {user && <select
                        id="sorting"
                        onChange={onSortChange}
                        className={classes.gender_select}
                        defaultValue={user.gender}
                      >
                        {options.map((option) => (
                          <option
                            name="gender"
                            value={option.value}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>}
                    </label>
                    <label className={classes.input_container}>
                      Email
                      <Field
                        name="email"
                        type="email"
                        className={classes.registration_input}
                      />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </label>

                    <button
                      className={classes.registration_button}
                      type="submit"
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}

export default My_Profile;
