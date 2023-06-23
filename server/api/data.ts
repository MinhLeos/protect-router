import protectRoute from '../utils/protectRoute';

export default defineEventHandler(async (event) => {
    await protectRoute(event);
    const data = await $fetch(`https://64940fa00da866a9536717be.mockapi.io/api/v1/user`);

    if (!data || data.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Data not found!'
        })
    }
    return data;
})
