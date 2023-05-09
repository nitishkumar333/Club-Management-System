import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage, {loader as initialListLoader} from "./Homepage";
import SocietyDashboard from "../../../SocietyDashboard";


function HomepageLayout() {
    const router = createBrowserRouter([
        {
            path: '/', element: <Homepage />, loader:initialListLoader
        },
        { path: ':societyID', element: <SocietyDashboard /> },
    ])


    return (
        <div className="routerProvider">
            <RouterProvider router={router} />
        </div>
    )
}

export default HomepageLayout;