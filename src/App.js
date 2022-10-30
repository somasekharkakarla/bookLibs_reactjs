import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import User from "./User";
import Books from "./Books"

function App() {
  return (
    <Router>
    <div style={{width:"100%", height:"100vh", backgroundColor:'#ffffff', margin:0, padding:0, display:"flex", justifyContent:'center'}}>
      <Routes>
        <Route exact path="/" element={<User/>}/>
        <Route exact path="/books" element={<Books/>}/>
      </Routes>
     </div>
     </Router>
  );
}

export default App;
