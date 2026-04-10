import { Router } from 'express';
import { createCategory, updateCategory, deleteCategory, listCategories } from '../controllers/category.controller';

const categoryRoutes = Router();

categoryRoutes.get('/', listCategories);
categoryRoutes.post('/', createCategory);
categoryRoutes.put('/:id', updateCategory);
categoryRoutes.delete('/:id', deleteCategory);

export default categoryRoutes;