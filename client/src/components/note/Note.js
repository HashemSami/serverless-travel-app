import React from 'react';
import './Note.styles.scss';

const Note = (props) => {
  return (
    <div id="main-note">
      <h4>{props.mainNote}</h4>
    </div>
  );
};

export default Note;
