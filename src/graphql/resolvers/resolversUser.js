const UserModel = require('../../models/user');

const ResolversUser = {
    users: async () => {
        try {
            const listUser = await UserModel.find(); 
            
            return listUser.map(user => {
                return {
                    _id: user.id,
                    ...user._doc,
                    createdAt: new Date(user._doc.createdAt).toISOString()
                }
            });
        }
        catch(error) {
            throw error
        }
    },
    user: async (args) => {
        try {
            const user = await UserModel.find({email: args.email});

            return {
                ...user._doc,
                _id: user.id
            }
        } catch (error) {
            throw error
        }
    },

    addUser: async (args) => {
        const user = new UserModel({
            firstname: args.user.firstname,
            lastname: args.user.lastname,
            email: args.user.email,
            password: args.user.password,
        });
        //Attention, lorsque que l'on passe un input en tant que paramètre, il faudra d'abord accéder à l'input avant d'accéder aux champs qu'il contient
        const newUser = user.save();
        //On sauvegarde l'instance de MovieModel dans la bdd
        return {
            _id: newUser.id, 
            ...newUser._doc // Spécial à mongodb
            //On retourne un objet contenant l'id et les données telles que le titre, le synopsi
        }
    },

    removeUser: async (args) => {
        const doc = await UserModel.findOne({email: args.email});

        let result = await UserModel.deleteOne({_id: doc.id});

        return result != null;
    },

    updateUser: async (args) => {
        const doc = await UserModel.findOne({email: args.email});

        if (doc != null) {
            if (args.user.email != null) {
                doc.email = args.user.email;
            }
            if (args.user.firstname != null) {
                doc.firstname = args.user.firstname;
            }
            if (args.user.lastname != null) {
                doc.lastname = args.user.lastname;
            }
            if (args.user.password != null) {
                doc.date = args.user.password;
            }

            const updateUser = doc.save();
            return{
                ...updateUser._doc,
                _id : updateUser.id
            }
        }
    }
}

//Avec express-graphql, on ne précise pas Query et Mutation dans le resolvers (graphql viendra les valider à partir du schéma)

module.exports = ResolversUser;