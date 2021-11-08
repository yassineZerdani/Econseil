const download = (url) => {

    var FileName = url.split('/')[7];

    fetch(url, {
    method: 'GET',
    mode:'no-cors',

    })
    .then((response) => response.blob())
    .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
        new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
        'download',
         FileName ,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
    });
    };

export { download };