const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(re4s, req, next)
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper