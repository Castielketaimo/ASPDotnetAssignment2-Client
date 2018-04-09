import { User } from './User';
export class Boat {
    constructor(
        public boatId: number,
        public boatName: string,
        public picture: string,
        public lengthInFeet: number,
        public make: string,
        public year: number,
        public creationDate: number,
        public createdBy: User
    ){}
}