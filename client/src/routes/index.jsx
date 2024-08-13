import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

import Home from "../views/Home";
import InicioSesion from "../views/InicioSesion";
import Registro from "../views/Registro";
import Inicio from "../views/Inicio";
import MisInvitaciones from "../views/Inicio/components/MisInvitaciones";
import NuevaInvitacion from "../views/Inicio/components/NuevaInvitacion";
import MiPerfil from "../views/Inicio/components/MiPerfil";
import EditarInvitacion from "../views/EditarInvitacion";
import Detalles from "../views/Detalles";
import EditarPerfil from "../views/EditarPerfil";
import EliminarCuenta from "../views/EliminarCuenta";
import RecuperarCuenta from "../views/RecuperarCuenta";
import CambiarContrasena from "../views/CambiarContrasena";
import Invitado from "../views/Invitado";
import Invitacion from "../views/Invitacion";
import Nosotros from "../views/Nosotros";
import Contacto from "../views/Contacto";
import AvisoPrivacidad from "../views/AvisoPrivacidad";
import TerminosCondiciones from "../views/TerminosCondiciones";

import ProtectedRoute from "../ProtectedRoute";

import Error404 from "../views/Error404"; 

const router = createBrowserRouter([
    {
        path: "/", //home
        element: <Home/>, 
        errorElement: <Error404/>
    },
    {
        path: '/InicioSesion',
        element: <InicioSesion/>, 
        errorElement: <Error404/>,
    },
    {
        path: '/Registro',
        element: <Registro/>,
        errorElement: <Error404/>,
    },
    {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
            {
                path: 'Inicio',
                element: <Inicio/>,
                errorElement: <Error404/>,
                children: [
                    {
                        path: 'MisInvitaciones',
                        element: <MisInvitaciones/>,
                        errorElement: <Error404/>,
                    },
                    {
                        path: 'NuevaInvitacion',
                        element: <NuevaInvitacion/>,
                        errorElement: <Error404/>,
                    },
                    {
                        path: 'MiPerfil/:id',
                        element: <MiPerfil/>,
                        errorElement: <Error404/>,
                    },
                    {
                        path: 'Contacto/:id',
                        element: <Contacto/>,
                        errorElement: <Error404/>,
                    }
                ]
            },
            {
                path: 'Detalles/:id',
                element: <Detalles/>,
                errorElement: <Error404/>,
            },
            {
                path: 'EditarInvitacion/:id',
                element: <EditarInvitacion/>,
                errorElement: <Error404/>,
            },
            {
                path: 'EditarPerfil/:id',
                element: <EditarPerfil/>,
                errorElement: <Error404/>,
            },
            {
                path: 'CambiarContrasena/:id',
                element: <CambiarContrasena/>,
                errorElement: <Error404/>,
            },
            {
                path: 'EliminarCuenta/:id',
                element: <EliminarCuenta/>,
                errorElement: <Error404/>,
            }
        ]
    },
    {
        path: '/RecuperarCuenta',
        element: <RecuperarCuenta/>,
        errorElement: <Error404/>,
    },
    {
        path: '/Invitado',
        element: <Invitado/>,
        errorElement: <Error404/>,
    },
    {
        path: '/Invitacion/:n/:pin',
        element: <Invitacion/>,
        errorElement: <Error404/>,
    },
    {
        path: '/Nosotros',
        element: <Nosotros/>,
        errorElement: <Error404/>,
    },
    {
        path: '/Contacto/:id',
        element: <Contacto/>,
        errorElement: <Error404/>,
    },
    {
        path: '/AvisoPrivacidad',
        element: <AvisoPrivacidad/>,
        errorElement: <Error404/>,
    },
    {
        path: '/TerminosCondiciones',
        element: <TerminosCondiciones/>,
        errorElement: <Error404/>,
    }
]);

const MyRoutes = () => <RouterProvider router={router}/>;

export default MyRoutes;