import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios  from 'axios';

import Thread from './containers/thread';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/:cfskey/:cfstoken"
        element={<Thread />}
        loader={async ({ params }) => {
          try {
            const res = await axios.get(`https://api-sandbox.confirmsign.com/v4.0/threads/token/${params.cfskey}/${params.cfstoken}`);
            if (res.statusText !== "OK") {
              throw Error("Thread not found");
            }
            return res.data;
          } catch (error) {
            return redirect("/not-found");
          } 
        }} />
      <Route path='/not-found' element={<div>Hilo no encontrado</div>} />
      <Route path='*' element={<div>Ruta no encontrada</div>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);