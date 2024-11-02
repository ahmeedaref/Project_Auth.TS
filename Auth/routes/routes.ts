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
import {
	checkAccessRole,
	checkAdminsatration,
	checkToken,
} from '../middellwares/middellwares';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/', checkToken,checkAccessRole, create);
router.get('/', checkToken, getAllItems);
router.get('/:id', checkToken,getItem);
router.put('/:id', checkToken, checkAdminsatration, updateItem);
router.delete('/:id', checkToken, checkAccessRole, deleteItem);
export default router;
