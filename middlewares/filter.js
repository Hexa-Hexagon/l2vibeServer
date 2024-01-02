const filterStatus = (array, status) => {
    const servers = array.filter(server => server.status === status);
    servers.sort((a, b) => {
        return a.dateOfStartingServer.setHours(0, 0, 0, 0) - b.dateOfStartingServer.setHours(0, 0, 0, 0);
    });
    return servers;
}

const filterJustOpened = (array) => {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 0);
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const justOpened = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate <= currentDate && serverDate >= yesterday &&
                server.status !== 'King VIP' &&
                !server.isAction;
        }
    );

    const result = {
        superVip: filterStatus(justOpened, 'Super VIP'),
        vip: filterStatus(justOpened, 'VIP'),
        premium: filterStatus(justOpened, 'Premium'),
        standart: filterStatus(justOpened, 'Standart')
    };

    return result;
}


const filterTimeTested = (array) => {
    const currentDate = new Date();
    const twoDaysAgo = new Date(currentDate);
    twoDaysAgo.setDate(currentDate.getDate() - 2);
    twoDaysAgo.setHours(23, 59, 59, 0);
    const fortyFiveDaysAgo = new Date(currentDate);
    fortyFiveDaysAgo.setDate(currentDate.getDate() - 45);
    fortyFiveDaysAgo.setHours(0, 0, 0, 0)
    const timeTested = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= fortyFiveDaysAgo && serverDate <= twoDaysAgo &&
                server.status !== 'King VIP' &&
                !server.isAction;
        }
    );

    const result = {
        superVip: filterStatus(timeTested, 'Super VIP'),
        vip: filterStatus(timeTested, 'VIP'),
        premium: filterStatus(timeTested, 'Premium'),
        standart: filterStatus(timeTested, 'Standart')
    };

    return result;
}


const filterThisWeek = (array) => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    endOfWeek.setHours(23, 59, 59, 0);
    const thisWeek = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= tomorrow && serverDate <= endOfWeek &&
                server.status !== 'King VIP';
        }
    );

    const result = {
        superVip: filterStatus(thisWeek, 'Super VIP'),
        vip: filterStatus(thisWeek, 'VIP'),
        premium: filterStatus(thisWeek, 'Premium'),
        standart: filterStatus(thisWeek, 'Standart')
    };

    return result;
}


const filterThisMonth = (array) => {
    const currentDate = new Date();
    const startOfNextWeek = new Date(currentDate);
    startOfNextWeek.setDate(currentDate.getDate() + (8 - currentDate.getDay())); // Начало следующей недели
    startOfNextWeek.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 0); // Конец месяца

    const filteredServers = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= startOfNextWeek && serverDate <= endOfMonth &&
                server.status !== 'King VIP';
        }
    );

    const result = {
        superVip: filterStatus(filteredServers, 'Super VIP'),
        vip: filterStatus(filteredServers, 'VIP'),
        premium: filterStatus(filteredServers, 'Premium'),
        standart: filterStatus(filteredServers, 'Standart')
    };

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

    const result = {
        superVip: filterStatus(startsLater, 'Super VIP'),
        vip: filterStatus(startsLater, 'VIP'),
        premium: filterStatus(startsLater, 'Premium'),
        standart: filterStatus(startsLater, 'Standart')
    };

    return result;
};


const filterBonusStarted = (array) => {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 0);
    const daysAgo = new Date(currentDate);
    daysAgo.setDate(currentDate.getDate() - 45);
    daysAgo.setHours(0, 0, 0, 0);
    const bonusStarted = array.filter(
        server => {
            const serverDate = new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0);
            return serverDate >= daysAgo && serverDate <= currentDate &&
                server.status !== 'King VIP' &&
                server.isAction;
        }
    );

    const result = {
        superVip: filterStatus(bonusStarted, 'Super VIP'),
        vip: filterStatus(bonusStarted, 'VIP'),
        premium: filterStatus(bonusStarted, 'Premium'),
        standart: filterStatus(bonusStarted, 'Standart')
    };

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
