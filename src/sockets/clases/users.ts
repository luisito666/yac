import { User } from './user';

export class Users {

    users: User[] = [];

    getUser(id: string) {
        return this.users.find( user => user.id === id );
    }

    getUserByName(name: string) {
        const user = this.users.find( user => user.name === name );
        return user ? user : null;
    }

    getUsers(): User[] {
        return this.users.filter( user => user.name !== 'sin-nombre' );
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    updateName(id: string, name: string): void {
        for( let user of this.users ) {

            if ( user.id === id ) {
                user.name = name;
                break;
            }

        }
    }

    deleteUser(id: string) {
        const tmpuser = this.getUser(id);
        this.users = this.users.filter( user => user.id !== id )
        return tmpuser;
    }



}
