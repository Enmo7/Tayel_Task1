import { Router } from 'express';
import { generateCaption, getHistory } from './caption.controller.js';
import { upload } from '../../middleware/multer.js';

const router = Router();

router.post('/', upload.single('image'), generateCaption);
router.get('/history', getHistory);

export default router;
