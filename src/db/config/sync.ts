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
        username: 'asd',
        password: 'asd',
        email: 'asd',
    })
    .then(() => {
        return Client.create({
            license: 111,
            owner_id: 1,
        });
    })
    .then(() => {
        return Guest.create({
            chat_client_id: 1,
        })
    });
})