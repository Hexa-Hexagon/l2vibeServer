module.exports.sendError = (error, response) => {
    try {
        const serverName = error.errors.serverName ?
        error.errors.serverName.properties ?
        error.errors.serverName.properties.path : error.errors.serverName.path : null;

    const status = error.errors.status ?
        error.errors.status.properties ?
        error.errors.status.properties.path : error.errors.status.path : null;

        const difficulty = error.errors.difficulty ?
        error.errors.difficulty.properties ?
        error.errors.difficulty.properties.path : error.errors.difficulty.papth : null;

        const version = error.errors.version ?
        error.errors.version.properties ?
        error.errors.version.properties.path : error.errors.version.path : null;

        const isAction = error.errors.isAction ?
        error.errors.isAction.properties ?
        error.errors.isAction.properties.path : error.errors.isAction.path : null;

        const dateOfStartingServer = error.errors.dateOfStartingServer ?
        error.errors.dateOfStartingServer.properties ?
        error.errors.dateOfStartingServer.properties.path : error.errors.dateOfStartingServer.path : null;

        const dateOfEndingContract = error.errors.dateOfEndingContract ?
        error.errors.dateOfEndingContract ?
        error.errors.dateOfEndingContract.properties.path : error.errors.dateOfEndingContract.path : null;
        const list = [serverName, status, difficulty, version, isAction, dateOfStartingServer, dateOfEndingContract];
        const loc = []
        let j = 0;
        for (let i = 0; i < list.length; ++i) {
            if (list[i]) {
                loc[j] = list[i];
                ++j;
            }
        }
        response.status(500).send({ type: error.name, msg: error._message, loc: loc });
    } catch (error) {
        console.log(error);
    }
}