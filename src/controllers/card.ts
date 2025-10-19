import { type Response, type Request, type NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/express';
import CardModel from '../models/card';

import NotFoundError from '../helpers/errors/not-found-error';
import UnauthorizedError from '../helpers/errors/unauthorized-error';
import ForbiddenError from '../helpers/errors/forbidden-error';
import HttpStatus from '../helpers/constants/statusCodes';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await CardModel.find({}).populate('owner');

    res.send({ data: cards });
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;

    if (!ownerId) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const card = await CardModel.create({ name, link, owner: ownerId });

    await card.populate('owner');

    res.status(HttpStatus.CREATED).send({ data: card });
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;

    const card = await CardModel.findById(cardId);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    if (card.owner.toString() !== userId) {
      throw new ForbiddenError('Вы не можете удалить карточку, которую создал другой пользователь');
    }

    await CardModel.findByIdAndDelete(cardId);

    res.send({ message: 'Карточка успешно удалена' });
  } catch (error) {
    next(error);
  }
};

export const likeCard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    res.send({ data: card });
  } catch (error) {
    next(error);
  }
};

export const dislikeCard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    res.send({ data: card });
  } catch (error) {
    next(error);
  }
};
