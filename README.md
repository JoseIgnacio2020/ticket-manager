# ¿Qué estructura utilizaste y por qué?

Utilicé una arquitectura modular con un módulo de funcionalidad dedicado (TicketsModule) separado del módulo raíz, organizado internamente por responsabilidades: componentes para la vista, servicios para la lógica de negocio, modelos para el tipado y datos para el mock. El módulo se carga con lazy loading para no impactar el tiempo de inicio de la aplicación. El flujo de datos es unidireccional, centralizado en el servicio mediante BehaviorSubject, de modo que el componente solo se suscribe y reacciona a los cambios sin manejar estado propio.

# ¿Cómo escalarías esta solución?

La solución está diseñada para escalar en varias dimensiones. El servicio actúa como capa de abstracción de datos, por lo que conectar un backend real solo requiere reemplazar el of(mock) por una llamada HTTP sin modificar el componente. A nivel de UI, el componente principal puede dividirse en componentes más pequeños a medida que crezca la funcionalidad. Para manejar estado compartido entre módulos, el siguiente paso sería adoptar NgRx. Y para grandes volúmenes de datos, se agregaría paginación server-side con MatPaginator.

# ¿Qué mejorarías con más tiempo?

Con más tiempo agregaría paginación server-side usando MatPaginator para manejar grandes volúmenes de registros sin cargar todo en memoria. También incorporaría un campo de búsqueda por nombre usando el operador debounceTime de RxJS para no filtrar en cada tecla sino esperar que el usuario termine de escribir. Adicionalmente, implementaría una vista de creación de tickets con un formulario reactivo usando FormGroup y Validators, con validaciones por campo y mensajes de error claros. Al guardar exitosamente, redireccionaría automáticamente al listado usando el Router de Angular.

# Describe un problema que enfrentaste

Al no trabajar con Angular hace varios años, el mayor desafío fue retomar los conceptos de RxJS, particularmente entender cómo encadenar operadores como startWith, switchMap y takeUntil. Lo resolví revisando documentación y ejemplos, y una vez que comprendí que cada operador transforma o controla el flujo del Observable de una forma específica, pude entender por qué se usaba cada uno en este contexto. Por ejemplo, takeUntil con el Subject de destrucción del componente fue el que más me costó al principio, pero entendí que es el patrón estándar para evitar memory leaks cuando el componente se destruye.