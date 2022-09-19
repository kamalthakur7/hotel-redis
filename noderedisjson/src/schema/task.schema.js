import { Entity, Schema } from "redis-om";

class hotel extends Entity {
    toJSON() {
        return {
            id: this.entityId,
            name: this.name,
            price: this.price,
            description: this.description,
            rating: this.rating,
            address: this.address,
            rating: this.rating,
            contact: this.contact
        }
    }
}

export const userSchema = new Schema(hotel, {
    name: {
        type: 'string'
    },
    price: {
        type: 'number'
    },
    description: {
        type: 'string'
    },
    rating: {
        type: 'number'
    },
    address: {
        type: 'string'
    },
    contact: {
        type: 'string'
    }

}, {
    dataStructure: 'JSON'
});