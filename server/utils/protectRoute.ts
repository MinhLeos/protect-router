import { H3Event } from 'h3';

export default async (event: H3Event) => {
    const { headers } = event.node.req;
    console.log('headers.authorization', headers.authorization);

    if (!headers.authorization) {
        console.log('-------');

        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Unauthorized'
        });
    }
}