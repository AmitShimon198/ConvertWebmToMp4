import React, { useEffect, useState } from 'react'
const worker = new Worker(new URL("./ffmpegWebWorker.js", import.meta.url));
export function useConvertToMp4() {
    const [webmFile, setWebmFile] = useState(null);
    const [mp4File, setMp4File] = useState(null);
    const [converting, setConverting] = useState(false);
    useEffect(() => {
        worker.onmessage = (e) => {
            if (e.data instanceof File) {
                setMp4File(e.data)
            }
        }
    }, [])
    const setInitialFile = (webm) => {
        setConverting(false);
        setMp4File(null);
        setWebmFile(webm);
    }
    const convertWebmToMp4 = async () => {
        setConverting(true);
        worker.postMessage(webmFile);
        setMp4File(mp4File);
        setConverting(false);
    };
    return { convertWebmToMp4, setInitialFile, converting, webmFile, mp4File }
}
