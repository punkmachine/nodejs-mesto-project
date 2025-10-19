import { type Request, type Response, type NextFunction } from 'express';
import UserModel from '../models/user';
import NotFoundError from '../errors/not-found-error';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find({});

    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await UserModel.create({ name, about, avatar });

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const { name, about } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const { avatar } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
