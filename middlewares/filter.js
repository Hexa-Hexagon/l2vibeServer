const filterStatus = (array, status) => {
    const servers = array.filter(server => server.status === status);
    servers.sort((a, b) => {
        return a.dateOfStartingServer.setHours(0, 0, 0, 0) - b.dateOfStartingServer.setHours(0, 0, 0, 0);
    });
    return servers;
}

module.exports.filter = (array) => {
    return { 
        kingVip: filterStatus(array, 'King VIP'), 
        superVip: filterStatus(array, 'Super VIP'),
        vip: filterStatus(array, 'VIP'),
        premium: filterStatus(array, 'Premium'),
        standart: filterStatus(array, 'Standart')
    };
};