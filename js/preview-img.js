const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const registerPreviewInput = (fileChooser, preview, createImg = false) => {

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if( !matches ) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if( createImg ) {
        const newImg = preview.appendChild( document.createElement('img') );
        newImg.src = reader.result;
        newImg.classList.add('js-preview-img');
      } else {
        if( preview.src ) {
          preview.setAttribute('data-preview_src_origin', preview.src);
        }
        preview.src = reader.result;
        preview.classList.add('js-preview-img');
      }
    });

    reader.readAsDataURL(file);
  });
};

const registerPreviewInputMultiple = (fileChooser, box, previewSelector) => {

  fileChooser.addEventListener('change', () => {

    const files = [...fileChooser.files].filter((file) => FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it)) );

    if( !files ) {
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const preview = box.querySelector(previewSelector);
        const newPreview = preview.cloneNode();
        const newImg = preview.appendChild( document.createElement('img') );

        newImg.style.width = '100%';
        newImg.src = reader.result;

        preview.style.overflow = 'hidden';
        preview.classList.add('js-preview-img');

        box.appendChild(newPreview);
      });
      reader.readAsDataURL(file);
    });
  });
};

const deleteImages = (form) => {
  const images = form.querySelectorAll('.js-preview-img');

  if(!images) {
    return;
  }

  images.forEach((img) => {
    if( img.hasAttribute('data-preview_src_origin') ) {
      img.src = img.getAttribute('data-preview_src_origin');
      img.classList.remove('data-preview_src_origin');
    } else {
      img.remove();
    }

  });
};

const setDeleteOnSubmitAndReset = (form) => {
  form.addEventListener('submit', () => {
    deleteImages(form);
  });

  form.addEventListener('reset', () => {
    deleteImages(form);
  });
};

export {registerPreviewInput, registerPreviewInputMultiple, setDeleteOnSubmitAndReset};


