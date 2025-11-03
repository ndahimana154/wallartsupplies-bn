import Joi from "joi";

export const newUserValidations = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).max(100).required(),
    names: Joi.string().required()
})

export const userLoginValidations = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const forgotPasswordValidations = Joi.object({
    email: Joi.string().required()
})

export const verifyForgotPasswordToken = Joi.object({
    userId: Joi.number().required(),
    token: Joi.string().required()
})

export const resetPasswordValidations = Joi.object({
    userId: Joi.number().required(),
    token: Joi.string().required(),
    password: Joi.string().required()
})