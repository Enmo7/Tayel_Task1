import { Router } from 'express';
import { generateCaption, getHistory } from './caption.controller';
import { upload } from '../../middleware/multer';

const router = Router();

router.post('/', upload.single('image'), generateCaption);
router.get('/history', getHistory);

export default router;
