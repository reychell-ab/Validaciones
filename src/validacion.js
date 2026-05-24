// ─── Lógica de validación del backend ────────────────────────────────────────

export function validarProducto(producto) {
  if (!producto.nombre || producto.nombre.trim() === "") {
    throw new Error("El nombre del producto es obligatorio");
  }

  if (!producto.categoria || producto.categoria.trim() === "") {
    throw new Error("La categoría del producto es obligatoria");
  }

  if (producto.precio <= 0) {
    throw new Error("El precio debe ser mayor que cero");
  }

  if (producto.existencia < 0) {
    throw new Error("La existencia no puede ser negativa");
  }

  return true;
}

export function registrarProducto(producto) {
  try {
    validarProducto(producto);

    return {
      ok: true,
      mensaje: "Producto registrado correctamente",
      datos: producto,
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message,
      datos: null,
    };
  }
}
