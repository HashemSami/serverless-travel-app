import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/header.scss";
import "./styles/result.scss";
import "./styles/form.scss";
import "./styles/main.scss";
import "./styles/card.scss";
import { App } from "./js/App";
import { selectCountry, selectCity, setCity } from "./js/locationSelector";
import { handleForm } from "./js/formComponent";

const store = {
  selectedRegion: "",
  selectedCountry: "",
  selectedCity: "",
  tripsInfo: [],
  mainNote: "",
  note: "",
};

// add our markup to the page
const root = document.getElementById("root");

export const updateStore = (newState) => {
  const newStore = Object.assign(store, newState);
  render(root, newStore);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    //event listeners here
    render(root, store);
    document.addEventListener("change", addEventToDropdown);
    document.addEventListener("click", (e) => addEventToButton(e, store));
  },
  false
);

const addEventToDropdown = async (e) => {
  const { target } = e;

  if (target.matches("#region")) {
    await selectCountry(target);
  }

  if (target.matches("#country")) {
    selectCity(target);
  }

  if (target.matches("#city")) {
    setCity(target);
  }
};

const addEventToButton = (e, store) => {
  const { target } = e;
  const { selectedRegion, selectedCountry, selectedCity } = store;
  if (target.matches("#submit-button")) {
    handleForm(selectedRegion, selectedCountry, selectedCity);
  }
};
