import {ActiveUser} from '../models/activeuser';
import {Client} from '../models/client';
import {Message} from '../models/message';
import {Guest} from '../models/guest';
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
        });
    })
    .then(() => {
        Guest.create({
            chat_client_id: 1,
        });
        Guest.create({
            chat_client_id: 1,
        });
        Guest.create({
            chat_client_id: 1,
        });
        User.create({
            username: 'asd2',
            password: 'asd2',
            email: 'asd2',
            client_administrated_id: 1
        });
        User.create({
            username: 'asd3',
            password: 'asd3',
            email: 'asd3',
        })
        return Message.create({
            guest_user_id: 1,
            message: "Szia!",
            from_admin: false,
        });

    });
})