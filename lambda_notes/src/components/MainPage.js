import React from 'react';
import NoteList from './mainpage/NoteList';
import NoteView from './mainpage/NoteView';
import EditNote from './mainpage/EditNote';
import CreateNote from './mainpage/CreateNote';
import './mainpage.css';
import './deletebox.css';

class MainPage extends React.Component {
  state = {
    currentNote: {},
    notes: [],
    deleting: false,

  };

  render() {
    return (
      <div>
        <div style={this.state.deleting ? { visibility: 'visible' } : { visibility: 'hidden' } }>
          <div className="deleteBox__bigBox">
            <div className="bigBox__whiteBox">
              <div className="whiteBox__container">
                <div className="container__top"></div>
                <div className="container__bottom">
                  <button className="container__button-delete" onClick={() => this.deleteCurrentNote()}>Delete</button>
                  <button className="container__button-cancel" onClick={() => this.toggleDeleting()}>No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainPage__topRow" style={this.props.caseValue === 'noteView' ? { visibility: 'visible' } : { visibility: 'hidden' } }>
          <div className="topRow__button-box">
            <div className="topRow__button" onClick={() => this.props.changeSwitch('Edit Note:', 'editNote')}>edit</div>
            <div className="topRow__button" onClick={() => this.toggleDeleting()}>delete</div>
          </div>
        </div>
        <div className="mainPage__middleRow">{this.props.title}</div>
        <div className="mainPage__bottomRow">
          {this.renderSwitch(this.props.caseValue)}
        </div>
      </div>
    );
  }

  renderSwitch = (param) => {
    switch(param) {
      case 'noteList':
        return <div className="mainPage__noteList">
          <NoteList notesArr={this.state.notes} changeSwitch={this.props.changeSwitch} viewNote={this.changeCurrentNote} />
        </div>;
      case 'noteView':
        return <div className="mainPage__noteView">
          <NoteView currentNote={this.state.currentNote} />
        </div>;
      case 'editNote': 
        return <div className="mainPage__noteView">
          <EditNote currentNote={this.state.currentNote} submitModifiedNote={this.replaceCurrentNoteInArr} changeSwitch={this.props.changeSwitch} />
        </div>;
      case 'createNote':
        return <CreateNote addNote={this.addNote} />;
      default:
        return <div>Welcome to Lambda Notes</div>;
    }
  };

  addNote = (noteObj) => {
    this.setState({ ...this.state, notes: this.state.notes.concat([noteObj]) });
  };

  changeCurrentNote = (nextNote) => {
    this.setState({...this.state, currentNote: nextNote});
  };

  replaceCurrentNoteInArr = (newNote) => {
    this.setState({...this.state, currentNote: newNote, notes: this.state.notes.map(note => { if (note.id === newNote.id) {return newNote} else {return note} } )
    });
  }

  toggleDeleting = () => {
    this.setState({...this.state, deleting: !this.state.deleting});
  };

  deleteCurrentNote = () => {
    this.setState({ notes: this.state.notes.filter(note => note.id !== this.state.currentNote.id), currentNote: {}, deleting: false });
    this.props.changeSwitch('Your Notes:','noteList');
  };

}

export default MainPage;
