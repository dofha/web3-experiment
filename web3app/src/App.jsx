import Home from "./component/Home";
import Install from "./component/Install";

function App() {
  console.log(window);
  if (window.ethereum) {
    return <Home />;
  } else {
    return <Install />;
  }
}

export default App;
