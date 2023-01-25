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

    function soundPlay(note) {
        mySampler.current.triggerAttackRelease([note], 4);
    }

    function handleKeyDown({ key }) {
        switch (key) {
            case 'a':
                soundPlay('C4');
                break;
            case 'z':
                soundPlay('D#4');
                break;
            case 'e':
                soundPlay('f#4');
                break;
            case 'r':
                soundPlay('A4');
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const buttonsList = [
        { soundPlay: () => soundPlay('C4') },
        { soundPlay: () => soundPlay('D#4') },
        { soundPlay: () => soundPlay('F#4') },
        { soundPlay: () => soundPlay('A4') },
    ];
    return { buttonsList };
}
