import Devlog from "../models/Devlog";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Comment from "../models/Comments.ts";
import { uploadDir } from "../middlewares/upload.js";
import paginate from "mongoose-paginate-v2";


const createDevlog = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'No se han enviado datos' });
    }
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const newDevlog = new Devlog({ title, content });
        const devLog = await newDevlog.save();
        if (!devLog) {
            return res.status(400).json({ message: 'No se ha podido crear el devlog' });
        }
        return res.status(201).json({
            status: 'success',
            message: 'Devlog creado correctamente',
            data: devLog
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el devlog', error: error.message });
    }
}

const editDevlog = async (req, res) => {
    const devlogId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(devlogId)) {
        return res.status(400).json({ message: 'ID de devlog no válido' });
    }
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const updatedDevlog = await Devlog.findByIdAndUpdate(devlogId, { title, content, updatedAt: Date.now() }, { new: true });
        if (!updatedDevlog) {
            return res.status(404).json({ message: 'Devlog no encontrado' });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Devlog actualizado correctamente',
            data: updatedDevlog
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el devlog', error: error.message });
    }
}

const getDevlogs = async (req, res) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 7,
        sort: { createdAt: -1 },
        select: { title: 1, content: 1, createdAt: 1, updatedAt: 1 },

    };
    try {
        const devlogs = await Devlog.paginate({}, options);
        if (!devlogs || devlogs.docs.length === 0) {
            return res.status(404).json({ message: 'No se han encontrado devlogs' });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Devlogs obtenidos correctamente',
            data: devlogs
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los devlogs', error: error.message });
    }
}

const upload = (req, res) => {
    //Verificar que se ha subido  al menos un archivo

    const devlogId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(devlogId)) {
        return res.status(400).json({ message: 'ID de devlog no válido' });
    }
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    // Hacer el proceso para cada archivo (si se suben varios)
    req.files.forEach(async (file) => {
        const fileExtension = file.mimetype.split('/')[1];
        // Verificar que la extension es valida
        const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mkv'];
        if (!validExtensions.includes(fileExtension)) {
            fs.unlinkSync(path.resolve(file.path));
            return res.status(400).json({ message: 'Extensión de archivo no válida' });
        }
        // Si es valida actualizar en la base de datos
        const updatedDevlog = await Devlog.findByIdAndUpdate(devlogId, { $push: { images: file.filename } }, { new: true });
        if (!updatedDevlog) {
            fs.unlinkSync(path.resolve(file.path));
            return res.status(500).json({ message: 'Error al actualizar el devlog con la imagen', error: 'Devlog no encontrado' });
        }

    });
    return res.status(200).json({
        status: 'success',
        message: 'Imagen subida y devlog actualizado correctamente',
    });
}



const deleteDevlog = async (req, res) => {
    const uploadDir = path.join(process.cwd(), "media", "devlogs");
    const devlogId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(devlogId)) {
        return res.status(400).json({ message: "ID de devlog no válido" });
    }
    
    try{
        await Comment.deleteMany({ devlogId: devlogId });
    }catch(error){
        return res.status(500).json({ message: "Error al eliminar los comentarios", error: error.message });
    }
    
    try{
        const devlog = await Devlog.findById(devlogId);
        if (devlog && devlog.images && devlog.images.length > 0) {
            devlog.images.forEach((image) => {
                const filePath = path.resolve(uploadDir, image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }
    }catch(error){
        return res.status(500).json({ message: "Error al eliminar las imágenes", error: error.message });
    }
    
    try{
        const deletedDevlog = await Devlog.findByIdAndDelete(devlogId);
        if (!deletedDevlog) {
            return res.status(404).json({ message: "Devlog no encontrado" });
        }
    }catch(error){
        return res.status(500).json({ message: "Error al eliminar el devlog", error: error.message });
    }

    return res.status(200).json({
        status: "success",
        message: "Devlog eliminado correctamente",
    });
};

export default { createDevlog, editDevlog, getDevlogs, deleteDevlog, upload };

    

