import { createBoard, getBoards, editBoard, deleteBoard, getFullBoard } from "../db/models/boardModel.js";
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

export const fetchFullBoard = async (req, res) => {

    const id = req.params.id;

    if(!id) {
        throwError(400, "No board ID");
    }

    const records = await getFullBoard(id);
    if(records.length === 0) {
        return res.status(200).json(records);
    }

    const board = {
        id: records.at(0)["board_id"],
        name: records.at(0)["board_name"],
        description: records.at(0)["board_description"],
        columns: []
    };

    const columnsMap = new Map();

    records.forEach(record => {
        if(!columnsMap.has(record.column_id)) {
            columnsMap.set(record.column_id, {
                id: record.column_id,
                name: record.column_name,
                position: record.column_position,
                card_limit: record.card_limit,
                cards: []
            });
        };

        if(record.card_id !== null) {
            columnsMap.get(record.column_id).cards.push({
                id: record.card_id,
                title: record.card_title,
                position: record.card_position,
                priority: record.card_priority,
                due_date: record.due_date,
                assigned_to: record.assigned_to
            });
        };
    });

    board.columns = Array.from(columnsMap.values());
    

    res.status(200).json(board);
}