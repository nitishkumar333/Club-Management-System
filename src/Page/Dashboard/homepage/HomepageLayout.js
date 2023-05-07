import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Homepage";
import SocietyDashboard from "../../../SocietyDashboard";


function HomepageLayout() {
    const router = createBrowserRouter([
        {
            path: '/', element: <Homepage />
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