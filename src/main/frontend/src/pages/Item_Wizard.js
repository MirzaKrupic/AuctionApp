import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
import classesWizzard from "./Item_wizard.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCategories } from "../utils/categoryService";
import { addItem } from "../utils/itemService";
import Dropdown from "../components/additems/Dropdown";
import "react-datepicker/dist/react-datepicker.css";

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
      )
      .min(20, "Must have at least 20 characters")
      .max(700, "Must have less than 700 characters"),
    email: yup
      .string()
      .email("*Email must be valid")
      .required("*Email is required")
      .matches(
        /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
        "*Email is not valid"
      ),
  });

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
  const [imgsToUpload, setImgsToUpload] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [categories, setcategories] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [subcatDropdown, setsubcatDropdown] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [responseState, setResponseState] = useState(null);
  const [selectedDatePicker, setSelectedDatePicker] = useState(new Date());
  const [formInfo, setFormInfo] = useState({
    name: "",
    description: "",
    categoryId: "",
    image: "",
    endDate: new Date(),
    price: 0,
  });
  const [user, setUser] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const isFirstRun = useRef(true);

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

  useEffect(async () => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if(currentStep === 1){
      setCurrentStep(currentStep + 1);
    }
    if(currentStep === 2){
      addItem(token, formInfo);
    }
  }, [formInfo]);

  const handleSubmit = async (item) => {
    
    if (currentStep === 1) {
      if(imgsToUpload.length < 3 || imgsToUpload.length > 6){
        setImgError("You have to add between 3 and 6 images");
        return;
      }
      if(selectedCategory === null){
        setCategoryError("You have to chose category and subcategory");
        return;
      }
      
      setFormInfo({
        name : item.name,
        description : item.description,
        categoryId : selectedCategory,
        image: formInfo.image,
        endDate: formInfo.endDate,
        price: formInfo.price
      });
      
    }
    if (currentStep === 2) {
      await uploadImage(imgsToUpload);
      await setFormInfo({
        name : formInfo.name,
        description : formInfo.description,
        categoryId : selectedCategory,
        image: formInfo.image,
        endDate: selectedDatePicker,
        price: item.price
      });
    }
  };

  const uploadImage = async (files) => {
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
          console.log(fileURL);
          setImgUrls([...imgUrls, fileURL]);
        });
    });

    axios.all(uploaders).then(() => {
      let images = "";
      for (var i = 0; i < imgUrls.length; i++) {
        if (i !== imgUrls.length - 1) {
          images += imgUrls[i] + ";";
        } else {
          images += imgUrls[i];
        }
      }
      formInfo.image = images;
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
                  //validationSchema={formValidation}
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
                      {categoryError}
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
                          setImgsToUpload(files);
                        }}
                        // onChange={(files) => console.log("Files:", files)}
                        filesLimit={6}
                      />
                      {imgError}
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
        {currentStep === 2 && (
          <div className={classes.wizzard_container}>
            <div className={classes.required_container}>
              <h5 className="mt-4">SET PRICES</h5>
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
                        Your start Price
                        <Field
                          name="price"
                          type="number"
                          step="0.01"
                          className={classesWizzard.item_input}
                        />
                        {errors.name && touched.name ? (
                          <div>{errors.name}</div>
                        ) : null}
                      </label>
                      <label
                        className={classesWizzard.textarea_input_container}
                      >
                        Description
                        <DatePicker
                          className={classesWizzard.date_picker}
                          selected={selectedDatePicker}
                          showTimeSelect
                          dateFormat="Pp"
                          timeIntervals={15}
                          onChange={(date: Date) => {setSelectedDatePicker(date);}}
                        />
                        {errors.description && touched.description ? (
                          <div>{errors.description}</div>
                        ) : null}
                      </label>
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
