import RouteComponent from "./Components/RouteComponent";
import Provider from "./Provider/Provider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider>
        <RouteComponent />
      </Provider>
    </div>
  );
}

export default App;
