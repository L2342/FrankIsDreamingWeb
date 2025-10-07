import User from "../models/User";
import express from "express";

const register = async (req,res) =>{
    return res.status(200).send({
        status: "success",
        message: "Registro de usuario exitoso",
    })
}

export default {register};