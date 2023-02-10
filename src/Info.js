import { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";



function Info(){

    return(
        <>
            <h1>Welcome!</h1>
            <h2>This site is a Full Stack application created to improve my knowledge about Express, Mongo DB, and Authentication. I hope you enjoy it!</h2>
            <h2>Click Login to continue</h2>
        </>
    )
}

export default Info;