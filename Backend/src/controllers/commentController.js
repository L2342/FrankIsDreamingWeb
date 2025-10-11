import Comment from "../models/Comments.ts";
import Devlog from "../models/Devlog.ts";
import mongoose from "mongoose";

const publishComment = async (req, res) => {
  const devlogId = req.params.devlogId;
  const content = req.body.content;

  if (!mongoose.Types.ObjectId.isValid(devlogId)) {
    return res.status(400).json({ message: "ID de devlog no válido" });
  }

  const userId = req.user.sub.id;

  if (!content?.trim()) {
    return res.status(400).json({ message: "El comentario no puede estar vacío" });
  }

  try {
    // Crear comentario
    const newComment = await Comment.create({ devlogId, userId, content });

    // Asociar al devlog
    await Devlog.findByIdAndUpdate(devlogId, { $push: { comments: newComment._id } });

    // Poblamos el usuario antes de enviar al frontend
    const populatedComment = await newComment.populate("userId", "username");

    return res.status(201).json({
      status: "success",
      message: "Comentario publicado correctamente",
      data: populatedComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al publicar el comentario",
      error: error.message,
    });
  }
};

const getComments = async (req, res) => {
  const devlogId = req.params.devlogId;

  if (!mongoose.Types.ObjectId.isValid(devlogId)) {
    return res.status(400).json({ message: "ID de devlog no válido" });
  }

  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    sort: { createdAt: -1 },
    populate: { path: "userId", select: "username" },
  };

  try {
    const comments = await Comment.paginate({ devlogId }, options);

    if (!comments || comments.docs.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Sin comentarios aún.",
        data: [],
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Comentarios obtenidos correctamente",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los comentarios",
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "ID de comentario no válido" });
  }

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    await Devlog.findByIdAndUpdate(deletedComment.devlogId, {
      $pull: { comments: commentId },
    });

    return res.status(200).json({
      status: "success",
      message: "Comentario eliminado correctamente",
      data: deletedComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el comentario",
      error: error.message,
    });
  }
};

export { publishComment, getComments, deleteComment };
