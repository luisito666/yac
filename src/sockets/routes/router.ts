
import { Router, Request, Response } from 'express';
import { messages, usersOnline } from '../sockets/sockets';
// import Server from '../clases/server'

const router = Router();


// Obtener usuarios y sus nombres
router.get('/messages', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        messages: messages.getMessages()
    });

    
});

router.get('/user/:username', (  req: Request, res: Response ) => {

    let username = req.params.username;

    console.log(username);

    res.json({
        ok: true,
        user: usersOnline.getUserByName(username)
    });

    
})


export default router;
