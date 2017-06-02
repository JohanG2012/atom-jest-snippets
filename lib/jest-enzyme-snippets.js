'use babel';

import JestEnzymeSnippetsView from './jest-enzyme-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  jestEnzymeSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jestEnzymeSnippetsView = new JestEnzymeSnippetsView(state.jestEnzymeSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jestEnzymeSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jest-enzyme-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jestEnzymeSnippetsView.destroy();
  },

  serialize() {
    return {
      jestEnzymeSnippetsViewState: this.jestEnzymeSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('JestEnzymeSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
