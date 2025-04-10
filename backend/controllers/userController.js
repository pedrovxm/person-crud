import { userModel } from "../models/userModel.js";



class UserController {

    async createUser(req, res) {

        try {
            const { firstName, lastName, address, birthDate, phone, national_id } = req.body;
            const input = {
                firstName,
                lastName,
                address: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                    country: address.country
                },
                birthDate,
                phone,
                national_id
            }
            const newUser = new userModel(input)

            await newUser.save()

            res.status(200).json({newUser})
        }catch(err){
            console.log(`Error creating user ${err}`)
            res.status(400).json({message:err.message})
        }

    }
}


export {UserController}