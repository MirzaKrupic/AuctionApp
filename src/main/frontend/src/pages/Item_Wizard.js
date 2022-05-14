import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
import classesWizzard from "./Item_wizard.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as CartSvg } from "../assets/cart.svg";
import { DropzoneArea } from "material-ui-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";

function Item_Wizard({ setCurrentPage }) {
  //   setCurrentPage(PAGES.MY_ACCOUNT);
  const fileRef = useRef();
  const textInput = useRef(null);
  let inputFile = "";
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
  const [imgPreview, setImgPreview] = useState(null);
  const [responseState, setResponseState] = useState(null);
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    image: "",
  });
  const [user, setUser] = useState(null);
  const [formDataSub, setFormDataSub] = useState(null);

  //   useEffect(async () => {
  //     const history = browserHistory();
  //     if (token === null) {
  //       history.push("/login");
  //       window.location.reload(false);
  //     } else {
  //       setUser(await getUserByToken(token));
  //     }
  //   }, [token]);

  useEffect(async () => {
    if (user) {
      setFormInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
      });
      setImgPreview(user.image);
    }
  }, [user]);

  return (
    <div>
      <div className={classes.page_heading}>
        <LayoutContainer>
          <div className={classes.page_heading}>
            <p>Bids</p>
            <p>My Account -> Profile</p>
          </div>
        </LayoutContainer>
      </div>
      <div className={classes.wizzard_container}>
        <div className={classes.required_container}>
          <h5 className="mt-4">ADD ITEM</h5>
          <div className={classesWizzard.form_container}>
            <Formik initialValues={formInfo} enableReinitialize={true}>
              {({ errors, touched }) => (
                <Form>
                  <label className={classesWizzard.input_container}>
                    What do you sell?
                    <Field
                      name="firstName"
                      type="text"
                      className={classesWizzard.item_input}
                    />
                    {errors.firstName && touched.firstName ? (
                      <div>{errors.firstName}</div>
                    ) : null}
                  </label>
                  <Row>
                    <Col md={6}>
                      <label className={classesWizzard.input_container}>
                        <select
                          id="sorting"
                          className={classesWizzard.category_select}
                        >
                          {options.map((option) => (
                            <option name="gender" value={option.value}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </Col>
                    <Col md={6}>
                      <label className={classesWizzard.input_container}>
                        <select
                          id="sorting"
                          className={classesWizzard.category_select}
                        >
                          {options.map((option) => (
                            <option name="gender" value={option.value}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </Col>
                  </Row>
                  <label className={classesWizzard.textarea_input_container}>
                    Description
                    <Field
                      name="lastName"
                      type="textarea"
                      component="textarea" rows="4"
                      className={classesWizzard.textarea_item_input}
                    />
                    <span className={classesWizzard.limit_span}>
                      100 words (700 characters)
                    </span>
                    {errors.lastName && touched.lastName ? (
                      <div>{errors.lastName}</div>
                    ) : null}
                  </label>
                  <DropzoneArea
                    dropzoneClass={classesWizzard.testzone}
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Upload Photos"}
                    onChange={(files) => console.log("Files:", files)}
                    filesLimit={6}
                  />
                  <button className={classes.registration_button} type="submit">
                    Submit
                  </button>
                  <p>{responseState}</p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item_Wizard;
