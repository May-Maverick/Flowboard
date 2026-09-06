import { createBoard, getBoards, editBoard, deleteBoard } from "../db/models/boardModel.js";
import throwError from "../middleware/throwError.js";

export const addBoard = async (req, res) => {

    const {workspaceId, boardName, boardDescription} = req.body;

    const createdBy = req.userId;

    if (!(workspaceId && boardName && createdBy)) {
        throwError(400, "Incomplete fields");
    }

    const board = await createBoard(workspaceId, boardName, createdBy, boardDescription);

    if(!board) {
        throwError(501, "Failed to create board");
    }

    res.status(201).json();
}

export const fetchBoards = async (req, res) => {

    const workspaceId = req.params.id;

    if(!workspaceId) {
        throwError(400, "No board ID");
    }

    const boards = await getBoards(workspaceId);

    if (!boards) {
        throwError(501, "Failed to fetch boards");
    }

    res.status(200).json(boards);
}

export const updateBoard = async (req, res) => {

    const boardId = req.params.id;
    let board;

    if(!boardId) {
        throwError(400, "No board Id");
    }

    const attributeArr = Object.entries(req.body);

    for(const [key, value] of attributeArr) {
        board = await editBoard(boardId, key, value);
    }

    if(!board) {
        throwError(501, "Failed to update board");
    }

    res.status(200).json();
}

export const removeBoard = async (req, res) => {

    const boardId = req.params.id;

    if(!boardId){
        throwError(400, "No board Id");
    }

    const board = await deleteBoard(boardId);

    if(!board) {
        throwError(501, "Failed to delete board");
    }

    res.status(200).json();
}