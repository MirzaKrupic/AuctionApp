import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState } from "react";
import classes from "./My_Profile.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { SORT_BY, ORDER } from "../utils/constants";

function My_Profile({ setCurrentPage }) {
  setCurrentPage(PAGES.MY_ACCOUNT);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);
  const options = [
    {
      value: { gender: "NONE"},
      name: "Select gender",
    },
    {
      value: { gender: "MALE"},
      name: "Male",
    },
    {
      value: { gender: "FEMALE"},
      name: "Female",
    }
  ];
  const [selectedGender, setSelectedGender] = useState(options[0].value);
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    password: "",
  });

  const onSortChange = (e) => {
    setSelectedGender(JSON.parse(e.target.value));
  };

  useEffect(async () => {
    console.log(token);
    const history = browserHistory();
    if (token === null) {
      history.push("/login");
      window.location.reload(false);
    }
  }, [token]);

  const handleSubmit = async (user) => {
    user.gender = selectedGender.gender;
    console.log(user);
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
                type="submit"
                variant="outline-*"
              >
                SELECT IMAGE
              </Button>
            </div>
            <div className={classes.info_section}>
              <Formik
              onSubmit={handleSubmit}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  gender: "",
                }}
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
                      <select
                        id="sorting"
                        onChange={onSortChange}
                        className={classes.gender_select}
                      >
                        {options.map((option) => (
                          <option name="gender" value={JSON.stringify(option.value)}>
                            {option.name}
                          </option>
                        ))}
                      </select>
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
