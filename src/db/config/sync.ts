import {ActiveUser} from '../models/activeuser';
import {Client} from '../models/client';
import {Message} from '../models/message';
import {Guest} from '../models/guestuser';
import {User} from '../models/user';

User.sync({force: true})
.then(() => { return Client.sync({force: true}); })
.then(() => { return Guest.sync({force: true}); })
.then(() => { return Message.sync({force: true}); })
.then(() => { return ActiveUser.sync({force: true}); })
.then(() => {
    User.create({
        username: 'felhasznalonev',
        password: 'jelszo',
        email: 'emaill',
    })
    .then(() => {
        return Client.create({
            license: 111,
        });
    })
    .then(() => {
        
    });
})