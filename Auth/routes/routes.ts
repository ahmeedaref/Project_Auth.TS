import { Router } from 'express';

import {
	create,
	deleteItem,
	getAllItems,
	getItem,
	login,
	register,
	updateItem,
} from '../controllers/controller';
import { checkSuperAdmin, checkToken } from '../middellwares/middellwares';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/', checkToken, create);
router.get('/', checkToken, getAllItems);
router.get('/:id', getItem);
router.put('/:id', checkToken, checkSuperAdmin, updateItem);
router.delete('/:id', checkToken, checkSuperAdmin, deleteItem);
export default router;
