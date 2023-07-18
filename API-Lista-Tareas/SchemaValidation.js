const Ajv = require('ajv').default, AJV_OPTS = {allErrors: true};

module.exports = {
    verify: (schema) => {
        if (!schema) {
            throw new Error('Schema no proporcionado');
        }

        return (req, res, next) => {
            const { body } = req;
            const ajv = new Ajv(AJV_OPTS);
            const validate = ajv.compile(schema);
            const isValid = validate(body);

            if (isValid) {
                return next();
            }

            return res.send({
                status: false,
                error: {
                    message: `Carga no válida: ${ajv.errorsText(validate.errors)}`
                }
            });
        }
    }
};