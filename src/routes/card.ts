import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/card';
import { createCardValidation, cardIdValidation } from '../helpers/cardValidations';

const router = Router();

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', deleteCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

export default router;
