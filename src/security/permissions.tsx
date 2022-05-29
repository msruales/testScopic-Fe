import Roles from "./roles";

const roles = Roles.values;

export interface IPermission {
    id: string,
    allowedRoles: [string]
}

class Permissions {

    static get values() {

        return {
            vendor: {
                id: 'regular',
                allowedRoles: [
                    roles.regular
                ],
            },
            admin: {
                id: 'admin',
                allowedRoles: [
                    roles.admin,
                ],
            },

            allRoles: {
                id: 'allRoles',
                allowedRoles: [
                    roles.admin,
                    roles.regular,
                ]
            },

        }

    }
}

export default Permissions