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
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCategories } from "../utils/categoryService";
import Dropdown from "../components/additems/Dropdown";

function Item_Wizard({ setCurrentPage }) {
  //   setCurrentPage(PAGES.MY_ACCOUNT);
  const fileRef = useRef();
  const textInput = useRef(null);
  let inputFile = "";
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);
  const options = [
    {
      value: 0,
      name: "Select subcategory",
    },
  ];
  const categoryOptions = [
    {
      value: 0,
      name: "Select category",
      supercategoryId: null
    },
  ];
  const [selectedGender, setSelectedGender] = useState(options[0].value);
  const [testRad, setTestRad] = useState(null);
  const [testRad2, setTestRad2] = useState(null);
  const [responseState, setResponseState] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: "",
    description: "",
    email: "",
    gender: "",
    image: "",
  });
  const [user, setUser] = useState(null);
  const [formDataSub, setFormDataSub] = useState(null);

  const onSortChange = (e) => {
    for (var i = 0; i < testRad.length; i++) {
      if (testRad[i].categoryId === parseInt(e.target.value)) {
        setTestRad2(
          <Dropdown options={[...options, ...testRad[i].subcategories]} />
        );
      }
    }
  };

  useEffect(async () => {
    const fetchedCategories = await fetchCategories();
    const catToRender = [...categoryOptions, ...fetchedCategories];
    setTestRad(catToRender);
    setTestRad2(<Dropdown options={options} />);
  }, [user]);

  const handleSubmit = async (item) => {
    console.log(item);
  };

  const uploadImage = async (files) => {
    console.log(files);

    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "dydlqwes"); // Replace the preset name with your own
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dedewsjde/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          console.log(data);
        });
    });

    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
    // const formData = new FormData();
    // formData.append("file", files[0]);
    // formData.append("upload_preset", "dydlqwes");
    // formData.append("folder", "users");
    // setFormDataSub(formData);
    // setImgPreview(URL.createObjectURL(files[0]));
    // const res = await uploadUserImage(formData);
    // console.log(res.data.secure_url);
  };

  return (
    <div>
      <div className={classes.page_heading}>
        <LayoutContainer>
          <div className={classes.page_heading}>
            <p>Become seller</p>
            <p>My Account -> Become Seller</p>
          </div>
        </LayoutContainer>
      </div>
      <div className={classes.wizzard_container}>
        <div className={classes.required_container}>
          <h5 className="mt-4">ADD ITEM</h5>
          <div className={classesWizzard.form_container}>
            <Formik
              initialValues={formInfo}
              enableReinitialize={true}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <label className={classesWizzard.input_container}>
                    What do you sell?
                    <Field
                      name="name"
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
                        {testRad && (
                          <select
                            id="sorting"
                            className={classesWizzard.category_select}
                            onChange={onSortChange}
                          >
                            {testRad
                              .filter((option) => {
                                return option.supercategoryId === null;
                              })
                              .map((option) => (
                                <option value={option.categoryId}>
                                  {option.name}
                                </option>
                              ))}
                          </select>
                        )}
                      </label>
                    </Col>
                    <Col md={6}>{testRad2 !== null && testRad2}</Col>
                  </Row>
                  <label className={classesWizzard.textarea_input_container}>
                    Description
                    <Field
                      name="description"
                      type="textarea"
                      component="textarea"
                      rows="20"
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
                    onChange={(files) => {
                      uploadImage(files);
                    }}
                    // onChange={(files) => console.log("Files:", files)}
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
