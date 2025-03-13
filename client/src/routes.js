import Authorization from "./pages/Authorization"
import MainMenu from "./pages/MainMenu"
import AdminMenu from "./pages/AdminMenu"
import NutritionMenu from "./pages/NutritionMenu"
import ClassMenu from "./pages/ClassMenu"
import AttendanceMenu from "./pages/AttendanceMenu"
import EmployeeListMenu from "./pages/EmployeeMenu"
import PreferenceMenu from "./pages/PreferencesMenu"
import { ADMIN_ROUTE, ATTENDANCE_ROUTE, CLASSES_ROUTE, NUTRITIONS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, EMPLOYEES_ROUTE, PREFERENCE_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminMenu
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Authorization
    },
    {
        path: EMPLOYEES_ROUTE,
        Component: EmployeeListMenu
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainMenu
    },
    {
        path: LOGIN_ROUTE,
        Component: Authorization
    },
    {
        path: NUTRITIONS_ROUTE,
        Component: NutritionMenu
    },
    {
        path: CLASSES_ROUTE,
        Component: ClassMenu
    },
    {
        path: ATTENDANCE_ROUTE,
        Component: AttendanceMenu
    },
    {
        path: PREFERENCE_ROUTE,
        Component: PreferenceMenu
    }
]