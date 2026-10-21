# Voces de Jarandilla

Archivo cultural digital dedicado a la obra de **Hilario Martínez Morales**, poeta, músico y cronista de Jarandilla de la Vera (Cáceres).

«Voces de Jarandilla» reúne canciones, poemas y romances, publicaciones y materiales audiovisuales vinculados a la memoria cultural de Jarandilla de la Vera. Es una web estática hecha con HTML, CSS y JavaScript, sin instalación de dependencias ni proceso de compilación.

## Contenidos

- **Canciones y poemas:** letras, grabaciones MP3 y notas sobre materiales pendientes de verificación.
- **Publicaciones:** referencias e imágenes de portadas de libros.
- **Archivo audiovisual:** vídeo enlazado e incrustado desde YouTube.
- **Memoria cultural:** ilustraciones y materiales relacionados con Jarandilla de la Vera.

Las ilustraciones se identifican como recreaciones artísticas cuando corresponde; no deben interpretarse como fotografías documentales.

## Uso local

Abre `index.html` en un navegador moderno o inicia un servidor local desde esta carpeta:

```bash
python -m http.server 8000
```

Visita `http://localhost:8000`. No se necesitan paquetes. Para publicar la web en GitHub Pages, conserva `index.html` en la raíz y las rutas relativas de imágenes, estilos, scripts y audios.

## Publicación en GitHub Pages

Después de subir el proyecto, en la configuración del repositorio selecciona **Settings → Pages → Build and deployment → Deploy from a branch**, elige la rama `main` y la carpeta `/(root)`, y guarda los cambios.

## Audio y recursos locales

La web utiliza los MP3 de `recursos/musica/`. El archivo WAV del romance se conserva como original local, pero se excluye del repositorio para evitar subir un archivo de 92 MB. Las capturas de trabajo y las imágenes de referencia que no usa la web también se excluyen.

## Derechos de los contenidos

Este repositorio no incluye una licencia general de reutilización. Que el código y los archivos sean visibles en GitHub no concede permiso para reproducir, adaptar o redistribuir poemas, letras, grabaciones, fotografías, ilustraciones, portadas ni otros contenidos. Sus derechos corresponden a sus respectivos titulares; cualquier reutilización requiere la autorización que proceda. Los permisos de publicación y los datos pendientes de verificación se documentan en [`LEEME.md`](LEEME.md).
