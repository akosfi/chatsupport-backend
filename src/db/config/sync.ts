import {ActiveUser} from '../models/activeuser';
import {ChatClient} from '../models/chatclient';
import {ChatMessage} from '../models/chatmessage';
import {GuestUser} from '../models/guestuser';
import {User} from '../models/user';

User.sync({force: true})
.then(() => { return ChatClient.sync({force: true}); })
.then(() => { return GuestUser.sync({force: true}); })
.then(() => { return ChatMessage.sync({force: true}); })
.then(() => { return ActiveUser.sync({force: true}); })
.then(() => {
    User.create({
        username: 'felhasznalonev',
        password: 'jelszo',
        email: 'emaill',
    })
    .then(() => {
        return ChatClient.create({
            license: 111,
        });
    })
    .then(() => {
        
    });
})