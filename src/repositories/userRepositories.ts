import Session, { SessionAttributes } from "../database/models/Session";
import User, { UserAttributes } from "../database/models/Users";

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

export default {
    saveNewUser,
    findUserByAttribute,
    saveSession
}