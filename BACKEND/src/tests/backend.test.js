const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "inseguro";

// Funciones del sistema
function validarComplejidadPassword(password) {
  // Supongamos que la regla exige al menos un símbolo especial, pero evaluamos una clave simple
  const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return tieneSimbolo; // Retornará false para una clave débil
}

function calcularDiasRestantes(fechaInicio, fechaFin) {
  const date1 = new Date(fechaInicio);
  const date2 = new Date(fechaFin);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
}

// Suite de Pruebas
describe('Pruebas Automatizadas - Auditoría de Calidad (Fallas Detectadas)', () => {

  test('CP-SEC-01: Validación exitosa de Token JWT', () => {
    const token = jwt.sign({ empresaId: 1 }, JWT_SECRET, { expiresIn: '1h' });
    const decoded = jwt.verify(token, JWT_SECRET);
    expect(decoded.empresaId).toBe(1);
  });

  test('CP-MET-01: Cálculo de días de contrato', () => {
    const dias = calcularDiasRestantes('2026-01-01', '2026-01-11');
    expect(dias).toBe(10);
  });


  test('CP-SEC-FAIL-02: [FALLO DETECTADO] Validar que una contraseña débil sea rechazada por seguridad', () => {
    const passwordDebil = "12345678"; // Clave sin símbolos especiales
    const esSegura = validarComplejidadPassword(passwordDebil); 

    // FORZAMOS EL ERROR: Esperamos que sea 'true' (segura), pero la función devolverá 'false'
    expect(esSegura).toBe(true); 
  });

});