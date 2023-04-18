
/* eslint-disable no-restricted-globals */
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
self.onmessage = async (e) => {
    if (e.data instanceof File) {
        const ffmpeg = createFFmpeg({
            log: false,
            progress: (option) => {
                console.log(option);
            }
        });
        await ffmpeg.load();
        const outputName = `output_${new Date().getTime()}.mp4`
        ffmpeg.FS('writeFile', 'input.webm', await fetchFile(e.data));
        await ffmpeg.run('-i', 'input.webm', outputName);
        const mp4FileData = ffmpeg.FS('readFile', outputName);
        const mp4File = new File([mp4FileData.buffer], outputName, { type: 'video/mp4' });
        self.postMessage(mp4File);
    }
};

export { };