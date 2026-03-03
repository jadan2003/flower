onload = () => {
        document.body.classList.remove("container");

        const audio = document.getElementById("bg-song");
        if (!audio) {
                return;
        }

        const sourceCandidates = [
                "https://raw.githubusercontent.com/jadan2003/sound/main/song.aac"
        ];

        let currentSourceIndex = 0;
        let loopStart = 18;
        let loopEnd = 32;

        const attemptPlay = () => {
                audio.currentTime = Math.max(0, Math.min(loopStart, Number.isFinite(audio.duration) ? audio.duration : loopStart));
                return audio.play();
        };

        const tryNextSource = () => {
                if (currentSourceIndex >= sourceCandidates.length - 1) {
                        return;
                }

                currentSourceIndex += 1;
                audio.src = sourceCandidates[currentSourceIndex];
                audio.load();
        };

        audio.addEventListener("loadedmetadata", () => {
                if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
                        return;
                }

                loopStart = Math.min(loopStart, Math.max(0, audio.duration - 1));
                loopEnd = Math.min(loopEnd, Math.max(loopStart + 0.5, audio.duration - 0.1));
                audio.currentTime = loopStart;
        });

        audio.addEventListener("canplay", () => {
                attemptPlay().catch(() => {});
        });

        audio.addEventListener("timeupdate", () => {
                if (audio.currentTime >= loopEnd) {
                        audio.currentTime = loopStart;
                        audio.play().catch(() => {});
                }
        });

        audio.addEventListener("error", tryNextSource);

        audio.src = sourceCandidates[currentSourceIndex];
        audio.load();

        attemptPlay().catch(() => {});

        document.addEventListener("click", () => {
                attemptPlay().catch(() => {});
        }, { once: true });
        document.addEventListener("touchstart", () => {
                attemptPlay().catch(() => {});
        }, { once: true });
        document.addEventListener("keydown", () => {
                attemptPlay().catch(() => {});
        }, { once: true });
};
