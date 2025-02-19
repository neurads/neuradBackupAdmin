const CONSTANTS = {
    ADMIN_ROLES: [
        "OWNER",
        "ADMIN"
    ],
    EDITOR_ROLES: [
        "OWNER",
        "ADMIN",
        "EDITOR"
    ]
};

const APPLICATION_KIND = Object.freeze({
    ANDROID : 'ANDROID',
    IOS : 'IOS'
});

module.exports = {
    CONSTANTS,
    APPLICATION_KIND
};
