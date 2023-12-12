async function getTotalVehicles() {
    try {
        const response = await got.get('https://my-webservice.moveecar.com/vehicles/total');
        return response.body; 
    } catch (error) {
        console.error('Error al obtener el total de vehículos:', error);
        return 0; 
    }
}

async function getPlurial() {
    const total = await getTotalVehicles();

    if (total <= 0) {
        return 'none';
    }
    if (total <= 10) {
        return 'few';
    }
    return 'many';
}
