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

    async getUsers(req,res){
        try{
            const allUsers = await userModel.find({})

            res.status(200).json(allUsers)
        }catch(err){
            console.log(`Error getting users : ${err}`)
            res.status(400).json({error: err})
        }
    }

    async updateUser(req,res){
        try{
            const id = req.params.id
            const { firstName, lastName, address, birthDate, phone, national_id } = req.body;

            const newUser = {
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

            const newUserData = await userModel.findByIdAndUpdate(id,newUser,{new:true})

            res.status(200).json(newUserData)
        }catch(err){
            console.log(`Error updating user: ${err}`)
            res.status(400).json({error: err})
        }
    }


    async deleteUser(req,res){
        try{

            const id = req.params.id
            const user = await userModel.findByIdAndDelete(id)

            res.status(200).json(user)
        }catch(err){
            console.log(`Error deleting user : ${err}`)
            res.status(400).json({error: err})
        }
    }
}


export {UserController}