

import React, { useState, useEffect } from "react";
import './PdfViewer.css';
const NoteDialog = ({ isOpen, onClose, onSave, selectedText }) => {
  const [userNotes, setUserNotes] = useState("");
  const [displaySelectedText, setDisplaySelectedText] = useState(true);

  const handleSave = () => {
    onSave({ selectedText, userNotes });

    setDisplaySelectedText(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setUserNotes("");
    }
  }, [isOpen]);

  return (
    isOpen && (
      <>
        <div className="pdf_note_dialog_edit_popup" style={{ zIndex: 1000 }}>
          {displaySelectedText && <p>Selected Text: {selectedText}</p>}
          <textarea
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Add comments"
          />
          <div className="company-profile-rating-popup__buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
        <div
          className="pdf_note_dialog_backdrop"
          style={{ display: isOpen ? "block" : "none" }}
        ></div>
      </>
    )
  );
};

export default NoteDialog;
