export class Auth {
    token?: string;
    user?: User;
}

export class User {
    information?: Information;
    roles: Roles;
}

export class Information {
    id: number;
    code: string;
    lastname: string;
    firstname: string;
    weighted_average: string;
    password: string;
    active: number;
}

export class Roles {
    id: number;
    name: string;
    access: any;
}