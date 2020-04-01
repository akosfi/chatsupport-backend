import {ActiveUser} from '../models/activeuser';
import {ChatAdmin} from '../models/chatadmin';
import {ChatClient} from '../models/chatclient';
import {ChatMessage} from '../models/chatmessage';
import {GuestUser} from '../models/guestuser';
import {User} from '../models/user';

User.sync({force: true})
.then(() => { return ChatClient.sync({force: true}); })
.then(() => { return ChatAdmin.sync({force: true}); })
.then(() => { return GuestUser.sync({force: true}); })
.then(() => { return ChatMessage.sync({force: true}); })
.then(() => { return ActiveUser.sync({force: true}); })