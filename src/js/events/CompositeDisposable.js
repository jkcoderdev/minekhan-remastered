import { Disposable } from './Disposable.js';

export class CompositeDisposable extends Disposable {
    constructor() {
        super();

        this.entries = new Set();
    }

    get isDisposed() {
        return !!this.entries;
    }

    dispose() {
        for (const entry of this.entries) {
            entry.dispose();
        }
        this.entries.clear();
        this.entries = null;
    }

    add(disposable) {
        this.entries.add(disposable);
    }

    remove(disposable) {
        this.entries.delete(disposable);
    }
}
