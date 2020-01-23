
import { Router, Request, Response } from 'express';
import { messages } from '../sockets/sockets';
// import Server from '../clases/server'

const router = Router();


// Obtener usuarios y sus nombres
router.get('/messages', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        messages: messages.getMessages()
    });

    
});


export default router;
