Reveal.addEventListener('slidechanged', function(event) {
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  if (event.currentSlide.querySelector('.fragment')) {
    document.body.classList.add('has-fragments');
  } else {
    document.body.classList.remove('has-fragments');
  }
});
Reveal.addEventListener('ready', function onReady(event) {
  Reveal.triggerKey(27); // ESCAPE_KEYCODE
});
Reveal.initialize({
  // Display controls in the bottom right corner
  controls: true,
  // Display a presentation progress bar
  progress: true,
  // Set default timing of 2 minutes per slide
  defaultTiming: 120,
  // Display the page number of the current slide
  slideNumber: true,
  // Push each slide change to the browser history
  history: true,
  // Enable keyboard shortcuts for navigation
  keyboard: true,
  // Enable the slide overview mode
  overview: true,
  // Vertical centering of slides
  center: true,
  // Enables touch navigation on devices with touch input
  touch: true,
  // Loop the presentation
  loop: false,
  // Change the presentation direction to be RTL
  rtl: false,
  // Randomizes the order of slides each time the presentation loads
  shuffle: false,
  // Turns fragments on and off globally
  fragments: true,
  // Flags if the presentation is running in an embedded mode,
  // i.e. contained within a limited portion of the screen
  embedded: false,
  // Flags if we should show a help overlay when the questionmark
  // key is pressed
  help: true,
  // Flags if speaker notes should be visible to all viewers
  showNotes: true,
  // Global override for autolaying embedded media (video/audio/iframe)
  // - null: Media will only autoplay if data-autoplay is present
  // - true: All media will autoplay, regardless of individual setting
  // - false: No media will autoplay, regardless of individual setting
  autoPlayMedia: null,
  // Number of milliseconds between automatically proceeding to the
  // next slide, disabled when set to 0, this value can be overwritten
  // by using a data-autoslide attribute on your slides
  autoSlide: 0,
  // Stop auto-sliding after user input
  autoSlideStoppable: true,
  // Use this method for navigation when auto-sliding
  autoSlideMethod: Reveal.navigateNext,
  // Enable slide navigation via mouse wheel
  mouseWheel: false,
  // Hides the address bar on mobile devices
  hideAddressBar: true,
  // Opens links in an iframe preview overlay
  previewLinks: true,
  // Transition style
  transition: 'slide', // none/fade/slide/convex/concave/zoom
  // Transition speed
  transitionSpeed: 'default', // default/fast/slow
  // Transition style for full page slide backgrounds
  backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
  // Number of slides away from the current that are visible
  viewDistance: 3,
  // Parallax background image
  parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"
  // Parallax background size
  parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"
  // Number of pixels to move the parallax background per slide
  // - Calculated automatically unless specified
  // - Set to 0 to disable movement along an axis
  parallaxBackgroundHorizontal: null,
  parallaxBackgroundVertical: null,
  // The display mode that will be used to show slides
  display: 'block',
  dependencies: [
    // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.5.0/lib/js/classList.js',
      condition: function() {
        return !document.body.classList;
      },
    },
    // Interpret Markdown in <section> elements
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.5.0/plugin/markdown/marked.js',
      condition: function() {
        return !!document.querySelector('[data-markdown]');
      },
    },
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.5.0/plugin/markdown/markdown.js',
      condition: function() {
        return !!document.querySelector('[data-markdown]');
      },
    },
    // Syntax highlight for <code> elements
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.5.0/plugin/highlight/highlight.js',
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad();
      },
    },
    // Zoom in and out with Alt+click
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.5.0/plugin/zoom-js/zoom.js',
      async: true,
    },
    // Speaker notes
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.5.0/plugin/notes/notes.js',
      async: true,
    },
    // MathJax
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.5.0/plugin/math/math.js',
      async: true,
    },
    {
      src:
        'https://rawgit.com/mikemiles86/reveal-line-numbers/master/line-numbers.js',
    },
  ],
});
Reveal.configure({
  slideNumber: 'c/t',
});
