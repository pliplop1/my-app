import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

import kick from 'assets/sounds/Kick.wav';
import clap from 'assets/sounds/Clap.wav';
import cowbell from 'assets/sounds/Cowbell.wav';
import hithat from 'assets/sounds/HitHat.wav';

export default function useSounds() {
    const mySampler = useRef(null);
    useEffect(() => {
        const sampler = new Tone.Sampler({
            C4: kick,
            'D#4': clap,
            'F#4': cowbell,
            A4: hithat,
        }).toDestination();

        Tone.loaded().then(() => {
            mySampler.current = sampler;
        });
    }, []);
    const buttonsList = [
        { soundPlay: () => mySampler.current.triggerAttackRelease(['C4'], 4) },
        { soundPlay: () => mySampler.current.triggerAttackRelease(['D#4'], 4) },
        { soundPlay: () => mySampler.current.triggerAttackRelease(['F#4'], 4) },
        { soundPlay: () => mySampler.current.triggerAttackRelease(['A4'], 4) },
    ];
    return { buttonsList };
}
