const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Hint: Why is bcrypt required here?
*/
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');


const authSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

authSchema.pre('save', function(next) {
    // if (this.password) {
    //   const SALT_WORK_FACTOR = bcrypt.genSaltSync(10);
    //   this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    // }
    // next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});


// userSchema.password = bcrypt.hashSync(userSchema.password, salt);

module.exports = mongoose.model('auth', authSchema);
