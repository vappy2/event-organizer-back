const EventModel = require('../../models/event');

const ResolversEvent = {
    events: async () => {
        try {
            const listEvent = await EventModel.find(); 
            
            return listEvent.map(event => {
                return {
                    _id: event.id,
                    ...event._doc,
                    createdAt: new Date(event._doc.createdAt).toISOString()
                }
            });
        }
        catch(error) {
            throw error
        }
    },
    event: async (args) => {
        try {
            const event = await EventModel.find({title: args.title});

            return {
                ...event._doc,
                _id: event.id
            }
        } catch (error) {
            throw error
        }
    },
    addEvent: async (args) => {
        const event = new EventModel({
            title: args.event.title,
            description: args.event.description,
            category: args.event.category,
            date: args.event.date,
            nbPeoples: args.event.nbPeoples,
            emailCreator: args.event.description
        });
        //Attention, lorsque que l'on passe un input en tant que paramètre, il faudra d'abord accéder à l'input avant d'accéder aux champs qu'il contient
        const newEvent = event.save();
        //On sauvegarde l'instance de MovieModel dans la bdd
        return {
            _id: newEvent.id, 
            ...newEvent._doc // Spécial à mongodb
            //On retourne un objet contenant l'id et les données telles que le titre, le synopsi
        }
    },

    removeEvent: async (args) => {
        const doc = await EventModel.findOne({title: args.title});

        let result = await EventModel.deleteOne({_id: doc.id});

        return result != null;
    },

    updateEvent: async (args) => {
        const doc = await EventModel.findOne({title: args.title});

        if (doc != null) {
            if (args.event.title != null) {
                doc.title = args.event.title;
            }
            if (args.event.description != null) {
                doc.description = args.event.description;
            }
            if (args.event.category != null) {
                doc.category = args.event.category;
            }
            if (args.event.date != null) {
                doc.date = args.event.date;
            }
            if (args.event.nbPeoples != null) {
                doc.nbPeoples = args.event.nbPeoples;
            }
            if (args.event.emailCreator != null) {
                doc.emailCreator = args.event.emailCreator;
            }

            const updateEvent = doc.save();
            return{
                ...updateEvent._doc,
                _id : updateEvent.id
            }
        }
    }
}

//Avec express-graphql, on ne précise pas Query et Mutation dans le resolvers (graphql viendra les valider à partir du schéma)

module.exports = ResolversEvent;