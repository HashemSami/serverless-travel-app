import { formComponent } from "./formComponent";
import { resultComponent } from "./resultComponent";
import { headerComponent } from "./headerComponent";

export const App = (state) => {
  const {
    selectedRegion,
    selectedCountry,
    selectedCity,
    tripsInfo,
    mainNote,
    note,
  } = state;
  //   changeName();
  return `
  <div id="container">
    <header id="head">
      ${headerComponent()}
    </header>
    
    <main>      
      ${formComponent(selectedRegion, selectedCountry, selectedCity, note)}
      ${resultComponent(tripsInfo, mainNote)}
    </main>

    <footer id="footer">
      <hr>
      <p>API Used Documentation:</p>
      <div id="docs">
        <a href="http://www.geonames.org/export/web-services.html">Geonames</a>
        <a href="https://www.weatherbit.io/api">Weatherbit</a>
        <a href="https://pixabay.com/api/docs/">Pixabay</a>
      </div>
    </footer>
  </div>
  `;
};
