export function audio(){
    let danceProgress;
    function audioHandler(stream) {
        const audioCtx = new AudioContext();
        const audioSourceNode = audioCtx.createMediaStreamSource(stream);

        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 256;
        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        audioSourceNode.connect(analyserNode);

        setInterval(() => {
            analyserNode.getFloatFrequencyData(dataArray);
            let progress;
            let mediana = 0;

            for (let i = 0; i < bufferLength; i++) {
                mediana += Math.abs(dataArray[i]);
            }
            danceProgress = ((mediana / bufferLength - 90) / 10) * 100;
            console.log(danceProgress);
            ingridients.forEach((ingridient) => {
                ingridient.move(danceProgress);
            });
        }, 100);
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(audioHandler);
}