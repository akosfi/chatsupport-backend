import {ActiveUser} from './activeuser';
import {User} from './user';
import {GuestUser} from './guestuser';
import {ChatAdmin} from './chatadmin';
import {ChatClient} from './chatclient';
import {ChatMessage} from './chatmessage';


ActiveUser.belongsTo(User, {
    targetKey: 'id',
});
ActiveUser.belongsTo(GuestUser, {
    targetKey: 'id',
});


ChatAdmin.belongsTo(User, {
    foreignKey: 'admin_id',
    as: 'admins',
});
ChatAdmin.belongsTo(ChatClient, {
    foreignKey: 'chat_client_id',
    as: 'chat_clients',
});


ChatClient.belongsTo(User, {
    foreignKey: 'owner_id',
    as: 'owner',
});
ChatClient.hasMany(ChatAdmin, {
    sourceKey: 'id',
    foreignKey: 'chat_client_id',
    as: 'chatAdmins',
});
ChatClient.hasMany(GuestUser, {
    sourceKey: 'id',
    foreignKey: 'chat_client_id',
    as: 'guestUsers',
});

ChatMessage.belongsTo(GuestUser, {
    foreignKey: 'guest_user_id',
    as: 'guest_user',
});

GuestUser.belongsTo(ChatClient, {
  foreignKey: 'chat_client_id',
  as: 'chat',
});
GuestUser.hasMany(ChatMessage, {
  sourceKey: 'id',
  foreignKey: 'guest_user_id',
  as: 'messages',
});
GuestUser.hasOne(ActiveUser, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'active',
});
  



User.hasMany(ChatClient, {
    sourceKey: 'id',
    foreignKey: 'owner_id',
    as: 'chatClients'
});
User.hasMany(ChatAdmin, {
    sourceKey: 'id',
    foreignKey: 'admin_id',
    as: 'chatClientsAdministrated',
});
User.hasOne(ActiveUser, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'active',
});