import { logModel } from "../models/logModel.js";


class LogController{

    async findMany(req,res){

        try{
            const allLogs = await logModel.find({})

            res.status(200).json(allLogs)
        }catch(err){
            console.log(`Error getting logs ${err}`)
            res.status(500).json({error: err})
        }
    }
}

export {LogController}