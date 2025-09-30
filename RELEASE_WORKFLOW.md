# 🚀 Manual Release Workflow

Este documento explica cómo manejar releases en este monorepo con control manual total.

## 📋 Flujo de Desarrollo

### 1. Desarrollo de Features/Fixes
```bash
# Hacer cambios en tu código
# Crear commits normalmente
git add .
git commit -m "feat: add new feature to core package"
```

### 2. Crear Changeset (IMPORTANTE)
Después de hacer cambios significativos que requieren nueva versión:

```bash
yarn changeset
```

Esto te preguntará:
- ✅ **¿Qué packages cambiaron?** → Selecciona los packages modificados
- ✅ **¿Qué tipo de cambio?** → major/minor/patch
- ✅ **Descripción del cambio** → Breve descripción para el changelog

### 3. Commit el Changeset
```bash
git add .
git commit -m "chore: add changeset for new feature"
git push
```

## 🎯 Proceso de Release

### 1. Preparar Versiones (Local)
Cuando estés listo para release:

```bash
# Ver qué packages tienen cambios pendientes
yarn changeset:status

# Actualizar versiones y generar changelogs
yarn changeset:version

# Commit los cambios de versión
git add .
git commit -m "chore: version packages"
git push
```

### 2. Crear Release en GitHub
1. Ve a tu repositorio en GitHub
2. Clic en "Releases" → "Create a new release"
3. Crea un tag (ej: `v1.0.3`)
4. Título: "Release v1.0.3"
5. Descripción: Lista los cambios principales
6. ✅ **Publish release**

### 3. GitHub Actions se encarga del resto
El workflow automáticamente:
- ✅ Instala dependencias
- ✅ Ejecuta tests
- ✅ Build de todos los packages
- ✅ Identifica qué packages cambiaron
- ✅ Publica SOLO los packages que tienen nuevas versiones

## 🔍 Comandos Útiles

```bash
# Ver status de changesets pendientes
yarn changeset:status

# Crear un nuevo changeset
yarn changeset

# Aplicar changesets y actualizar versiones
yarn changeset:version

# Ver qué packages se publicarían
yarn changeset status --verbose

# Build local para testing
yarn build

# Correr tests
yarn test
```

## 📦 Estructura de Packages

```
packages/
├── core/                 # boilerplate-api-core-library
└── [future-package]/     # boilerplate-api-core-library/[package-name]
```

## ✅ Ventajas de este Workflow

- **🎯 Control Total**: Tú decides cuándo publicar
- **📦 Selective Publishing**: Solo se publican packages que cambiaron
- **📝 Automatic Changelogs**: Generación automática de changelogs
- **🔄 Semantic Versioning**: Manejo correcto de versiones semánticas
- **🧪 Safe**: Tests y builds antes de publicar

## 🚨 Importante

- ❗ **Siempre crea changesets** para cambios que necesiten nueva versión
- ❗ **No olvides hacer push** de los changesets antes del release
- ❗ **Revisa el status** antes de crear el release en GitHub
