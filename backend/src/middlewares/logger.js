import { logModel } from "../models/logModel.js"

async function logger(req,res,next){
    req.timestamp = Date.now()

    res.on("finish",async()=>{
        const responseTime = Date.now()
        const {method,url} = req
        const userAgent = req.get("user-agent")
        const statusCode = res.statusCode

        const logInput = {
			requestTime: req.timestamp,
			responseTime,
			method,
			url,
			statusCode,
			userAgent,
			body: req.body,
			params: req.params,
			query: req.query,
		};

        const newLog = new logModel(logInput)

        await newLog.save()
    })

    next()
}


export{logger}