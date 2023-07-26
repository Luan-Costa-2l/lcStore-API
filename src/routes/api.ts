import { Router } from "express";
import * as UserController from '../controllers/UserController'
import * as AdsController from '../controllers/AdsController';
import * as AuthController from '../controllers/AuthController';

import * as AuthValidator from '../validators/AuthValidator';
import * as UserValidator from '../validators/UserValidator';
import * as AdValidator from '../validators/AdValidator';

import * as Auth from '../middlewares/Auth';
import { upload } from "../middlewares/Upload";

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200);
    res.json({ pong: true });
});


router.get('/states', UserController.getStates);

router.post('/user/login', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

router.get('/user/me', AuthValidator.info, Auth.privateRoute, UserController.info);
router.put('/user/me', UserValidator.editAction, Auth.privateRoute, UserController.editAction);

router.get('/categories', AdsController.getCategories);

router.get('/ad/list', AdsController.getList);
router.post('/ad/add', upload.array('img', 5), AdValidator.addad, Auth.privateRoute, AdsController.addAction);
router.get('/ad/:id', AdsController.getItem);
router.post('/ad/:id', Auth.privateRoute, AdsController.editAction);

export default router;