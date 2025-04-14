import { User } from "./user.model"

const findUserByEmail = async (email: string) => {
    return User.findOne({ email: email })
}

const createUser = async (email, password, role) => {

}

export const UserServices = {
    findUserByEmail,
    createUser
}