import { Schema, Document, model } from "mongoose"; 

export interface IBooking extends Document {
   user: Types.ObjectId;
   restaurant: Types.ObjectId;
   date: Date;
   time: string;
   guests: number;
   occasion?: string;
   specialRequests?: string;
   status: "confirmed" | "cancelled" | "completed"
   bookingId: string;
   createdAt: Date;
   updateDAt: Date;
}

const bookingSchema = new Schema <IBooking> (
  {
    user : {
      type : Schema.Types.objectId,
      ref : "User",
      required : true
    },

    restaurant : {
      type : Schema.Types.objectid,
      ref : "Restaurant",
      required : true
    },

    date : {
      type : Date,
      required : true,
    },

    time : {
      type : String,
      required : true,
    },

    guests : {
      type : Number,
      required : true,
      min : 1
    },

    occasion : {
      type : String,
      trim : true
    },

    specialRequests : {
      type : String,
      time : true
    },

    status : {
      type : String,
      enum : ["confirmed", "cancelled", "completed"],
      default : "confirmed"
    },

    bookingId : {
      type : String,
      unique : true
    }
  },
  {
    timestamps: true,
  },
);

// Remove password when converting to JSON

bookingSchema.pre("save", function () {
  if(!this.bookingId) {
    this.bookingId = `GR-${crypto.randomBytes(4).toString("hext").toUpperCase()}`
  }
})

export const Booking = model<IBooking> ("Booking", bookingSchema);
