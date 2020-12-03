import Home from "./pages/home.component";
import Movie from "./pages/movie.component";
import Header from './components/header/header.component'
import "./App.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <Header />
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Movie} />
      </Switch>
    </div>
  );
}

export default App;
