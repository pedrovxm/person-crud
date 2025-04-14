import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
	requestTime: { type: Date, required: true },
	responseTime: { type: Date, required: true },
	method: { type: String, required: true },
	url: { type: String, required: true },
	statusCode: { type: Number, required: true },
	userAgent: { type: String },
	body: { type: mongoose.Schema.Types.Mixed },
	params: { type: mongoose.Schema.Types.Mixed },
	query: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true })

const logModel = mongoose.model('Log', logSchema)

export {logModel}
