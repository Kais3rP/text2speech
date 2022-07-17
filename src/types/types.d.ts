import { SpeechSynth } from '../lib/SpeechSynth';

/**
 * If you import a dependency which does not include its own type definitions,
 * TypeScript will try to find a definition for it by following the `typeRoots`
 * compiler option in tsconfig.json. For this project, we've configured it to
 * fall back to this folder if nothing is found in node_modules/@types.
 *
 * Often, you can install the DefinitelyTyped
 * (https://github.com/DefinitelyTyped/DefinitelyTyped) type definition for the
 * dependency in question. However, if no one has yet contributed definitions
 * for the package, you may want to declare your own. (If you're using the
 * `noImplicitAny` compiler options, you'll be required to declare it.)
 *
 * This is an example type definition which allows import from `module-name`,
 * e.g.:
 * ```ts
 * import something from 'module-name';
 * something();
 * ```
 */
declare module 'module-name' {
  const whatever: any;
  export = whatever;
}

declare global {
  type Params = ISettings & IEvents & IOptions;

  interface IEvents {
    onEnd?: (c: SpeechSynth, v?: any) => void;
    onStart?: (c: SpeechSynth, v?: any) => void;
    onPause?: (c: SpeechSynth, v?: any) => void;
    onResume?: (c: SpeechSynth, v?: any) => void;
    onReset?: (c: SpeechSynth, v?: any) => void;
    onBoundary?: (c: SpeechSynth, v?: any) => void;
    onTimeTick?: (c: SpeechSynth, v?: any) => void;
    onWordClick?: (c: SpeechSynth, v?: any) => void;
    onSeek?: (c: SpeechSynth, v?: any) => void;
  }

  interface IOptions {
    isHighlightTextOn?: boolean;
    isPreserveHighlighting?: boolean;
    isSSROn?: boolean;
  }

  interface ISettings {
    pitch: number;
    rate: number;
    language: string;
    voiceURI: string;
    volume: number;
  }

  interface IEvent {
    type: string;
    handler: ((c: SpeechSynth, v?: any) => void) | undefined;
  }

  type Events = IEvent[];

  interface IState {
    voice: SpeechSynthesisVoice;
    voices: SpeechSynthesisVoice[];
    /* Highlight & Reading time*/
    currentWordIndex: number;
    highlightedWords: Element[];
    lastWordPosition: number;
    numberOfWords: number;
    wholeText: string;
    wholeTextArray: string[];
    textRemaining: string;
    duration: number;
    elapsedTime: number;
    /* Controls  */
    isPaused: boolean;
    isPlaying: boolean;
  }

  type Interval = ReturnType<typeof setInterval>;
  type Timeout = ReturnType<typeof setTimeout>;

  interface IHighlightOptions {
    ssr?: boolean;
    excludeCodeTags?: boolean;
  }

  /* Extend Array prototype */

  interface Array<T> {
    __join__(fn: (el: any, i: number, arr: T[]) => string): string;
  }
}
