import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import * as DalService from '../services/DalService';
import { ISurfingTrick } from '../Interfaces/ISurfingTrick';

const SurfingController = express.Router();

/**
 * @swagger
 * definitions:
 *   SurfingTrick:
 *     properties:
 *       name:
 *         type: string
 *       youTubeLinkExample1:
 *         type: string
 *       youTubeLinkExample2:
 *         type: string
 *       complexity:
 *         type: string
 *       requiredSpeed:
 *         type: string
 */

/**
 * @swagger
 * /api/surfingTricks:
 *   get:
 *     tags:
 *       - SurfingTricks
 *     description: Returns all Surfing Tricks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Surfing Tricks
 *         schema:
 *           $ref: '#/definitions/SurfingTrick'
 *       500:
 *         description: Internal server error
 */
SurfingController.get('/api/surfingTricks', async (req: Request, res: Response): Promise<void> => {
    try {
        let tricks = await DalService.getAllSurfingTricks();
        res.send(tricks);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /api/surfingTricks:
 *   post:
 *     tags:
 *       - SurfingTricks
 *     description: Creates a new surfing trick
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: surfingTrick
 *         description: SurfingTrick object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SurfingTrick'
 *     responses:
 *       201:
 *         description: Successfully created
 *       500:
 *         description: Internal server error
 */
SurfingController.post('/api/surfingTricks', async (req: Request, res: Response): Promise<void> => {
    try {
        let result = await DalService.createNewTrick(req.body as ISurfingTrick);
        res.status(201);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * @swagger
 * /api/surfingTricks/{trickName}:
 *   get:
 *     tags:
 *       - SurfingTricks
 *     description: Returns a trick by Name (Name is unique)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: trickName
 *         description: Trick Name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single trick
 *         schema:
 *           $ref: '#/definitions/SurfingTrick'
  *       500:
 *         description: Internal server error
 */
SurfingController.get('/api/surfingTricks/:trickName',  async (req: Request, res: Response): Promise<void> => {
    try {
        let result = await DalService.getSurfingTrickByName(req.params.trickName as string);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
  });

export { SurfingController };