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
      } else {
        preview.src = reader.result;
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

        box.appendChild(newPreview);
        preview.addEventListener('click', () => {
          preview.remove();
        });
      });
      reader.readAsDataURL(file);
    });
  });
};

export {registerPreviewInput, registerPreviewInputMultiple};


