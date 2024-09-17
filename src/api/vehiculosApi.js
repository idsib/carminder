const BASE_URL = 'https://www.carqueryapi.com/api/0.3/';

const fetchJsonp = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    
    window[callbackName] = (data) => {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    script.src = `${url}&callback=${callbackName}`;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const getLogoUrls = (marca) => {
  const normalizedMarca = marca.toLowerCase().replace(/\s+/g, '');
  const capitalizedMarca = marca.charAt(0).toUpperCase() + marca.slice(1).toLowerCase();
  return [
    `https://logo.clearbit.com/${normalizedMarca}.com`,
    `https://logo.clearbit.com/${normalizedMarca}.es`,
    `https://www.carlogos.org/car-logos/${normalizedMarca}-logo.png`,
    `https://www.carlogos.org/logo/${normalizedMarca}-logo.png`,
    `https://cdn.imagin.studio/getimage?customer=carwow&make=${encodeURIComponent(capitalizedMarca)}&modelFamily=&width=260`,
    `https://www.car.info/img/make_logo/${normalizedMarca}.png`,
    `https://www.carlogos.org/logo/${normalizedMarca}-emblem.png`,
    `https://www.carlogos.org/car-logos/${normalizedMarca}-emblem.png`,
    `https://www.carlogos.org/logo/${normalizedMarca}-symbol.png`,
    `https://www.carlogos.org/car-logos/${normalizedMarca}-symbol.png`,
    `https://cdn.worldvectorlogo.com/logos/${normalizedMarca}.svg`,
    `https://1000logos.net/wp-content/uploads/${normalizedMarca}-logo.png`,
    `https://logos-world.net/wp-content/uploads/2020/06/${capitalizedMarca}-Logo.png`
  ];
};

export const getMarcas = async () => {
  try {
    const data = await fetchJsonp(`${BASE_URL}?cmd=getMakes`);
    
    if (!data.Makes || !Array.isArray(data.Makes)) {
      throw new Error('La respuesta de la API no tiene el formato esperado');
    }
    
    const marcasCoches = data.Makes.filter(marca => 
      marca.make_is_common === '1' && marca.make_country !== ''
    );
    
    return marcasCoches
      .sort((a, b) => a.make_display.localeCompare(b.make_display))
      .map(marca => ({
        make_id: marca.make_id,
        make_display: marca.make_display,
        make_logos: getLogoUrls(marca.make_display)
      }));
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    throw error;
  }
};

export const getModelos = async (marca) => {
  try {
    const data = await fetchJsonp(`${BASE_URL}?cmd=getModels&make=${encodeURIComponent(marca)}`);
    
    if (!data.Models || !Array.isArray(data.Models)) {
      throw new Error('La respuesta de la API no tiene el formato esperado');
    }
    
    return data.Models.map(modelo => ({
      model_name: modelo.model_name
    }));
  } catch (error) {
    console.error('Error al obtener los modelos:', error);
    throw error;
  }
};

export const guardarVehiculo = async (datosVehiculo) => {
  // Simulación de guardado de vehículo
  console.log('Guardando vehículo:', datosVehiculo);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Vehículo guardado con éxito' });
    }, 1000);
  });
};

export const getVehiculos = async () => {
  // Datos de ejemplo
  const vehiculosEjemplo = [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', año: 2020, kilometros: 30000, ultimoMantenimiento: '2023-01-15', proximoMantenimiento: '2023-07-15' },
    { id: 2, marca: 'Honda', modelo: 'Civic', año: 2019, kilometros: 45000, ultimoMantenimiento: '2022-11-20', proximoMantenimiento: '2023-05-20' },
    { id: 3, marca: 'Ford', modelo: 'Focus', año: 2021, kilometros: 15000, ultimoMantenimiento: '2023-03-10', proximoMantenimiento: '2023-09-10' },
  ];

  // Simula una llamada asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vehiculosEjemplo);
    }, 500);
  });
};
