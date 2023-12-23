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
        server.status !== 'King Vip' &&
        !server.isAction
    );
    const result = {
        superVip: filterStatus(justOpened, 'Super Vip'),
        vip: filterStatus(justOpened, 'Vip'),
        premium: filterStatus(justOpened, 'Premium'),
        standart: filterStatus(justOpened, 'Standart')
    };
    return result;
}

const filterTimeTested = (array, date) => {
    daysAgo = date - new Date().getDate() - 45;
    const timeTested = array.filter(
        server => new Date(server.dateOfStartingServer).setHours(0, 0, 0, 0) < daysAgo &&
        server.status !== 'King Vip' &&
        !server.isAction
    );
    const result = {
        superVip: filterStatus(timeTested, 'Super Vip'),
        vip: filterStatus(timeTested, 'Vip'),
        premium: filterStatus(timeTested, 'Premium'),
        standart: filterStatus(timeTested, 'Standart')
    };
    return result;
}

const filterThisWeek = (array) => {
    const daysInWeek = new Date().setDate(new Date().getDate() + (7 - new Date().getDate()));
    const thisWeek = array.filter(
        server => server.dateOfStartingServer < daysInWeek &&
        server.status !== 'King Vip'
    );
    const result = {
        superVip: filterStatus(thisWeek, 'Super Vip'),
        vip: filterStatus(thisWeek, 'Vip'),
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
        server.status !== 'King Vip'
    );
    const result = {
        superVip: filterStatus(thisMonth, 'Super Vip'),
        vip: filterStatus(thisMonth, 'Vip'),
        premium: filterStatus(thisMonth, 'Premium'),
        standart: filterStatus(thisMonth, 'Standart')
    };
    return result;
}

const filterStartsLater = (array, date) => {
    const startsLater = array.filter(
        server => server.dateOfStartingServer.setHours(0, 0, 0, 0) > date &&
        server.status !== 'King Vip'
    );
    const result = {
        superVip: filterStatus(startsLater, 'Super Vip'),
        vip: filterStatus(startsLater, 'Vip'),
        premium: filterStatus(startsLater, 'Premium'),
        standart: filterStatus(startsLater, 'Standart')
    };
    return result;
}

const filterBonusStarted = (array, date) => {

    const bonusStarted = array.filter(
        server => server.dateOfStartingServer.setHours(0, 0, 0, 0) < date &&
        server.status !== 'King Vip' &&
        server.isAction
    );
    const result = {
        superVip: filterStatus(bonusStarted, 'Super Vip'),
        vip: filterStatus(bonusStarted, 'Vip'),
        premium: filterStatus(bonusStarted, 'Premium'),
        standart: filterStatus(bonusStarted, 'Standart')
    };
    return result;
}


module.exports.filter = (array) => {
    const date = new Date().setHours(0, 0, 0, 0);
    const kingVip = filterStatus(array, 'King Vip');
    const justOpened = filterJustOpened(array, date);
    const timeTested = filterTimeTested(array, date);
    const thisWeek = filterThisWeek(array);
    const thisMonth = filterThisMonth(array);
    const startLater = filterStartsLater(array, date);
    const bonusStarted = filterBonusStarted(array, date);
    return { kingVip, justOpened, timeTested, thisWeek, thisMonth, startLater, bonusStarted };
};