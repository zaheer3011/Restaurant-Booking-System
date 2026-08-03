import { Schema, Document, model, Types } from "mongoose"; 

export interface IRestaurant extends Document {
    name : string;
    slug : string;
    description : string;
    cuisino : string;
    priceRange : "$" | "$$" | "$$$" | "$$$";
    rating : number;
    reviewCount : number;
    location : string;
    address : string;
    image : string;
    chef : string;
    tags : string[];
    availableSlots : string[];
    featured : boolean;
    exclusive : boolean;
    owner : Types.ObjectId;
    status : "pending" | "approved" | "rejected";
    totalSeats : number;
    createdAt : Date;
    updatedAt : Date;
 
}

const restaurantSchema = new Schema <IRestaurant> (
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    slug : {
        type: String,
        trim: true,
        required: true,
        unique : true
    },

    description : {
        type: String,
        required : true,
    },

    cuisino : {
        type : String,
        required : true,
        trim : true
    },

    priceRange : {
        type : String,
        enum : ['$', '$$', '$$$', '$$$$']
    },

    rating : {
        type : Number,
        default : 5.0,
        min : 1, 
        max : 5
    },

    reviewCount : {
        type : Number,
        default : 0
    },

    location : {
        type : String,
        required : true,
        trim : true
    },

    address : {
        type : String,
        required : true,
    },

    image : {
        type : String,
        default : ""
    },

    chef : {
        type : String,
        required : true,
    },

    tags : [{
        type : String
    }],

    availableSlots : [{
        type : String
    }],

    featured : {
        type : Boolean,
        default : false,
    },

    exclusive : {
        type : Boolean,
        default : false
    },

    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    status : {
        type : String,
        enum : ["pending", "approved", "rejected"],
        default : "pending"
    }
  },
  {
    timestamps: true,
  },
);


export const Restaurant = model<IRestaurant> ("Restaurant", restaurantSchema);
