/*
    passport authentication strategy
*/

module.exports = function (LocalStrategy, User) {

    return new LocalStrategy(

        // Authenticate users by username & password
        function (username, password, done) {
            User.findOne(
                { username: username },
                { username: 1, salt: 1, hash: 1, admin: 1 },
                (err, user) => {

                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, {
                            message: 'Invalid User Name'
                        });
                    }
                    
                    if (!user.validatePassword(password)) {
                        return done(null, false, {
                            message: 'Invalid Password'
                        });
                    }

                    if (user && !user.admin) {
                        return done(null, false, {
                            message: 'Administrators only'
                        });
                    }
                    
                    // success
                    return done(null, user);

                }
            );
        }
    );
};
