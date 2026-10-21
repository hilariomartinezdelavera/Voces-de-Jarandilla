(() => {
  const musicPath = 'recursos/musica/';
  const imagePath = 'recursos/imagenes/';
  const audioWorks = {
    'canto-virgen': {
      audio: `${musicPath}Canto a la Virgen de Sopetrán de Jarandilla.mp3`,
      audioTitle: 'Canto a la Virgen de Sopetrán de Jarandilla',
      image: `${imagePath}virgen.png`,
      imageAlt: 'Representación artística de la Virgen',
      imageCaption: 'Virgen · Recreación artística',
      contextImage: `${imagePath}Ermita.png`,
      contextImageAlt: 'Representación artística de la ermita de Sopetrán',
      contextImageCaption: 'Ermita de Sopetrán · Recreación artística'
    },
    rogativa: {
      audio: `${musicPath}Canto al cristo de la Caridad.mp3`,
      audioTitle: 'Canto al Cristo de la Caridad',
      image: `${imagePath}cristo.png`,
      imageAlt: 'Representación artística del Cristo en la cruz',
      imageCaption: 'Cristo · Recreación artística',
      contextImage: `${imagePath}altar.png`,
      contextImageAlt: 'Representación artística de un altar religioso',
      contextImageCaption: 'Altar · Recreación artística'
    }
  };
  const recordings = [{
    id: 'romance-estripaterrones',
    title: 'Romance del estripaterrones verato',
    type: 'Romance musical',
    audio: `${musicPath}Romance  del Estripaterrones Verato.mp3`,
    audioTitle: 'Romance del Estripaterrones Verato',
    format: 'Versión MP3 · WAV original conservado localmente',
    attribution: 'Datos de procedencia, pendientes de documentación.',
    text: null
  }];
  const publications = [{
    title: 'Lazos de Historia y Poesía',
    image: `${imagePath}Lazos de historia y poesia.jpg`,
    width: 618,
    height: 865
  }, {
    title: 'La Jarandillana Fiesta de los Escobazos. Día 7 de diciembre',
    image: `${imagePath}La jarandillana Fiesta de las Escobas.png`,
    width: 1070,
    height: 1470
  }, {
    title: 'El Paraíso de Hilario',
    image: `${imagePath}portada_el_paraiso_de_hilario.jpg`,
    width: 887,
    height: 1262
  }];
  const imageCredit = 'Ilustración artística; no es una fotografía documental.';
  const cards = document.querySelector('#cards');
  const search = document.querySelector('#search');
  const empty = document.querySelector('#empty');
  const poetryList = document.querySelector('#poetry-list');
  const publicationList = document.querySelector('#publications-list');
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
  const relativeUrl = value => encodeURI(value);
  const mimeTypes = { mp3: 'audio/mpeg', mp4: 'audio/mp4', wav: 'audio/wav' };

  for (const work of obras) {
    if (work.id === 'rogativa') {
      work.titulo = 'El milagro de la lluvia, Rogativa a Santo Cristo de la Caridad de Jarandilla';
    }
    const media = audioWorks[work.id];
    if (media) Object.assign(work, media);
    work.mediaType = 'Canción tradicional';
  }

  function renderLyrics(text) {
    return text.split(/\n{2,}/).map(stanza =>
      `<p>${stanza.split('\n').map(escapeHtml).join('<br>')}</p>`
    ).join('');
  }

  function renderArtwork(src, alt, caption, className = 'work-art') {
    return `<figure class="${className}">
      <img src="${escapeHtml(relativeUrl(src))}" alt="${escapeHtml(alt)}" loading="lazy">
      <figcaption>${escapeHtml(caption)}<span>${imageCredit}</span></figcaption>
    </figure>`;
  }

  function renderPlayer(audio, title, format = '') {
    const extension = audio.split('.').pop().toLowerCase();
    const mime = mimeTypes[extension];
    const path = relativeUrl(audio);
    const notes = format ? `<span class="audio-format">${escapeHtml(format)}</span>` : '';
    return `<div class="recording">
      <span class="recording-label">Grabación original</span>
      <audio controls preload="none" aria-label="Escuchar ${escapeHtml(title)}">
        <source src="${escapeHtml(path)}"${mime ? ` type="${mime}"` : ''}>
        Tu navegador no puede reproducir este archivo de audio.
      </audio>
      ${notes}
      <a class="download-link" href="${escapeHtml(path)}" download>Descargar audio</a>
    </div>`;
  }

  function renderSong(work) {
    const title = work.titulo;
    const artwork = renderArtwork(work.image, work.imageAlt, work.imageCaption);
    const context = renderArtwork(work.contextImage, work.contextImageAlt, work.contextImageCaption, 'context-art');
    return `<article class="work song-work" id="${escapeHtml(work.id)}">
      <div class="song-visual">${artwork}${context}</div>
      <div class="work-body">
        <div class="work-type">Canción tradicional</div>
        <h3>${escapeHtml(title)}</h3>
        <p class="work-attribution">${escapeHtml(work.autor)}</p>
        <div class="lyrics song-lyrics" lang="es">${renderLyrics(work.texto)}</div>
        ${renderPlayer(work.audio, work.audioTitle)}
        <button class="copy-btn" type="button" data-copy="${escapeHtml(work.id)}">Copiar letra</button>
        <span class="copy-status" role="status" aria-live="polite"></span>
      </div>
    </article>`;
  }

  function renderRecording(recording) {
    return `<article class="work recording-work" id="${escapeHtml(recording.id)}">
      <div class="recording-heading">
        <div class="work-type">${escapeHtml(recording.type)}</div>
        <h3>${escapeHtml(recording.title)}</h3>
        <p>${escapeHtml(recording.attribution)}</p>
      </div>
      <div class="recording-detail">
        ${renderPlayer(recording.audio, recording.audioTitle, recording.format)}
        <p class="transcription-note">Transcripción pendiente</p>
      </div>
    </article>`;
  }

  function renderSongs() {
    const term = search.value.toLocaleLowerCase('es').trim();
    const filter = document.querySelector('.filter.active')?.dataset.filter || 'todos';
    const matchingWorks = obras.filter(work =>
      (filter === 'todos' || filter === 'cancion') &&
      [work.titulo, work.subtitulo, work.texto, work.autor].join(' ').toLocaleLowerCase('es').includes(term)
    );
    cards.innerHTML = matchingWorks.map(renderSong).join('');
    empty.hidden = matchingWorks.length > 0;
    empty.style.display = matchingWorks.length ? 'none' : 'block';
    bindCopyButtons(matchingWorks);
  }

  function bindCopyButtons(works) {
    cards.querySelectorAll('[data-copy]').forEach(button => {
      button.addEventListener('click', async () => {
        const work = works.find(item => item.id === button.dataset.copy);
        const status = button.nextElementSibling;
        const text = `${work.titulo}\n\n${work.texto}`;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
          } else {
            const field = document.createElement('textarea');
            field.value = text;
            field.setAttribute('readonly', '');
            field.style.position = 'fixed';
            field.style.opacity = '0';
            document.body.append(field);
            field.select();
            const copied = document.execCommand('copy');
            field.remove();
            if (!copied) throw new Error('El navegador no permitió copiar el texto.');
          }
          status.textContent = 'Letra copiada.';
          status.removeAttribute('data-error');
        } catch {
          status.textContent = 'No se pudo copiar. Selecciona y copia la letra manualmente.';
          status.dataset.error = 'true';
        }
      });
    });
  }

  function renderPoetry() {
    const foundRomance = recordings.filter(recording => recording.type === 'Romance musical');
    const missingPoems = `<p class="collection-pending">Poemas en proceso de incorporación; grabaciones aún no disponibles.</p>`;
    poetryList.innerHTML = `${foundRomance.map(renderRecording).join('')}${missingPoems}`;
  }

  function renderPublications() {
    publicationList.innerHTML = publications.map((publication, index) => `
      <article class="publication-entry" style="--cover-image:url('${escapeHtml(relativeUrl(publication.image))}')">
        <figure class="publication-cover">
          <img src="${escapeHtml(relativeUrl(publication.image))}" alt="Portada de ${escapeHtml(publication.title)}" width="${publication.width}" height="${publication.height}" loading="lazy">
        </figure>
        <div class="publication-details">
          <span class="publication-number">Libro ${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(publication.title)}</h3>
          <p class="publication-author">Hilario Martínez Morales</p>
        </div>
      </article>`).join('');
  }

  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', renderSongs));
  search.addEventListener('input', renderSongs);

  document.addEventListener('play', event => {
    if (event.target instanceof HTMLMediaElement && event.target.tagName === 'AUDIO') {
      document.querySelectorAll('audio').forEach(audio => {
        if (audio !== event.target) audio.pause();
      });
    }
  }, true);

  renderSongs();
  renderPoetry();
  renderPublications();
})();
