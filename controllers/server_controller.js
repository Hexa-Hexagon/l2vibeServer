const { server } = require('../models/');
const { filter } = require('../middlewares/filter');


module.exports.getServers = async(request, response) => {
    try {
        const servers = await server.find();
        response.status(200).send(filter(servers));
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.createServer = async(request, response) => {
    try {
        const { body } = request;
        const newServer = await server.create(body);
        response.status(200).send(newServer);
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
}

module.exports.patchServer = async(request, response) => {
    try {
        const { body, params: { id } } = request;
        const updatedServer = await server.findByIdAndUpdate(id, body);
        response.status(200).send(updatedServer);
    } catch (error) {
        response.status(500).send(error);
    }
}

module.exports.deleteServer = async(request, response) => {
    try {
        const { params: { id } } = request;
        const deletedServer = await server.findByIdAndDelete(id);
        response.status(200).send(deletedServer);
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
}