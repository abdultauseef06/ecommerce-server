const { z } = require ("zod");

const signupSchema = z.object({
    username:z.string({required_error:"name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 characters"})
    .max(255,{message:"Name should not contain more than 255 characters"}),

    email:z.string({required_error:"Email is required"})
    .trim()
    .min(3,{message:"Email must be atleast 3 characters"})
    .max(255,{message:"Email should not contain more than 255 characters"}),

    phone:z.string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone must be atleast 10 Numbers"})
    .max(10,{message:"phone should not contain more than 10 numbers"}),


    password:z.string({required_error:"password is required"})
    .trim()
    .min(8,{message:"Email must be atleast 8 characters"})
    .max(1024,{message:"password should not be greater than 1024 characters"})
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),


})

module.exports=signupSchema;