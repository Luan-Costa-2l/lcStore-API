import { Router } from "express";
import * as UserController from '../controllers/UserController'
import * as AdsController from '../controllers/AdsController';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200);
    res.json({ pong: true });
});


router.get('/states', UserController.getStates);

router.post('/user/login', UserController.signin);
router.post('/user/signup', UserController.signup);

router.get('/user/me', UserController.info); // should be private
router.put('/user/me', UserController.editAction); // should be private

router.get('/categories', AdsController.getCategories);

router.get('/ad/list', AdsController.getList);
router.post('/ad/add', AdsController.addAction); // should be private
router.get('/ad/:id', AdsController.getItem);
router.post('/ad/:id', AdsController.editAction); // should be private

export default router;