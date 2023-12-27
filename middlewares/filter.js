const filterStatus = (array, status) => {
    const servers = array.filter(server => server.status === status);
    servers.sort((a, b) => {
        return a.dateOfStartingServer.setHours(0, 0, 0, 0) - b.dateOfStartingServer.setHours(0, 0, 0, 0);
    });
    return servers;
}

const filterJustOpened = (array) => {
    const currentDate = new Date();
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);

    const justOpened = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return (serverDate === currentDate.setHours(0, 0, 0, 0) || serverDate === yesterday.setHours(0, 0, 0, 0)) &&
                server.status !== 'King VIP' &&
                !server.isAction;
        }
    );

    const result = [
        filterStatus(justOpened, 'Super VIP'),
        filterStatus(justOpened, 'VIP'),
        filterStatus(justOpened, 'Premium'),
        filterStatus(justOpened, 'Standart')
    ];

    return result;
}


const filterTimeTested = (array) => {
    const currentDate = new Date();
    const twoDaysAgo = new Date(currentDate);
    twoDaysAgo.setDate(currentDate.getDate() - 2);

    const fortyFiveDaysAgo = new Date(currentDate);
    fortyFiveDaysAgo.setDate(currentDate.getDate() - 45);

    const timeTested = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate > fortyFiveDaysAgo && serverDate <= twoDaysAgo &&
                server.status !== 'King VIP' &&
                !server.isAction;
        }
    );

    const result = [
        filterStatus(timeTested, 'Super VIP'),
        filterStatus(timeTested, 'VIP'),
        filterStatus(timeTested, 'Premium'),
        filterStatus(timeTested, 'Standart')
    ];

    return result;
}


const filterThisWeek = (array) => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay()));

    const thisWeek = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= tomorrow && serverDate <= endOfWeek &&
                server.status !== 'King VIP';
        }
    );

    const result = [
        filterStatus(thisWeek, 'Super VIP'),
        filterStatus(thisWeek, 'VIP'),
        filterStatus(thisWeek, 'Premium'),
        filterStatus(thisWeek, 'Standart')
    ];

    return result;
}


const filterThisMonth = (array) => {
    const currentDate = new Date();
    const startOfNextWeek = new Date(currentDate);
    startOfNextWeek.setDate(currentDate.getDate() + (8 - currentDate.getDay())); // Начало следующей недели

    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 0); // Конец месяца

    const filteredServers = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= startOfNextWeek && serverDate <= endOfMonth &&
                server.status !== 'King VIP';
        }
    );

    const result = [
        filterStatus(filteredServers, 'Super VIP'),
        filterStatus(filteredServers, 'VIP'),
        filterStatus(filteredServers, 'Premium'),
        filterStatus(filteredServers, 'Standart')
    ];

    return result;
};


const filterStartsLater = (array) => {
    const currentDate = new Date();
    const startOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    startOfNextMonth.setHours(0, 0, 0, 0); // Начало следующего месяца

    const startsLater = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= startOfNextMonth &&
                server.status !== 'King VIP';
        }
    );

    const result = [
        filterStatus(startsLater, 'Super VIP'),
        filterStatus(startsLater, 'VIP'),
        filterStatus(startsLater, 'Premium'),
        filterStatus(startsLater, 'Standart')
    ];

    return result;
};


const filterBonusStarted = (array) => {
    const currentDate = new Date();
    const daysAgo = new Date(currentDate);
    daysAgo.setDate(currentDate.getDate() - 45);

    const bonusStarted = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= daysAgo && serverDate <= currentDate &&
                server.status !== 'King VIP' &&
                server.isAction;
        }
    );

    const result = [
        filterStatus(bonusStarted, 'Super VIP'),
        filterStatus(bonusStarted, 'VIP'),
        filterStatus(bonusStarted, 'Premium'),
        filterStatus(bonusStarted, 'Standart')
    ];

    return result;
};



module.exports.filter = (array) => {
    const date = new Date().setHours(0, 0, 0, 0);
    const kingVip = filterStatus(array, 'King VIP');
    const justOpened = filterJustOpened(array, date);
    const timeTested = filterTimeTested(array, date);
    const thisWeek = filterThisWeek(array);
    const thisMonth = filterThisMonth(array);
    const startLater = filterStartsLater(array, date);
    const bonusStarted = filterBonusStarted(array, date);
    return { kingVip, justOpened, timeTested, thisWeek, thisMonth, startLater, bonusStarted };
}
