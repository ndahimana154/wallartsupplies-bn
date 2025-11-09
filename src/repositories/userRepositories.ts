import Session, { SessionAttributes } from "../database/models/Session";
import User, { UserAttributes } from "../database/models/Users";
import { UpdateUserData } from "../types/UserTypes";

const saveNewUser = async (data: UserAttributes) => {
    const user = await User.create(data);
    return user
}

const findUserByAttribute = async (key: string, value: string) => {
    const user = await User.findOne({
        where: {
            [key]: value
        }
    })
    return user
}

const saveSession = async (data: SessionAttributes) => {
    const session = await Session.create(data);
    return session
}

const findSessionBy2Attribute = async (key1: string, value1: string, key2: string, value2: string) => {
    const session = await Session.findOne({
        where: {
            [key1]: value1,
            [key2]: value2
        }
    })
    return session
}

const findSessionByAttribute = async (key: string, value: string) => {
    const session = await Session.findOne({
        where: {
            [key]: value,
        }
    })
    return session
}

const updateUser = async (id: number, data: UpdateUserData) => {
    const user = await User.update(data, { where: { id } })
    return user
}

const deleteSession = async (id: number) => {
    const deleted = await Session.destroy({ where: { id } })
    return deleted;
}

export default {
    saveNewUser,
    findUserByAttribute,
    saveSession,
    findSessionBy2Attribute,
    updateUser,
    deleteSession,
    findSessionByAttribute
}