export const isAdmin = (user) => {
    return user.role && user.role === 'admin';
}

export const isUser = (user) => {
    return user.role && user.role === 'user';
}
