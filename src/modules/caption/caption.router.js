import { Router } from 'express';
import { generateCaption, getHistory, deleteHistory } from './caption.controller.js';
import { upload } from '../../middleware/multer.js';

const router = Router();

router.post('/', upload.single('image'), generateCaption);
router.get('/history', getHistory);
router.delete('/history/:id', deleteHistory);

export default router;
