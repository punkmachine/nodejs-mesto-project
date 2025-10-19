import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} from '../controllers/user';
import {
  createUserValidation,
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} from '../helpers/userValidations';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserByIdValidation, getUserById);
router.post('/', createUserValidation, createUser);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default router;
