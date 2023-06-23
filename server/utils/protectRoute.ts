import { H3Event } from 'h3';
import users from '@/assets/data/user.json';

export default async (event: H3Event) => {
    const { headers } = event.node.req;
    console.log('headers.authorization', headers.authorization);
    if (!headers.authorization) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Please login to get data!',
            message: 'Unauthorized'
        });
    }
    //Get Random userID and check Permission
    const userId = Math.floor(Math.random() * 22) + 1;
    console.log('userId', userId);

    //Check permission
    const user = users.find(us => us.id === userId);
    console.log('user', user);
    if (!user || !user.isHavePermission) {
        throw createError({
            statusCode: 401,
            statusMessage: 'You do not have permission to get data!',
            message: 'Unauthorized'
        });
    }
}