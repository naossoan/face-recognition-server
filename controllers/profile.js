const handleProfile = (req, res) => {
    const { id } = req.params //destructure ID from the URL req params
    db.select('*').from('users').where({id}).then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(404).json('not found')
        }
    }).catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfile: handleProfile
}