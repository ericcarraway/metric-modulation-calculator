(function () {
    'use strict';

    /**
     * object keys are consistent with element id selectors in the HTML
     *
     * <input id="quarter-note"
     * <input id="eighth-note"
     *
     * values are notes per beat - in other words, how many fit in a quarter-note
     *
     * NOTE_VALUES['eighth-note']
     * // returns 2
     *
     * NOTE_VALUES['sixteenth-note']
     * // returns 4
     *
     * NOTE_VALUES['half-note']
     * // returns 0.5
     *
     */
    var NOTE_VALUES = {

        'quarter-note': 1,

        // could also be expressed as 'eighth-note-2:3'
        'dotted-eighth-note': (function () {
            return 1 + (1 / 3); // 1.33333333
        }()),

        'quarter-note-triplet': 1.5,

        'eighth-note': 2,

        'eighth-note-quintuplet': 2.5,

        // could also be expressed as 'dotted-sixteenth-note'
        'eighth-note-4:3': (function () {
            return 2 + (2 / 3); // 2.66666666
        }()),

        'eighth-note-triplet': 3,

        'eighth-note-5:3': (function () {
            return 3 + (1 / 3); // 3.33333333
        }()),

        'sixteenth-note': 4,

        'sixteenth-note-quintuplet': 5,

        'sixteenth-note-triplet': 6
    };

    /**
     * this function runs whenever a number input changes
     *
     * calculate the new notesPerMinute using the beatsPerMinute and notesPerBeat
     * of the number input causing the change
     *
     * notesPerMinute = beatsPerMinute * notesPerBeat
     *
     * the new notesPerMinute is the same for every note value
     * use it to update the beatsPerMinute on each number input
     *
     * beatsPerMinute = notesPerMinute / notesPerBeat
     *
     */
    var updateFn = function (event) {
        var instigator = {
            noteValue: event.target.id,
            notesPerBeat: NOTE_VALUES[event.target.id],
            beatsPerMinute: event.target.value
        };

        var destination = {
            noteValue: null,
            notesPerBeat: null,
            beatsPerMinute: null
        };

        var notesPerMinute = instigator.beatsPerMinute * instigator.notesPerBeat;

        // update the beatsPerMinute for each number input
        var noteValue;
        for (noteValue in NOTE_VALUES) {
            // address properties attached to the NOTE_VALUES object itself, and not its prototypes
            if (NOTE_VALUES.hasOwnProperty(noteValue)) {
                // skip the number input causing the change
                if (noteValue !== instigator.noteValue) {
                    destination.noteValue = noteValue;
                    destination.notesPerBeat = NOTE_VALUES[noteValue];
                    destination.beatsPerMinute = notesPerMinute / destination.notesPerBeat;

                    // round to three decimal places
                    destination.beatsPerMinute = +destination.beatsPerMinute.toFixed(3);

                    document.getElementById(destination.noteValue).value = destination.beatsPerMinute;
                }
            }
        }
    };

    // attach the updateFn to each input element
    var elementId;
    for (elementId in NOTE_VALUES) {
        // address properties attached to the NOTE_VALUES object itself, and not its prototypes
        if (NOTE_VALUES.hasOwnProperty(elementId)) {
            document.getElementById(elementId).addEventListener('input', updateFn, false);
        }
    }
}());
