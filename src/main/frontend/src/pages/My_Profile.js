import { PAGES } from "../utils/constants";

function My_Profile({ setCurrentPage }) {
  setCurrentPage(PAGES.MY_ACCOUNT);

  return <h1>my profile</h1>;
}

export default My_Profile;
