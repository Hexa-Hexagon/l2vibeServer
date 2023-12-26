const filterStatus = (array, status) => {
    const servers = array.filter(server => server.status === status);
    servers.sort((a, b) => {
        return a.dateOfStartingServer.setHours(0, 0, 0, 0) - b.dateOfStartingServer.setHours(0, 0, 0, 0);
    });
    return servers;
}

const filterJustOpened = (array, date) => {
    const justOpened = array.filter(
        server => new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0) < date &&
        server.status !== 'King VIP' &&
        !server.isAction
    );
    const result = {
        superVip: filterStatus(justOpened, 'Super VIP'),
        vip: filterStatus(justOpened, 'VIP'),
        premium: filterStatus(justOpened, 'Premium'),
        standart: filterStatus(justOpened, 'Standart')
    };
    return result;
}

const filterTimeTested = (array, date) => {
    daysAgo = date - new Date().getDate() - 45;
    const timeTested = array.filter(
        server => new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0) < daysAgo &&
        server.status !== 'King VIP' &&
        !server.isAction
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
    const daysInWeek = new Date().setDate(new Date().getDate() + (7 - new Date().getDate()));
    const thisWeek = array.filter(
        server => server.dateOfStartingServer < daysInWeek &&
        server.status !== 'King VIP'
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
    const daysInMonth = new Date().setDate(
        new Date().getDate() + new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate() - new Date().getDate()
    );
    const thisMonth = array.filter(
        server => server.dateOfStartingServer.setHours(0, 0, 0, 0) < daysInMonth &&
        server.status !== 'King VIP'
    );
    const result = {
        superVip: filterStatus(thisMonth, 'Super VIP'),
        vip: filterStatus(thisMonth, 'VIP'),
        premium: filterStatus(thisMonth, 'Premium'),
        standart: filterStatus(thisMonth, 'Standart')
    };
    return result;
}

const filterStartsLater = (array, date) => {
    const startsLater = array.filter(
        server => server.dateOfStartingServer.setHours(0, 0, 0, 0) > date &&
        server.status !== 'King VIP'
    );
    const result = {
        superVip: filterStatus(startsLater, 'Super VIP'),
        vip: filterStatus(startsLater, 'VIP'),
        premium: filterStatus(startsLater, 'Premium'),
        standart: filterStatus(startsLater, 'Standart')
    };
    return result;
}

const filterBonusStarted = (array, date) => {

    const bonusStarted = array.filter(
        server => server.dateOfStartingServer.setHours(0, 0, 0, 0) < date &&
        server.status !== 'King VIP' &&
        server.isAction
    );
    const result = {
        superVip: filterStatus(bonusStarted, 'Super VIP'),
        vip: filterStatus(bonusStarted, 'VIP'),
        premium: filterStatus(bonusStarted, 'Premium'),
        standart: filterStatus(bonusStarted, 'Standart')
    };
    return result;
}


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
};