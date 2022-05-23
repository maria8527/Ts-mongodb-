import Joi from 'joi'; 


const photoSchema = Joi.object({
    albumId: Joi.number().required(),
    id: Joi.number().required(),
    title: Joi.string().required(),
    url: Joi.string().required(),
    thumbnailUrl: Joi.string().required()
})

export default photoSchema; 