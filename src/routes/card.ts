import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/card';
import { createCardValidation, cardIdValidation, deleteCardValidation } from '../helpers/validations/cardValidations';

const router = Router();

router.get('/', getCards);
router.post('/', createCardValidation, createCard as any);
router.delete('/:id', deleteCardValidation, deleteCard as any);
router.put('/:cardId/likes', cardIdValidation, likeCard as any);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard as any);

export default router;
