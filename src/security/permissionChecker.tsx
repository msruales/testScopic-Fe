import {User} from "../models/user.model";
import {AuthToken} from "../config/auth/authToken";

export class PermissionChecker {

    constructor(private user: User) {
    }

    get currentUserRolesId() {
        if (!this.user) {
            return []
        }
        return String(this.user.isAdmin)
    }

    match(permission: any) {
        if (!permission) {
            return false
        }
        return this.rolesMatchOneOf(permission.allowedRoles);
    }

    rolesMatchOneOf(roles: []) {
        if (!this.currentUserRolesId) {
            return false;
        }

        if (Array.isArray(roles)) {
            if (!roles.length) {
                return false;
            }

            return roles.some((role) =>
                this.currentUserRolesId.includes(role),
            );
        }

        return false
    }

    isAuth() {
        return !!(this.user && AuthToken.get())
    }

    isAdmin() {
        return this.user.isAdmin === 1
    }
}