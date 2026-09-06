import { createCard, getCards, editCard, deleteCard } from "../db/models/cardModel.js";
import { getUser } from "../db/models/userModel.js";
import throwError from "../middleware/throwError.js";

export const addCard = async (req, res) => {
     const {columnId, cardTitle, cardPosition, assignedEmail, cardPriority, cardDescription, dueDate} = req.body;

     const createdBy = req.userId;
     const assignedTo = await getUser(assignedEmail);

     if(!(columnId && cardTitle && cardPosition === undefined && createdBy && assignedTo && cardPriority)) {
        throwError(400, "Incomplete fields");
     }

     const card = await createCard(columnId, cardTitle, cardPosition, createdBy, assignedTo, cardPriority, cardDescription, dueDate);

     if (!card) {
        throwError(501, "Failed to create card");
     }


     res.status(201).json();

}

export const fetchCards = async(req, res) => {

    const columnId = req.params.id;

    if(!columnId) {
        throwError(400, "No column ID");
    }

    const cards = await getCards(columnId);

    if(!cards) {
        throwError(501, "Failed to fetch cards");
    }

    res.status(200).json(cards);
}

export const updateCard = async(req, res) => {

    const changes = req.body;
    const cardId = req.params.id;
    let card;

    const attributeArr = Object.entries(changes);
    for (const [key, value] of attributeArr) {
        card = await editCard(cardId, key, value);
    }

    if (!card) {
        throwError(400, "Failed to update card");
    }

    res.status(200).json();
}

export const removeCard = async (req, res) => {

    const cardId = req.params.id;

    if(!cardId) {
        throwError(400, "No card ID");
    }

    const card = await deleteCard(cardId);

    if(!card) {
        throwError(501, "Failed to delete card");
    }

    res.status(200).json();
}