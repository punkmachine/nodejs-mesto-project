import { Router } from 'express';
import {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} from '../controllers/user';
import {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} from '../helpers/validations/userValidations';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser as any);
router.get('/:id', getUserByIdValidation, getUserById);
router.patch('/me', updateProfileValidation, updateProfile as any);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar as any);

export default router;
