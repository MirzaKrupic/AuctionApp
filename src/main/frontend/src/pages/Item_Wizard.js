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
  const formValidation = yup.object().shape({
    name: yup
      .string()
      .required("*Name is required")
      .matches(
        /^[^\p{P}\p{S}\s\d]*$/u,
        "*Please remove any special characters"
      ),
    description: yup
      .string()
      .required("*Description is required")
      .matches(
        /^([^\p{P}\p{S}\s\d]+[ -]?[^\p{P}\p{S}\s\d]+)*$/u,
        "*Please remove any special characters"
      ),
    email: yup
      .string()
      .email("*Email must be valid")
      .required("*Email is required")
      .matches(
        /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
        "*Email is not valid"
      ),
    password: yup
      .string()
      .required("*Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "*Password must be at least 8 characters long, and password must contain at least one digit, one lowercase and one uppercase letter!"
      ),
  });

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
      supercategoryId: null,
    },
  ];
  const [categories, setcategories] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [subcatDropdown, setsubcatDropdown] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [responseState, setResponseState] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: "",
    description: "",
    categoryId: "",
    gender: "",
    image: "",
  });
  const [user, setUser] = useState(null);
  const [formDataSub, setFormDataSub] = useState(null);

  const onSortChange = (e) => {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].categoryId === parseInt(e.target.value)) {
        setsubcatDropdown(
          <Dropdown
            options={[...options, ...categories[i].subcategories]}
            setSelectedCategory={setSelectedCategory}
          />
        );
      }
    }
  };

  useEffect(async () => {
    const fetchedCategories = await fetchCategories();
    const catToRender = [...categoryOptions, ...fetchedCategories];
    setcategories(catToRender);
    setsubcatDropdown(
      <Dropdown options={options} setSelectedCategory={setSelectedCategory} />
    );
  }, [user]);

  const handleSubmit = async (item) => {
    if (currentStep === 1) setCurrentStep(currentStep + 1);
    console.log(selectedCategory);
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
      {/*step 1*/}
      <div>
        <div className={classes.page_heading}>
          <LayoutContainer>
            <div className={classes.page_heading}>
              <p>Become seller</p>
              <p>My Account -> Become Seller</p>
            </div>
          </LayoutContainer>
        </div>
        {currentStep === 1 && (
          <div className={classes.wizzard_container}>
            <div className={classes.required_container}>
              <h5 className="mt-4">ADD ITEM</h5>
              <div className={classesWizzard.form_container}>
                <Formik
                  // validationSchema={formValidation}
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
                        {errors.name && touched.name ? (
                          <div>{errors.name}</div>
                        ) : null}
                      </label>
                      <Row>
                        <Col md={6}>
                          <label className={classesWizzard.input_container}>
                            {categories && (
                              <select
                                id="sorting"
                                className={classesWizzard.category_select}
                                onChange={onSortChange}
                              >
                                {categories
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
                        <Col md={6}>
                          {subcatDropdown !== null && subcatDropdown}
                        </Col>
                      </Row>
                      <label
                        className={classesWizzard.textarea_input_container}
                      >
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
                        {errors.description && touched.description ? (
                          <div>{errors.description}</div>
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
                      <button
                        className={classes.registration_button}
                        type="submit"
                      >
                        Submit
                      </button>
                      <p>{responseState}</p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
      {/*end of step 1*/}
    </div>
  );
}

export default Item_Wizard;
