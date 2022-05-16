module.exports = class Person {
    static fieldsToExclude = ['password']
    constructor({ username, password, email }) {

        this.username = username;
        // encrypt the password if possible
        this.password = password;
        this.email = email;
        this.dateJoined = Date();

    }

    toJson(excludeList) {
        const fieldsToExclude = excludeList !== undefined ? Person.fieldsToExclude : [...Person.fieldsToExclude, ...excludeList];
        const returnObj = {};

        for (const key in this) {
            if (!this.hasOwnProperty(key)) continue;
            if (!fieldsToExclude.includes(key))
                returnObj[key] = this[key];
        }

        return returnObj;
    }
}