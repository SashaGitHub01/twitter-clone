import React from "react";
import Layout from "../components/Layout/Layout";
import '../css/styles/ErrorPage.css'

const ErrorPage = () => {
   return (
      <Layout>
         <div className="error-pg">
            <div className="error-pg__head">
               <div><span>404</span></div>
               <div>Страница не найдена</div>
            </div>
         </div>
      </Layout>
   )
}

export default ErrorPage
