const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    //res.status(200).json({ message: 'success', token })

};
