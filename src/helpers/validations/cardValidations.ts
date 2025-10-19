import { celebrate, Joi } from 'celebrate';
import URL_PATTERN from '../constants/regex';

export const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_PATTERN),
  }),
});

export const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

export const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
});
