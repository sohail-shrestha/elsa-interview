import { login, signup } from 'controller/auth.controller';
import { Router } from 'express';

const router = Router()

router.post('/login', login)
router.post('/signup', signup)

export { router as authRouter };
