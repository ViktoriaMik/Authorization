module.exports = {
    userNormalizator: (dataToNormalize = {}) => {
        const fieldsToRemove = ['password'];
        fieldsToRemove.forEach((field) => {
            delete dataToNormalize[field]
        })
        return dataToNormalize
    }
}
