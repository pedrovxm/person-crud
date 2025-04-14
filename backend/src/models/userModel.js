import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    birthDate: { type: Date, required: true },
    phone: { type: String, required: true },  // Campo phone
    national_id: { 
        type: String, 
        required: true,  // Campo obrigatório
        maxlength: [11, 'National ID must be at most 11 characters']  // Validação de 11 caracteres no máximo
    } 
});


const userModel = mongoose.model("User",userSchema)

export {userModel}