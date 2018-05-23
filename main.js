const STORAGE_KEY = 'notesArray';

/**
 * Notes Class
 */
class Notes {
    constructor() {
        this._form = document.getElementById('notes_form');
        this._noteTitle = document.getElementById('notes_title');
        this._noteMessage = document.getElementById('notes_textarea');
        this._submit = document.getElementById('notes_submit');
        this._notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        this._notesList = document.getElementById('notes_list');
        this._reset = document.getElementById('notes_reset');

        this._init();
    }

    _init() {
        this._updateList();

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            const note = {
                title: this._noteTitle.value,
                message: this._noteMessage.value,
            };

            event.target.reset();
            this._addToList(note);
        })

        this._reset.addEventListener('click', (event) => {
            event.preventDefault();

            localStorage.removeItem(STORAGE_KEY);
            this._notes = [];

            this._resetNotesList();
        })
    }

    /**
     *
     * @param {object} note
     * @private
     */
    _addToList(note) {
        this._addNoteToLocalStorage(note);
        this._updateList();
    }

    /**
     * Add Note to LocalStorage
     * @param {object} note
     * @private
     */
    _addNoteToLocalStorage(note) {
        this._notes.push(note);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._notes));
    }

    /**
     * Updates DOM Notes List
     * @private
     */
    _updateList() {
        if (this._notes.length) {
            this._resetNotesList();

            this._notesList.innerHTML = this._notes.map(note => {
                return `
                    <tr>
                        <td>${note.title}</td>
                        <td>${note.message}</td>
                    </tr>
                `;
            }).join('');
        }
    }

    /**
     * Reset DOM Notes List
     * @private
     */
    _resetNotesList() {
        this._notesList.innerHTML = '';
    }
}

new Notes();
