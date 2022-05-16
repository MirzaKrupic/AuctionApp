import classes from "../../pages/User_items.module.css";
import classesWizzard from "../../pages/Item_wizard.module.css";

function Dropdown({ options }) {
  return (
    <div>
      {options && (
        <label className={classesWizzard.input_container}>
          <select className={classesWizzard.category_select}>
            {options.map((option) => (
              <option name="gender" value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

export default Dropdown;
