import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
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
      <Container>
        <div className="row">
          <Col md={3}>1 of 3</Col>
          <Col md={7}>1 of 3</Col>
          <Col md={2}>1 of 3</Col>
        </div>
      </Container>
    </div>
  );
}

export default Item_Wizard;
