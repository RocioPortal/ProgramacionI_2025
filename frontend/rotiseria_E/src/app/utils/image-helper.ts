// Ruta: src/app/utils/image-helper.ts

// Esta función recibe el nombre de un producto y devuelve la ruta de la imagen
export function getProductImage(name: string): string {
  if (!name) {
    return 'assets/menu/placeholder.png'; // Imagen por defecto
  }

  const normalizedName = name.toLowerCase();

  // Aquí replicamos la lógica de tus datos de prueba
  if (normalizedName.includes('ñoquis')) {
    return 'assets/menu/pastas/ñoquis.png';
  }
  if (normalizedName.includes('ravioles')) {
    return 'assets/menu/pastas/ravioles.png';
  }
  if (normalizedName.includes('hamburguesa')) {
    return 'assets/menu/entre_panes/hamburguesa.png';
  }
  if (normalizedName.includes('lomo')) {
    return 'assets/menu/entre_panes/lomo.png';
  }
  if (normalizedName.includes('lomopizza')) {
    return 'assets/menu/entre_panes/lomopizza.png';
  }
  if (normalizedName.includes('choripan mediano')) {
    return 'assets/menu/entre_panes/chori.png';
  }
  if (normalizedName.includes('pancho')) {
    return 'assets/menu/entre_panes/pancho.png';
  }
  if (normalizedName.includes('milanesa')) {
    return 'assets/menu/caserito/milanapo.png';
  }
  if (normalizedName.includes('pollo al horno')) {
    return 'assets/menu/caserito/logo.png';
  }
  if (normalizedName.includes('papas fritas')) {
    return 'assets/menu/caserito/papas.png';
  }
  if (normalizedName.includes('empanada de pollo')) {
    return 'assets/menu/empanadas/logo.png';
  }
  if (normalizedName.includes('empanadas de carne')) {
    return 'assets/menu/empanadas/decarne.png';
  }
  if (normalizedName.includes('lata')) {
    return 'assets/menu/bebidas/latagaseosa.png';
  }
  if (normalizedName.includes('gaseosa')) {
    return 'assets/menu/bebidas/gaseosa.png';
  }
  if (normalizedName.includes('agua con gas')) {
    return 'assets/menu/bebidas/aguacgas.png';
  } 
  if (normalizedName.includes('agua sin gas')) {
    return 'assets/menu/bebidas/aguasgas.png';
  }
  if (normalizedName.includes('agua saborizada')) {
    return 'assets/menu/bebidas/aguasaborizada.png';
  }
  if (normalizedName.includes('pizza con ananá')) {
    return 'assets/menu/pizzas/logo.png';
  }
  if (normalizedName.includes('pizza')) {
    return 'assets/menu/pizzas/pizza.jpg';
  }
  // Si no coincide nada, usa una imagen por defecto
  return 'assets/menu/placeholder.png';
}