const product = require("../../models/Product-model")
const connectdb = require("../../utils/database")

const handler = async (req,res)=>{
    if(req.method=="post"){
        for(let i=0;i<req.body.length;i++){
        let p = new product({
            name:req.body[i].name,
            id: req.body[i].id,
            price: req.body[i].price,
            colors: req.body[i].colors,
            image: req.body[i].image,
            description: req.body[i].description,
            category: req.body[i].category,
            featured:req.body[i].featured,
            stock: req.body[i].stock,
            reviews: req.body[i].reviews,
            stars: req.body[i].stars,   
        })
    }
        await p.save()
    }
    else{
        res.status(400).json({error:"this method is not allowed"})
    }

}