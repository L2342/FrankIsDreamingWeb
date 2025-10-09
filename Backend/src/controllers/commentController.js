import Comment from "../models/Comments";
import Devlog from "../models/Devlog";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";


const publishComment = async (req, res) => {
    const { devlogId, author, content } = req.body;
    if (!devlogId || !author || !content) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const newComment = new Comment({ devlog: devlogId, userId, content });
        const savedComment = await newComment.save();
        if (!savedComment) {
            return res.status(400).json({ message: 'No se ha podido publicar el comentario' });
        }
        await Devlog.findByIdAndUpdate(devlogId, { $push: { comments: savedComment._id } });
        return res.status(201).json({
            status: 'success',
            message: 'Comentario publicado correctamente',
            data: savedComment
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al publicar el comentario', error: error.message });
    }
}

const getComments = async (req, res) => {
    const devlogId = req.params.devlogId;
    if (!mongoose.Types.ObjectId.isValid(devlogId)) {
        return res.status(400).json({ message: 'ID de devlog no válido' });
    }
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        sort: { createdAt: -1 },
        populate: { path: 'userId', select: 'username', },

    };
    try {
        const comments = await Comment.paginate({ devlogId }, options);
        if (!comments || comments.docs.length === 0) {
            return res.status(404).json({ message: 'No se han encontrado comentarios' });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Comentarios obtenidos correctamente',
            data: comments
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({ message: 'ID de comentario no válido' });
    }
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        await Devlog.findByIdAndUpdate(deletedComment.devlog, { $pull: { comments: commentId } });
        return res.status(200).json({
            status: 'success',
            message: 'Comentario eliminado correctamente',
            data: deletedComment
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
}

export {
    publishComment,deleteComment};   