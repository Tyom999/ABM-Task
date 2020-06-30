module.exports = (req, res, next) => {
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let PasswordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    const errors = [];

    if (!name || typeof(name) !== 'string') {
        errors.push({
            msg: "Error: Name is required"
        })
    }

    if (!lastName || typeof(name) !== 'string') {
        errors.push({
            msg: "Error: Last Name is required"
        })
    }

    if (email && typeof(name) === 'string') {
        if (!emailRegExp.test(email)) {
            errors.push({
                msg: "Error: Email is invalid"
            })
        }
    } else {
        errors.push({
            msg: "Error: Email is required"
        })
    }

    if (password && typeof(name) === 'string') {
        if (!PasswordRegExp.test(password)) {
            errors.push({
                msg: "Error: Password is invalid"
            })
        }
    } else {
        errors.push({
            msg: "Error: Password is required"
        })
    }

    if (errors.length) {
        res.status(422).json(errors);
    } else {
        next();
    }
};

