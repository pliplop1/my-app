import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

import kick from 'assets/sounds/Kick.wav';
import clap from 'assets/sounds/Clap.wav';
import cowbell from 'assets/sounds/Cowbell.wav';
import hithat from 'assets/sounds/HitHat.wav';

export default function useSounds() {
    const mySampler = useRef(null);

    const [isKickPlayed, isKickPlayedChange] = useState(false);
    const [isClapPlayed, isClapPlayedChange] = useState(false);
    const [isCowbellPlayed, isCowbellPlayedChange] = useState(false);
    const [isHithatPlayed, isHihatPlayedChange] = useState(false);

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
                isKickPlayedChange(true);
                window.setTimeout(() => isKickPlayedChange(false), 300);
                soundPlay('C4');
                break;
            case 'z':
                isClapPlayedChange(true);
                window.setTimeout(() => isClapPlayedChange(false), 300);
                soundPlay('D#4');
                break;
            case 'e':
                isCowbellPlayedChange(true);
                window.setTimeout(() => isCowbellPlayedChange(false), 300);
                soundPlay('f#4');
                break;
            case 'r':
                isHihatPlayedChange(true);
                window.setTimeout(() => isHihatPlayedChange(false), 300);
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

    function handleSampleChange(note, file) {
        let fileURL = URL.createObjectURL(file);
        let buffer = new Tone.Buffer(fileURL);
        mySampler.current.add(note, buffer, () =>
            alert('Sample successfully changed')
        );
    }

    const buttonsList = [
        {
            soundPlay: () => soundPlay('C4'),
            isPlayed: isKickPlayed,
            id: 'kick',
            handleSampleChange: (e) =>
                handleSampleChange('C4', e.target.files[0]),
        },
        {
            soundPlay: () => soundPlay('D#4'),
            isPlayed: isClapPlayed,
            id: 'clap',
            handleSampleChange: (e) =>
                handleSampleChange('D#4', e.target.files[0]),
        },
        {
            soundPlay: () => soundPlay('F#4'),
            isPlayed: isCowbellPlayed,
            id: 'cowbell',
            handleSampleChange: (e) =>
                handleSampleChange('F#4', e.target.files[0]),
        },
        {
            soundPlay: () => soundPlay('A4'),
            isPlayed: isHithatPlayed,
            id: 'Hithat',
            handleSampleChange: (e) =>
                handleSampleChange('A4', e.target.files[0]),
        },
    ];
    return { buttonsList };
}
