import { Boat } from './Boat';
import { User } from './User';
export class Reservation {

    constructor(public reservationId?: number,
                public startDateTime?: string,
                public endDateTime?: string,
                public createdBy?: string,
                public boatId?: number,
                public boat?: Boat,
    ){}
}
