# Feature Specification: Sistema de Registro de Ingreso y Salida de Personal

**Feature Branch**: `001-registro-ingreso-salida`
**Created**: 2026-04-18
**Status**: Ready for Planning

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ingreso de Empleado y Autocompletado (Priority: P1)
Como empleado, quiero registrar mi entrada escaneando o tecleando mi número de documento para certificar la hora a la que empiezo mis turnos o ingresos de manera clara y automatizada.

**Why this priority**: Es la funcionalidad principal y bloqueadora de todo el flujo. Sin un registro válido, no hay trazabilidad en la compañía.
**Independent Test**: Se prueba ingresando un documento válido contra un ambiente de pruebas; el sistema debe retornar el nombre, apellidos, la hora actual en formato (DD/MM/AAAA HH:MM) y habilitar la continuación del formulario.

**Acceptance Scenarios**:
1. **Given** un empleado con documento existente en BD, **When** ingresa el documento en la pantalla de inicio, **Then** el sistema autocompleta su nombre y muestra fecha/hora de registro.
2. **Given** un empleado con documento no asignado, **When** intenta ingresar, **Then** el sistema bloquea la acción arrojando un mensaje de error explícito de "Operación Inválida".

---

### User Story 2 - Control de Ingreso de Equipo Portátil (Priority: P1)
Como encargado de seguridad, quiero llevar control sobre si el empleado trae un computador, capturando la marca, el serial y la persona que autorizó la entrada de esta herramienta a la oficina.

**Why this priority**: Necesario por política de seguridad de la empresa de protección contra robo.
**Independent Test**: Usar el toggle/radio button "¿Ingresó computador?" y observar reactividad de las interfaces, verificando validadores de formulario.

**Acceptance Scenarios**:
1. **Given** que el usuario selecciona "Sí" en la pregunta de computador, **When** intenta enviar el ingreso, **Then** el formulario le hace requeridos los campos de Marca, Serial y Persona que Autoriza, y bloquea si están vacíos.
2. **Given** que el usuario selecciona "No" en llevar equipo, **When** avanza en la vista, **Then** dichos campos no aparecen ni se validan, y puede persistir la entrada exitosamente.

---

### User Story 3 - Salida de Personal y Retiro de Equipos (Priority: P1)
Como empleado que termina jornada, quiero poder checar mi salida pasando mi documento, validando rápidamente a un conciliador en caso de que me lleve equipo que ingresé anteriormente.

**Why this priority**: Cierra el ciclo de la transacción para cuadrar Excel del día.
**Independent Test**: Se ejecuta un registro de ingreso y posteriormente una validación de salida leyendo la coherencia de datos registrados de ese día.

**Acceptance Scenarios**:
1. **Given** un registro de ingreso durante el día detallando ingreso de laptop, **When** escanea el documento para salir, **Then** el formulario exige "¿Retira el equipo?" obligando nombre de verificador en caso afirmativo.
2. **Given** una hora de salida anterior o inconsistente a la de la BD por errores de sistema, **When** intenta procesar la salida de todas formas, **Then** lanza alerta de comprobación temporal de doble requerimiento de guardado.

---

### User Story 4 - Panel Administrativo y de Exportación (Priority: P2)
Como Administrador, requiero bajar los reportes de asistencias y control en Excel estructurándolos de acuerdo a los campos normados internamente para reportes finales.

**Why this priority**: Funcionalidad exigida únicamente por la gerencia para auditorías operativas, siendo la consumación de los datos.
**Independent Test**: Generar un archivo xlsx tras 5 registros simulados en BD y constatar el layout.

**Acceptance Scenarios**:
1. **Given** registros poblados en BD en el día, **When** se demanda el export, **Then** el output se otorga en extensión .xlsx con una fila dedicada al empleado e incorporando sus timestamps.

### Edge Cases

- What happens when la base de datos previa de recursos humanos y IDs sufre caídas?
- How does system handle cuando un usuario que metió laptop nunca hace el log-out salida durante el final del día? (Los reportes deben conciliar si quedaron equipos trasnochando).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST conectarse a una BD "single-source-of-truth" para resolver nombres y apellidos usando el número de cédula (identidad).
- **FR-002**: El formulario de entrada MUST retener lógicamente el valor de "¿Ingresó equipo?" con despliegue condicional de inputs para (Marca, Serial, y Autorizador).
- **FR-003**: El registro general en Base de Datos MUST acoplar la entrada y salida de un mismo individuo y día en la misma tupla o estructura consolidada.
- **FR-004**: Durante el paso de "salida", el sistema MUST consultar transacciones abiertas en el día; si portaba computador pide a un Verificador obligatoriamente en caso de marcar que retira equipo.
- **FR-005**: El sistema MUST bloquear completamente envíos a la BD (`submit`) cuando se carezcan de información de inputs declarados obligatorios según el árbol condicional de la UI.
- **FR-006**: La exportación en documento de formato MS Excel (`.xlsx`) MUST compilar el histórico estricto conservando las columnas definidas formalmente.

### Key Entities

- **Empleado**: (Clave Primaria: Documento, NombreCompleto, Apellidos).
- **RegistroAsistencia**: (Llave foránea Documento, Fecha, TimestampIngreso, TieneComputador, MarcaComputador, SerialComputador, PersonaAutoriza, TimestampSalida, SacaEqupo, PersonaQueVerificaSalida).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Las identificaciones de IDs fallan 0% en consistencia con lo registrado en la BD Maestra; evitando registros fantasmas.
- **SC-002**: Se consolida un Excel donde no figuran filas en blanco o huecos para seriales o marcas si indicó afirmativamente portar computadoras. (Tasa de validación efectiva del 100% de forms).
- **SC-003**: El flujo operativo visual en las interfaces de portería/front-desk debe resolverse con bajo tiempo cognitivo.

## Assumptions

- Se asumió que esta feature no requiere arquitectura de alto procesamiento ni colas escalables dado un volumen bajo/medio.
- La ejecución del front-end será constante usando computadoras desktop dedicadas (recepciones), sin intermitencia alta de red.
