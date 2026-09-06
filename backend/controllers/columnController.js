import { createColumn, getColumns, editColumn, deleteColumn } from "../db/models/columnModel.js";
import throwError from "../middleware/throwError.js";

export const addColumn = async (req, res) => {

    const {boardId, columnName, columnPosition, cardLimit} = req.body;

    if(!(boardId && columnName && columnPosition === undefined)) {
        throwError(400, "Incomplete fields entered");
    }
    const column = await createColumn(boardId, columnName,columnPosition, cardLimit);

    if (!column) {
        throwError(501, "Failed to create column");
    }

    res.status(201).json();
}

export const fetchColumns = async (req, res) => {

    const boardId = req.params.id;

    if(!boardId) {
        throwError(400, "No board id");
    }

    const columns = await getColumns(boardId);

    if(!columns) {
        throwError(501, "Failed to create column");
    }

    res.status(200).json(columns);
}

export const updateColumn = async (req, res) => {

    const columnId = req.params.id;
    let column;

    if(!columnId) {
        throwError(400, "No column ID");
    }

    const attributeArr = Object.entries(req.body);

    for (const [key, value] of attributeArr) {

        column = await editColumn(columnId, key, value);

    }

    if(!column) {
        throwError(501, "Failed to update column");
    }

    res.status(200).json();
}

export const removeColumn = async (req, res) => {

    const columnId  = req.params.id;

    if (!columnId) {
        throwError(400, "No column id");
    }

    const column = await deleteColumn(columnId);

    if(!column) {
        throwError(501, "Failed to delete column");
    }

    res.status(200).json();
}