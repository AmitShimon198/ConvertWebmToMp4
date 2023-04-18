import React from 'react';
import { useConvertToMp4 } from './useConvertToMp4';

function WebmToMp4Converter() {
    const { convertWebmToMp4, setInitialFile, converting, webmFile, mp4File } = useConvertToMp4()
    const handleWebmFileChange = (event) => {
        const webm = event.target.files[0];
        setInitialFile(webm)
    };
    return (
        <div>
            <input type="file" accept="video/webm" onChange={handleWebmFileChange} />
            <br />
            <button onClick={convertWebmToMp4} disabled={!webmFile || converting}>Convert</button>
            {mp4File && <a href={URL.createObjectURL(mp4File)} download={mp4File.name}>Download MP4 file</a>}
        </div>
    );
}

export default WebmToMp4Converter;

