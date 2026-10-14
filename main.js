const STORAGE_KEY = 'notesArray';

/**
 * Persists notes in localStorage. Tolerates corrupt data and storage errors.
 */
class NoteStorage {
    /**
     * @param {string} key
     */
    constructor(key) {
        this._key = key;
    }

    /**
     * @returns {object[]}
     */
    load() {
        try {
            const notes = JSON.parse(localStorage.getItem(this._key));

            return Array.isArray(notes) ? notes : [];
        } catch (error) {
            return [];
        }
    }

    /**
     * @param {object[]} notes
     * @returns {boolean} whether the write succeeded
     */
    save(notes) {
        try {
            localStorage.setItem(this._key, JSON.stringify(notes));

            return true;
        } catch (error) {
            console.error('Could not save notes', error);

            return false;
        }
    }

    clear() {
        localStorage.removeItem(this._key);
    }
}

/**
 * Notes Class
 */
class Notes {
    /**
     * @param {NoteStorage} storage
     */
    constructor(storage) {
        this._storage = storage;
        this._form = document.getElementById('notes_form');
        this._noteTitle = document.getElementById('notes_title');
        this._noteMessage = document.getElementById('notes_textarea');
        this._notesList = document.getElementById('notes_list');
        this._reset = document.getElementById('notes_reset');

        this._init();
    }

    _init() {
        this._render(this._storage.load());

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            const note = {
                title: this._noteTitle.value,
                message: this._noteMessage.value,
            };

            event.target.reset();
            this._add(note);
        });

        this._reset.addEventListener('click', (event) => {
            event.preventDefault();

            this._storage.clear();
            this._render([]);
        });
    }

    /**
     * Re-reads storage first so other tabs' notes are not overwritten.
     * @param {object} note
     * @private
     */
    _add(note) {
        const notes = this._storage.load();
        notes.push(note);

        this._storage.save(notes);
        this._render(notes);
    }

    /**
     * Renders notes into the DOM list using text nodes (no HTML injection).
     * @param {object[]} notes
     * @private
     */
    _render(notes) {
        if (!notes.length) {
            this._notesList.replaceChildren(this._createRow(['No Notes']));

            return;
        }

        this._notesList.replaceChildren(
            ...notes.map(note => this._createRow([note.title, note.message]))
        );
    }

    /**
     * @param {string[]} cells
     * @returns {HTMLTableRowElement}
     * @private
     */
    _createRow(cells) {
        const row = document.createElement('tr');

        cells.forEach(text => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
        });

        return row;
    }
}

new Notes(new NoteStorage(STORAGE_KEY));
