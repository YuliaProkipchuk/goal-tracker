const errorHandler = async(err, _, res, next)=>{
    console.log('ERROR!', err);
    const status = err.status||500;
    const message = err.message||'Something went wrong'
    res.status(status).json({ message: message })
}

module.exports = errorHandler