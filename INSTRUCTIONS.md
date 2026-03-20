# Instrucciones de instalación y ejecución

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js 18.x](https://nodejs.org/)
- [Angular CLI 16](https://angular.io/cli)

Para verificar las versiones instaladas:
```bash
node --version   # debe mostrar v18.x.x
ng version       # debe mostrar Angular CLI: 16.x.x
```

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/JoseIgnacio2020/ticket-manager.git
cd ticket-manager
```

### 2. Instalar Angular CLI 16 de forma global
```bash
npm install -g @angular/cli@16
```

### 3. Instalar las dependencias del proyecto
```bash
npm install
```

## Ejecución

### Modo desarrollo
```bash
ng serve
```

Abrir en el navegador:
```
http://localhost:4200
```

### Modo desarrollo en un puerto específico
```bash
ng serve --port 4201
```

## Funcionalidades

- Listado de tickets en tabla con Angular Material
- Filtro por estado (Todos, Pendiente, En proceso, Completado)
- Ordenamiento por columna al hacer click en el encabezado
- Cambio de estado por ticket desde la columna de acciones
- Estado de carga y manejo de errores

## Tecnologías utilizadas

- Angular 16
- Angular Material 16
- TypeScript
- RxJS
- SCSS