import test from 'ava';
import browserEnv from 'browser-env';

import { SpeechSynth } from './SpeechSynth';

/* Add DOM main methods and props to global */
browserEnv();
/* Mock SpeechSynthesis */
window.SpeechSynthesisUtterance = class SpeechSynthesisUtterance {
  lang;
  onboundary;
  onend;
  onstart;
  onerror;
  onmark;
  onpause;
  onresume;
  pitch;
  rate;
  text;
  voice;
  volume;
  addEventListener;
  removeEventListener;
  dispatchEvent;
};

window.speechSynthesis = {
  getVoices: () => [
    {
      lang: 'en-uS',
      voiceURI: '',
      name: '',
      default: true,
      localService: true,
    },
  ],
  onvoiceschanged: () => null,
  cancel: () => null,
  pause: () => null,
  resume: () => null,
  speak: () => null,
  addEventListener: () => null,
  removeEventListener: () => null,
  dispatchEvent: () => null,
  paused: true,
  pending: false,
  speaking: false,
};

/* test.beforeEach(() => {}); */

/* test.after.always(() => {}); */

test('Is Class correctly initialized', async (t) => {
  const textContainer = document.createElement('div');

  const s = new SpeechSynth(textContainer as HTMLElement, {
    isSSROn: false,
  });

  const r = await s.init();
  t.true(r instanceof SpeechSynth && r === s);
});

test('Are HTML Highlight tags correctly added clientside - [case:] simple <p> tags text', async (t) => {
  const textContainer = document.createElement('div');

  const body = `<p>Some text inside a paragraph</p>`;

  textContainer.innerHTML = body;

  const highlighted = `<p> <span data-id="1">Some</span> <span data-id="2">text</span> <span data-id="3">inside</span> <span data-id="4">a</span> <span data-id="5">paragraph</span> </p> `;
  const s = new SpeechSynth(textContainer as HTMLElement, {
    isSSROn: false,
  });

  await s.init();

  t.deepEqual(textContainer.innerHTML, highlighted);
});

test('Are HTML Highlight tags correctly added serverside - [case:] simple <p> tags text', async (t) => {
  const body = `<p>Some text inside a paragraph</p>`;

  const highlighted = `<p> <span data-id="1">Some</span> <span data-id="2">text</span> <span data-id="3">inside</span> <span data-id="4">a</span> <span data-id="5">paragraph</span> </p> `;
  const _highlighted = SpeechSynth.addHTMLHighlightTags(body);

  t.deepEqual(_highlighted, highlighted);
});

test('Are HTML Highlight tags correctly added serverside - [case:] nested <u> and <em> tags text', async (t) => {
  const body = `<p>Some <u>nested</u> <em>text</em> inside a paragraph</p>`;

  const highlighted = `<p> <span data-id="1">Some</span> <u> <span data-id="2">nested</span> </u> <em> <span data-id="3">text</span> </em> <span data-id="4">inside</span> <span data-id="5">a</span> <span data-id="6">paragraph</span> </p> `;
  const _highlighted = SpeechSynth.addHTMLHighlightTags(body);

  t.deepEqual(_highlighted, highlighted);
});
