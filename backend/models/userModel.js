import bcrypt from "bcryptjs";
import "dotenv/config"
import mongoose from "mongoose";
import validator from "validator"
import { USER } from "../constants/index.js";

const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email address."]
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value){
                return /^[A-z][A-z0-9-_]{3,23}$/.test(value)
            }, 
            message: "username must be alphanumeric, without any special characters. Hyphens and Underscores allowed."
        }
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        validate: [
            validator.isAlphanumeric, "First name can only have alphanumeric values. Special characters are not allowed."
        ]
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        validate: [
            validator.isAlphanumeric, "Last name can only have alphanumeric values. Special characters are not allowed."
        ]
    },
    password: {
        type: String,
        select: false,
        validate: [
            validator.isStrongPassword, "Password must be at least 8 chars long, with at least 1 uppercase and lowecase letters and at least 1 symbol."
        ],
    }, 
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (value){
                return value === this.password
            },
            message: "Passwords do not match."
        },
    }, 
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false,
    }, 
    provider: {
        type: String,
        required: true,
        default: "email"
    },
    googleID: String,
    avatar: String, 
    businessName: String,
    phoneNumber: {
        type: String,
        default: "+912345678901",
        validate: [
            validator.isMobilePhone, "Your mobile phone number must begin with a '+' followed by country code then actual number "
        ]
    },
    address: String,
    city: String,
    country: String,
    passwordChangedAt: Date,
    roles: {
        type: [String], 
        default: [USER]
    },
    active: {
        type: Boolean,
        default: true
    },
    refreshToken: [String], 
}, {
    timestamps: true,
})

userSchema.pre("save", async function(next){
    if (this.roles.length === 0){
        this.roles.push(USER)
        next()
    }
})

userSchema.pre("save", async function(next){
    if (!this.isModified("pssword")){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre("save", async function(next){
    if (!this.isModified("pssword") || this.isNew){
        return next()
    }
    this.passwordChangedAt = Date.now()
    next()
})

userSchema.method.comparePassword = async function(givenPassword){
    return await bcrypt.compare(givenPassword, this.password) 
}

const User = mongoose.model("User", userSchema)

export default User;