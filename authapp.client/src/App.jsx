import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Welcome from "./Welcome";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/signup" />}
                />

                <Route
                    path="/signup"
                    element={<SignUp />}
                />

                <Route
                    path="/signin"
                    element={<SignIn />}
                />

                <Route
                    path="/welcome"
                    element={<Welcome />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;