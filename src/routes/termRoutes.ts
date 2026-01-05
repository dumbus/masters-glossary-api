import { Router } from 'express';
import {
  createTerm,
  getTerms,
  getTermById,
  updateTerm,
  deleteTerm,
} from '../controllers/termController';

const router = Router();

router.get('/', getTerms);
router.get('/:id', getTermById);
router.post('/', createTerm);
router.put('/:id', updateTerm);
router.delete('/:id', deleteTerm);

export default router;
